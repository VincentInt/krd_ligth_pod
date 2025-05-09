import { useParams } from "react-router";
import Input from "../../../../../UI/Input/Input.jsx";
import RadioInput from "../../../../../UI/RadioInput/RadioInput";
import RangeInput from "../../../../../UI/RangeInput/RangeInput";
import SelectInput from "../../../../../UI/SelectInput/SelectInput";
import FilterItem from "../../FilterItem/FilterItem";

const FilterOptions = ({
  item,
  indexFilterOptions,
  stateFilterOptions,
  setStateFilterOptions,
}) => {
  const typeProductsParams = useParams().type;
  return (
    <FilterItem
      typeProductsParams={typeProductsParams}
      nameFilterItem={item.titleName}
    >
      {item.type === "input" ? (
        <Input
          value={item.select}
          onChange={(valueSelect) => {
            setStateFilterOptions((prev) => {
              const clone = [...prev];
              clone[indexFilterOptions].select = valueSelect;
              return clone;
            });
          }}
          placeholder={item.defaultInputs}
          key={indexFilterOptions}
        />
      ) : item.type === "range" ? (
        <RangeInput
          item={item}
          onChange={(selectMin, selectMax) =>
            setStateFilterOptions((prev) => {
              const clone = [...prev];
              clone[indexFilterOptions].selectMin = selectMin;
              clone[indexFilterOptions].selectMax = selectMax;
              return clone;
            })
          }
        ></RangeInput>
      ) : item.type === "select" ? (
        item?.defaultInputs?.map((itemSelect, indexSelect) => {
          return (
            <SelectInput
              state={item.select.includes(itemSelect)}
              onChange={(statusSelect) =>
                setStateFilterOptions((prev) => {
                  const clone = [...prev];
                  if (statusSelect) {
                    clone[indexFilterOptions].select = [
                      ...clone[indexFilterOptions].select,
                      itemSelect,
                    ];
                  } else {
                    clone[indexFilterOptions].select.splice(
                      clone[indexFilterOptions].select.indexOf(itemSelect),
                      1
                    );
                  }
                  return clone;
                })
              }
              key={indexSelect}
            >
              <h6>{itemSelect}</h6>
            </SelectInput>
          );
        })
      ) : item.type === "radio" ? (
        item?.defaultInputs?.map((itemRadio, indexRadio) => {
          const statusSelect = itemRadio === item.select;
          return (
            <RadioInput
              state={statusSelect}
              stateFilterOptions={stateFilterOptions}
              onChange={() =>
                setStateFilterOptions((prev) =>
                  prev.map((el, i) =>
                    i === indexFilterOptions ? { ...el, select: itemRadio } : el
                  )
                )
              }
              key={`${indexRadio}-${item.select}`}
            >
              <h6>{itemRadio}</h6>
            </RadioInput>
          );
        })
      ) : (
        "404"
      )}
    </FilterItem>
  );
};

export default FilterOptions;
