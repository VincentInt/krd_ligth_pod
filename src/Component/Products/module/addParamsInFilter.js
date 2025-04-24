const addParamsInFilter = (stateFilterOptions, dataFilterOptions) => {
  const addParamsFilterOptions = stateFilterOptions
    ?.filter((itemFilterOptions, index) => {
      if (itemFilterOptions.type === "input") {
        if (itemFilterOptions.select.length) {
          return true;
        }
      } else if (itemFilterOptions.type === "range") {
        const keysRange = ["selectMin", "selectMax"];
        for (const key in keysRange) {
          if (
            dataFilterOptions[index][keysRange[key]] !==
            itemFilterOptions[keysRange[key]]
          ) {
            return true;
          }
        }
      } else if (itemFilterOptions.type === "select") {
        if (
          itemFilterOptions.select.length !==
          dataFilterOptions[index].select.length
        ) {
          return true;
        }
      } else if (itemFilterOptions.type === "radio") {
        if (itemFilterOptions.select !== dataFilterOptions[index].select) {
          return true;
        }
      }
    })
    ?.map((item) => {
      let textParams = `${item.typeDataProduct}=`;
      
      if (item.type === "input") {
        textParams = `${textParams}${item.select}`;
      } else if (item.type === "range") {
        const keysRange = ["selectMin", "selectMax"];
        keysRange.forEach((keys, index) => {
          if (index > 0) textParams = `${textParams},${item[keys]}`;
          else textParams = `${textParams}${item[keys]}`;
        });
      } else if (item.type === "select") {
        item.select.forEach((item, index) => {
          if (index > 0) textParams = `${textParams},${item}`;
          else textParams = `${textParams}${item}`;
        });
      } else if (item.type === "radio") {
        textParams = `${textParams}${item.select}`;
      }
      return textParams;
    })
    ?.join(";");
  return addParamsFilterOptions;
};

export default addParamsInFilter;
