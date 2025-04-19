const filterParamsOptions = (dataFilterOptions, filterParams) => {
  const optionsParamsFilter = filterParams.split(";").map((item) => {
    const splitParams = item.split("=");
    return { typeOption: splitParams[0], value: splitParams[1] };
  });

  optionsParamsFilter.forEach((itemParams) => {
    const itemFilterOptions =
      dataFilterOptions[
        dataFilterOptions
          .map((itemFind, index) => {
            if (itemFind.typeDataProduct === itemParams.typeOption) {
              return index;
            }
          })
          .filter((item) => item !== undefined)[0]
      ];
    if (itemFilterOptions?.type === "range") {
      const valueRange = itemParams.value.split(",");
      const keysRange = ["selectMin", "selectMax"];
      valueRange.forEach((item, index) => {
        if (itemFilterOptions.max >= item && itemFilterOptions.min <= item) {
          itemFilterOptions[keysRange[index]] = +item;
        }
      });
    } else if (itemFilterOptions?.type === "select") {
      const valueSelect = itemParams.value
        .split(",")
        .map((item) => item.toLowerCase());
      itemFilterOptions.defaultInputs.forEach((item) => {
        if (valueSelect.includes(item.toLowerCase())) {
          itemFilterOptions.select = [...itemFilterOptions.select, item];
        }
      });
    } else if (itemFilterOptions?.type === "radio") {
      const valueRadio = itemParams.value
        .split(",")
        .map((item) => item.toLowerCase())
        .slice(-1)[0];
      itemFilterOptions.defaultInputs.forEach((item) => {
        if (item.toLowerCase() === valueRadio) {
          itemFilterOptions.select = item;
        }
      });
    }
  });
  return dataFilterOptions;
};

export default filterParamsOptions;
