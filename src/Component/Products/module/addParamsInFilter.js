const addParamsInFilter = (stateFilterOptions, dataFilterOptions) => {
  const addParamsFilterOptions = dataFilterOptions.filter(
    (itemFilterOptions, index) => {
      if (itemFilterOptions.type === "range") {
        const keysRange = ["selectMin", "selectMax"];
        keysRange.forEach((keyRange) => {
          if (
            stateFilterOptions[index][keyRange] !== itemFilterOptions[keyRange]
          ) {
            return true;
          }
        });
      } else if (itemFilterOptions.type === "select") {
        if (
          itemFilterOptions.select.length !==
          stateFilterOptions[index].select.length
        ) {
          return true;
        } else if (itemFilterOptions.type === "radio") {
          if (itemFilterOptions.select !== stateFilterOptions[index].select) {
            return true;
          }
        }
      }
    }
  );
  console.log(addParamsFilterOptions);
};

export default addParamsInFilter;
