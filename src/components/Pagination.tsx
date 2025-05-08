import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import useProductQueryStore from "../store/useProductQueryStore";

interface Page {
  number: number;
  totalPages: number;
}

const Pagination = ({ page }: { page: Page }) => {
  const setPage = useProductQueryStore((s) => s.setPage);

  return (
    <ButtonGroup
      variant="outline"
      color="darkBlue"
      width="full"
      justifyContent="center"
      marginBottom={10}
    >
      <IconButton
        aria-label="First page"
        icon={<FiChevronsLeft />}
        border="2px"
        onClick={() => setPage(0)}
        disabled={page.number === 0}
      />
      <IconButton
        aria-label="Previous page"
        icon={<FiChevronLeft />}
        border="2px"
        onClick={() => setPage(page.number - 1)}
        disabled={page.number === 0}
      />
      <Button border="2px" minWidth={100}>
        Page {page.number + 1}
      </Button>
      <IconButton
        aria-label="Next page"
        icon={<FiChevronRight />}
        border="2px"
        onClick={() => setPage(page.number + 1)}
        disabled={page.number + 1 === page.totalPages}
      />
      <IconButton
        aria-label="Last page"
        icon={<FiChevronsRight />}
        border="2px"
        onClick={() => setPage(page.totalPages - 1)}
        disabled={page.number + 1 === page.totalPages}
      />
    </ButtonGroup>
  );
};

export default Pagination;
