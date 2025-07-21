import { Button } from "@chakra-ui/react";
import useModalStore from "../../store/useModalStore";
import useProductQueryStore from "../../store/useProductQueryStore";
import TimeFilterModal from "./TimeFilterModal";

const TimeFilter = () => {
  const openTimeFilterModal = useModalStore((s) => s.openTimeFilterModal);

  const startDate = useProductQueryStore((s) => s.productQuery.startDate);
  const endDate = useProductQueryStore((s) => s.productQuery.endDate);

  return (
    <>
      <Button
        color="white"
        bg={startDate && endDate ? "gray" : "darkBlue"}
        textAlign="left"
        noOfLines={1}
        onClick={openTimeFilterModal}
      >
        {startDate && endDate
          ? startDate === endDate
            ? startDate
            : startDate + " to " + endDate
          : "By Time"}
      </Button>
      <TimeFilterModal />
    </>
  );
};

export default TimeFilter;
