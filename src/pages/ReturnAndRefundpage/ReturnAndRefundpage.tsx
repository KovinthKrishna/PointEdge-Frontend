import { Box, Center, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../services/verifyService";

import CardRefundContainer from "../../components/ReturnAndRefund/CardRefund/CardRefundContainer";
import ItemSelection from "../../components/ReturnAndRefund/ItemSelection/ItemSelection";
import RefundMethodSelection from "../../components/ReturnAndRefund/RefundMethoSelction";
import RefundResult from "../../components/ReturnAndRefund/RefundResults";
import StepHeader from "../../components/ReturnAndRefund/StepManagement/StepHeader";
import StepWrapper from "../../components/ReturnAndRefund/StepManagement/StepWrapper";
import useRefundProcessor from "../../hooks/useRefundProcessor";
import { Invoice, InvoiceItem } from "../../models/Invoice";
import { submitRefundRequestWithImages } from "../../services/imageService";
import { useRefundStore } from "../../store/useRefundRequestStore";
import useLoadEmployee from "../../hooks/useLoadEmployee";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import verifyService from "../../services/verifyService";
import WaitingForAdminApproval from "../../components/ReturnAndRefund/WaitingForAdminAproval";

enum RefundStep {
  ITEM_SELECTION,
  WAITING_FOR_ADMIN_APPROVAL,
  REFUND_METHOD_SELECTION,
  CARD_REFUND_DETAILS,
  REFUND_RESULT,
}

const ReturnRefundPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const invoiceNumber = searchParams.get("invoice");
  const { resetRefundState } = useRefundStore();

  const { currentStep, setRefundState, refundRequestId, setRefundRequestId } =
    useRefundStore();
  const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
  const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>([]);
  const { refundMethod, refundAmount } = useRefundStore();
  const [refundSuccess, setRefundSuccess] = useState(false);
  const [itemSelections, setItemSelections] = useState<InvoiceItem[]>([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const { employee } = useEmployeeStore();

  const toastUI = useToast();
  const navigate = useNavigate();
  useLoadEmployee();

  const { processRefund } = useRefundProcessor({
    invoiceNumber: invoiceNumber!,
    selectedItems,
    totalAmount: refundAmount,
    onSuccess: () => {
      setRefundSuccess(true);
      toastUI({ title: "Success", status: "success", isClosable: true });
      setRefundState((prev) => ({
        ...prev,
        currentStep: RefundStep.REFUND_RESULT,
      }));
    },
    onFailure: () => {
      setRefundSuccess(false);
      toastUI({ title: "Failed", status: "error", isClosable: true });
      setRefundState((prev) => ({
        ...prev,
        currentStep: RefundStep.REFUND_RESULT,
      }));
    },
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await verifyService.get(
          `http://localhost:8080/api/return-exchange/invoice/${invoiceNumber}`
        );
        const info = response.data;

        const items = info.items.map((item: any) => ({
          invoiceItemId: item.itemId,
          id: item.itemId,
          name: item.productName ?? "Unnamed Item",
          quantity: item.quantity,
          price: item.price,
          returnQuantity: 0,
          refundAmount: 0,
          total: item.quantity * item.price,
        }));

        setInvoiceData({
          invoiceNumber: info.invoiceNumber,
          date: info.date,
          totalAmount: info.totalAmount,
          items,
        });

        setItemSelections(items);
      } catch (error) {
        console.error("Failed to fetch invoice", error);
        toastUI({
          title: "Error",
          description: "Failed to fetch invoice details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (invoiceNumber) {
      fetchInvoice();
    }
  }, [invoiceNumber, toastUI]);

  const handleItemSelection = async (items: InvoiceItem[]) => {
    if (!employee?.id) {
      toastUI({
        title: "Unauthorized",
        description: "Please log in again to continue.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setItemSelections(items);
    setSelectedItems(items);
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setRefundState((prev) => ({
      ...prev,
      refundAmount: total,
    }));

    try {
      const requestId = await submitRefundRequestWithImages(
        invoiceNumber!,
        "Pending",
        items,
        employee.id
      );
      setRefundRequestId(Number(requestId));

      toastUI({
        title: "Refund Request Submitted",
        description: "Waiting for admin approval. You can continue other work.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      toastUI({
        title: "Failed to submit refund request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleApproval = () => {
    console.log("Admin approved, moving to refund method selection");
    setRefundState((prev) => ({
      ...prev,
      refundAmount: refundAmount,
      currentStep: RefundStep.REFUND_METHOD_SELECTION,
    }));
  };

  const handleRejection = () => {
    console.log("Admin rejected, going back to item selection");
    setSelectedItems([]);
    setRefundState((prev) => ({
      ...prev,
      refundAmount: 0,
    }));
    setRefundState((prev) => ({
      ...prev,
      currentStep: RefundStep.ITEM_SELECTION,
    }));
  };

  const handleRefundMethodSelection = async (method: string) => {
    setRefundState((prev) => ({
      ...prev,
      refundMethod: method,
      refundAmount: refundAmount,
    }));

    try {
      if (method === "Card") {
        setShowCardForm(true); // CardRefundContainer will call process-approved
      } else if (method === "Exchange") {
        await axiosInstance.post(`/api/return-exchange/exchange`, {
          invoiceNumber,
          returnedItems: selectedItems,
        });
        setRefundState((prev) => ({
          ...prev,
          currentStep: RefundStep.REFUND_RESULT,
        }));
      } else if (method === "Cash") {
        await axiosInstance.post(
          `/api/return-exchange/process-approved/${refundRequestId}`
        );
        setRefundState((prev) => ({
          ...prev,
          currentStep: RefundStep.REFUND_RESULT,
        }));
      }
    } catch (error) {
      toastUI({
        title: "Refund Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = async () => {
    if (!refundRequestId) {
      toastUI({
        title: "No active request",
        description: "There is no refund request to cancel.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axiosInstance.post(
        `/return-exchange/cancel-request/${refundRequestId}`
      );

      setSelectedItems([]);
      setRefundState((prev) => ({
        ...prev,
        refundAmount: 0,
      }));
      setRefundRequestId(null);
      setRefundState((prev) => ({
        ...prev,
        currentStep: RefundStep.ITEM_SELECTION,
      }));

      toastUI({
        title: "Request Canceled",
        description: `Your refund request #${refundRequestId} was successfully canceled.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (err) {
      toastUI({
        title: "Cancel Failed",
        description: "Something went wrong while cancelling the request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!invoiceData) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const stepLabels = [
    "Select Items",
    "Waiting for Approval",
    "Choose Refund Method",
    "Refund Result",
  ];

  const renderStep = () => {
    switch (currentStep) {
      case RefundStep.ITEM_SELECTION:
        return (
          <ItemSelection
            invoiceData={invoiceData}
            onSubmit={handleItemSelection}
            onCancel={handleCancel}
            selectedItems={itemSelections}
          />
        );
      case RefundStep.WAITING_FOR_ADMIN_APPROVAL:
        return (
          <WaitingForAdminApproval
            invoiceNumber={invoiceNumber!}
            onApproved={handleApproval}
            onRejected={handleRejection}
          />
        );
      case RefundStep.REFUND_METHOD_SELECTION:
        return showCardForm ? (
          <CardRefundContainer
            invoiceNumber={invoiceNumber!}
            selectedItems={selectedItems}
            totalAmount={refundAmount}
            onSuccess={() => {
              setRefundSuccess(true);
              setRefundState((prev) => ({
                ...prev,
                currentStep: RefundStep.REFUND_RESULT,
              }));
              setShowCardForm(false);
            }}
            onFailure={() => {
              setRefundSuccess(false);
              setRefundState((prev) => ({
                ...prev,
                currentStep: RefundStep.REFUND_RESULT,
              }));
              setShowCardForm(false);
            }}
            onCancel={() => setShowCardForm(false)}
          />
        ) : (
          <RefundMethodSelection
            totalAmount={refundAmount}
            onSubmit={(method) => {
              if (method === "Card") {
                setRefundState((prev) => ({
                  ...prev,
                  refundMethod: "Card",
                }));
                setShowCardForm(true);
              } else {
                handleRefundMethodSelection(method);
              }
            }}
            onCancel={() => navigate("/dashboard")}
          />
        );

      case RefundStep.REFUND_RESULT:
        console.log("Rendering RefundResult with:", {
          refundMethod,
          refundAmount,
        });
        return (
          <RefundResult
            success={true}
            invoiceNumber={invoiceNumber!}
            onClose={() => {
              resetRefundState();
              window.location.href = "/dashboard";
            }}
            onPrint={() => window.print()}
            onBack={() =>
              setRefundState((prev) => ({
                ...prev,
                currentStep: RefundStep.REFUND_METHOD_SELECTION,
              }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box p={6}>
      <StepHeader
        currentStep={currentStep}
        stepLabels={stepLabels}
        progressValue={currentStep * 25}
      />
      <StepWrapper currentStep={currentStep}>{renderStep()}</StepWrapper>
    </Box>
  );
};

export default ReturnRefundPage;
