import dataProducts from "./dataProducts.json";

const dataFilters = {
  disposablePods: [
    {
      titleName: "Цена",
      type: "range",
      typeDataProduct: "price",
      max: dataProducts.disposablePods.sort((a, b) => b.price - a.price)[0]
        .price,
      min: dataProducts.disposablePods.sort((a, b) => a.price - b.price)[0]
        .price,
      before: "₽",
      selectMin: dataProducts.disposablePods.sort(
        (a, b) => a.price - b.price
      )[0].price,
      selectMax: dataProducts.disposablePods.sort(
        (a, b) => b.price - a.price
      )[0].price,
    },
    {
      titleName: "Оценка",
      typeDataProduct: "rating",
      type: "radio",
      defaultInputs: ["Любой", 5, 4.5, 4, 3, 2],
      select: "Любой",
    },
    {
      titleName: "Бренд",
      typeDataProduct: "brand",
      type: "select",
      defaultInputs: [
        ...new Set(
          dataProducts.disposablePods.map((item) => item.brand).sort()
        ),
      ],
      select: [],
    },
    {
      titleName: "Кол-во затяжек",
      typeDataProduct: "puffs",
      type: "range",
      max: dataProducts.disposablePods.sort((a, b) => b.puffs - a.puffs)[0]
        .puffs,
      min: dataProducts.disposablePods.sort((a, b) => a.puffs - b.puffs)[0]
        .puffs,
      before: "Раз",
      selectMin: dataProducts.disposablePods.sort(
        (a, b) => a.puffs - b.puffs
      )[0].puffs,
      selectMax: dataProducts.disposablePods.sort(
        (a, b) => b.puffs - a.puffs
      )[0].puffs,
    },
    {
      titleName: "Вкусы",
      typeDataProduct: "flavor",
      type: "select",

      defaultInputs: [
        ...new Set(
          dataProducts.disposablePods.map((item) => item.flavor).sort()
        ),
      ],
      select: [],
    },
    {
      titleName: "Холодок",
      typeDataProduct: "cool",
      type: "radio",
      defaultInputs: [
        "Любой",
        ...new Set(dataProducts.disposablePods.map((item) => item.cool)),
      ],
      select: "Любой",
    },
    {
      titleName: "Порт зарядки",
      typeDataProduct: "chargingPort",
      type: "select",
      defaultInputs: [
        ...new Set(
          dataProducts.disposablePods.map((item) => item.chargingPort)
        ),
      ],
      select: [],
    },
  ],
  podSystems: [
    {
      titleName: "Цена",
      type: "range",
      typeDataProduct: "price",
      max: dataProducts.podSystems.sort((a, b) => b.price - a.price)[0].price,
      min: dataProducts.podSystems.sort((a, b) => a.price - b.price)[0].price,
      before: "₽",
      selectMin: dataProducts.podSystems.sort((a, b) => a.price - b.price)[0]
        .price,
      selectMax: dataProducts.podSystems.sort((a, b) => b.price - a.price)[0]
        .price,
    },
    {
      titleName: "Оценка",
      typeDataProduct: "rating",
      type: "radio",
      defaultInputs: ["Любой", 5, 4.5, 4, 3, 2],
      select: "Любой",
    },
    {
      titleName: "Бренд",
      typeDataProduct: "brand",
      type: "select",
      defaultInputs: [
        ...new Set(dataProducts.podSystems.map((item) => item.brand).sort()),
      ],
      select: [],
    },
    {
      titleName: "Аккумулятор",
      type: "range",
      typeDataProduct: "battery",
      max: dataProducts.podSystems.sort((a, b) => b.battery - a.battery)[0]
        .battery,
      min: dataProducts.podSystems.sort((a, b) => a.battery - b.battery)[0]
        .battery,
      before: "мАч",
      selectMin: dataProducts.podSystems.sort(
        (a, b) => a.battery - b.battery
      )[0].battery,
      selectMax: dataProducts.podSystems.sort(
        (a, b) => b.battery - a.battery
      )[0].battery,
    },
    {
      titleName: "Тип испарителя",
      typeDataProduct: "coilType",
      type: "radio",
      defaultInputs: [
        "Любой",
        ...new Set(dataProducts.podSystems.map((item) => item.coilType)),
      ],
      select: "Любой",
    },
    {
      titleName: "Объем бака",
      type: "range",
      typeDataProduct: "tankVolume",
      max: dataProducts.podSystems.sort(
        (a, b) => b.tankVolume - a.tankVolume
      )[0].tankVolume,
      min: dataProducts.podSystems.sort(
        (a, b) => a.tankVolume - b.tankVolume
      )[0].tankVolume,
      before: "мл",
      selectMin: dataProducts.podSystems.sort(
        (a, b) => a.tankVolume - b.tankVolume
      )[0].tankVolume,
      selectMax: dataProducts.podSystems.sort(
        (a, b) => b.tankVolume - a.tankVolume
      )[0].tankVolume,
    },
    {
      titleName: "Порт зарядки",
      typeDataProduct: "chargingPort",
      type: "select",
      defaultInputs: [
        ...new Set(
          dataProducts.disposablePods.map((item) => item.chargingPort).sort()
        ),
      ],
      select: [],
    },
  ],
  eLiquids: [
    {
      titleName: "Цена",
      type: "range",
      typeDataProduct: "price",
      max: dataProducts.eLiquids.sort((a, b) => b.price - a.price)[0].price,
      min: dataProducts.eLiquids.sort((a, b) => a.price - b.price)[0].price,
      before: "₽",
      selectMin: dataProducts.eLiquids.sort((a, b) => a.price - b.price)[0]
        .price,
      selectMax: dataProducts.eLiquids.sort((a, b) => b.price - a.price)[0]
        .price,
    },
    {
      titleName: "Оценка",
      typeDataProduct: "rating",
      type: "radio",
      defaultInputs: ["Любой", 5, 4.5, 4, 3, 2],
      select: "Любой",
    },
    {
      titleName: "Бренд",
      typeDataProduct: "brand",
      type: "select",
      defaultInputs: [
        ...new Set(dataProducts.eLiquids.map((item) => item.brand).sort()),
      ],
      select: [],
    },
    {
      titleName: "Вкусы",
      typeDataProduct: "flavor",
      type: "select",
      defaultInputs: [
        ...new Set(dataProducts.eLiquids.map((item) => item.flavor).sort()),
      ],
      select: [],
    },
    {
      titleName: "Солейвой некатин",
      typeDataProduct: "saltNic",
      type: "radio",
      defaultInputs: [
        "Любой",
        ...new Set(dataProducts.eLiquids.map((item) => item.saltNic)),
      ],
      select: "Любой",
    },
    {
      titleName: "Объем",
      type: "range",
      typeDataProduct: "volume",
      max: dataProducts.eLiquids.sort((a, b) => b.volume - a.volume)[0].volume,
      min: dataProducts.eLiquids.sort((a, b) => a.volume - b.volume)[0].volume,
      before: "мл",
      selectMin: dataProducts.eLiquids.sort((a, b) => a.volume - b.volume)[0]
        .volume,
      selectMax: dataProducts.eLiquids.sort((a, b) => b.volume - a.volume)[0]
        .volume,
    },
    {
      titleName: "Холодок",
      typeDataProduct: "cool",
      type: "radio",
      defaultInputs: [
        "Любой",
        ...new Set(dataProducts.eLiquids.map((item) => item.cool)),
      ],
      select: "Любой",
    },
  ],
};
export default dataFilters;
