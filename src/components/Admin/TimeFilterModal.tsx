import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useModalStore from "../../store/useModalStore";
import useProductQueryStore from "../../store/useProductQueryStore";

const parseLocalDate = (iso: string): Date => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatLocalDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const TimeFilterModal = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const isTimeFilterModalOpen = useModalStore((s) => s.isTimeFilterModalOpen);
  const closeTimeFilterModal = useModalStore((s) => s.closeTimeFilterModal);

  const startDate = useProductQueryStore((s) => s.productQuery.startDate);
  const endDate = useProductQueryStore((s) => s.productQuery.endDate);
  const setTimeFilter = useProductQueryStore((s) => s.setTimeFilter);

  useEffect(() => {
    if (isTimeFilterModalOpen) {
      setFromDate(startDate ? parseLocalDate(startDate) : null);
      setToDate(endDate ? parseLocalDate(endDate) : null);
    }
  }, [isTimeFilterModalOpen, startDate, endDate]);

  return (
    <Modal
      isOpen={isTimeFilterModalOpen}
      onClose={closeTimeFilterModal}
      isCentered
      closeOnOverlayClick={false}
      scrollBehavior="inside"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent
        border="8px"
        borderColor="darkBlue"
        borderRadius={24}
        mx={{ base: 2, md: "auto" }}
      >
        <ModalHeader textAlign="center" fontSize={{ base: 24, lg: 32 }}>
          Time Filter
        </ModalHeader>
        <ModalBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={4}
            align="center"
            justify="center"
          >
            <Box>
              <Text my={2}>From</Text>
              <DatePicker
                selected={fromDate}
                onChange={(date) => {
                  setFromDate(date);
                  if (!toDate) {
                    setToDate(date);
                  }
                }}
                placeholderText="Select start date"
                dateFormat="yyyy-MM-dd"
                customInput={
                  <Input
                    borderRadius="full"
                    border="2px"
                    borderColor="darkBlue"
                    bgColor="lightGray"
                    _placeholder={{ color: "gray" }}
                  />
                }
              />
            </Box>
            <Box>
              <Text my={2}>To</Text>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                placeholderText="Select end date"
                dateFormat="yyyy-MM-dd"
                customInput={
                  <Input
                    borderRadius="full"
                    border="2px"
                    borderColor="darkBlue"
                    bgColor="lightGray"
                    _placeholder={{ color: "gray" }}
                  />
                }
              />
            </Box>
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            color="white"
            gap={4}
            justify="center"
            my={6}
          >
            <Button
              bgColor="blue"
              _hover={{ bgColor: "darkBlue" }}
              minW={140}
              onClick={() => {
                if (startDate && endDate) {
                  setTimeFilter();
                }
                closeTimeFilterModal();
              }}
            >
              {fromDate || toDate ? "Clear & Close" : "Close"}
            </Button>
            <Button
              bgColor="blue"
              _hover={{ bgColor: "darkBlue" }}
              minW={140}
              isDisabled={!fromDate || !toDate || fromDate > toDate}
              onClick={() => {
                if (fromDate && toDate) {
                  setTimeFilter(
                    formatLocalDate(fromDate),
                    formatLocalDate(toDate)
                  );
                }
                closeTimeFilterModal();
              }}
            >
              Apply Filter
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeFilterModal;
