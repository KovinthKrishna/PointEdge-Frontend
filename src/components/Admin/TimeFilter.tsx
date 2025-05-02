import timePeriods from "../../data/timePeriods";
import useProductQueryStore from "../../store/useProductQueryStore";
import FilterMenu from "../FilterMenu";

const TimeFilter = () => {
  const timeFilter = useProductQueryStore((s) => s.productQuery.timeFilter);
  const setTimeFilter = useProductQueryStore((s) => s.setTimeFilter);

  return (
    <FilterMenu
      filterType="Time"
      options={timePeriods}
      selectedOptionId={timeFilter}
      setSelectedOptionId={setTimeFilter}
    />
  );
};

export default TimeFilter;
