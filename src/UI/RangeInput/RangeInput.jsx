import "./RangeInput.css";
import { useEffect, useRef, useState } from "react";

const RangeInput = ({ item, onChange }) => {
  const [rangeState, setRangeState] = useState(null);
  const containerRangeRef = useRef(null);

  useEffect(() => {
      setRangeState({
        max: item.max,
        min: item.min,
        minRange: { state: item.selectMin, position: 0 },
        maxRange: { state: item.selectMax, position: 100 },
      });
  }, [item]);

  useEffect(() => {
    if (rangeState) {
      onChange(rangeState.minRange.state, rangeState.maxRange.state);
    }
  }, [rangeState]);

  function onChangeInput(event, rangeType) {
    setRangeState((prev) => {
      const clone = { ...prev };
      clone[rangeType].state = event.target.value;

      return clone;
    });
  }
  function onEnterInput(rangeType) {
    setRangeState((prev) => {
      const clone = { ...prev };
      if (
        clone[rangeType].state >= clone.min &&
        clone[rangeType].state <= clone.max
      ) {
        clone[rangeType].position = Math.floor(
          ((clone[rangeType].state - clone.min) / (clone.max - clone.min)) * 100
        );
      }
      if (clone[rangeType].state >= clone.max) {
        clone[rangeType].state = clone.max;
      } else if (clone[rangeType].state <= clone.min) {
        clone[rangeType].state = clone.min;
      }
      return clone;
    });
  }
  function onChangeRangeBall(event, rangeType) {
    const startBall = rangeState[rangeType].position;

    window.onmousemove = (mouseMove) => {
      const maxWidth = containerRangeRef.current.clientWidth;
      const startMouseDown = event.clientX;
      const movePosition = mouseMove.clientX;

      const position =
        Math.floor(((movePosition - startMouseDown) / maxWidth) * 100) +
        startBall;

      if (position >= 0 && position <= 100) {
        if (
          (rangeType === "minRange" &&
            position < rangeState.maxRange.position - 7) ||
          (rangeType === "maxRange" &&
            position - 7 > rangeState.minRange.position)
        ) {
          setRangeState((prev) => {
            const clone = { ...prev };
            const stateRange =
              (item.max - item.min) * (position / 100) + item.min;
            clone[rangeType].position = position;
            clone[rangeType].state = stateRange;
            return clone;
          });
        }
      }
    };
    window.onmouseup = () => {
      return (window.onmousemove = () => {});
    };
  }
  return (
    <div className="container_range_input">
      <div className="container_input">
        <div className="container_item_input">
          <h6>от</h6>
          <input
            value={Math.floor(rangeState?.minRange?.state)}
            onChange={(e) => onChangeInput(e, "minRange")}
            onBlur={() => onEnterInput("minRange")}
            type="number"
          />
        </div>
        <div className="line"></div>
        <div className="container_item_input">
          <h6>до</h6>
          <input
            value={Math.floor(rangeState?.maxRange?.state)}
            onChange={(e) => onChangeInput(e, "maxRange")}
            onBlur={() => onEnterInput("maxRange")}
            type="number"
          />
        </div>
        <h6 className="before_text">{item.before}</h6>
      </div>
      <div ref={containerRangeRef} className="container_range">
        <div
          style={{ left: `${rangeState?.minRange?.position}%` }}
          onMouseDown={(e) => onChangeRangeBall(e, "minRange")}
          className="ball"
        ></div>
        <div className="line"></div>
        <div
          style={{ left: `${rangeState?.maxRange?.position}%` }}
          onMouseDown={(e) => onChangeRangeBall(e, "maxRange")}
          className="ball"
        ></div>
      </div>
    </div>
  );
};

export default RangeInput;
