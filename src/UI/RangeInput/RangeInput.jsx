import "./RangeInput.css";
import { useEffect, useRef, useState } from "react";

const RangeInput = ({ item, onChange }) => {
  const [rangeState, setRangeState] = useState(null);

  const containerRangeRef = useRef(null);
  const [rangeInputs, setRangeInputs] = useState({
    maxRange: item.selectMax,
    minRange: item.selectMin,
  });

  useEffect(() => {
    setRangeState({
      max: item.max,
      min: item.min,
      minRange: {
        state: item.selectMin,
        position: Math.floor(
          ((item.selectMin - item.min) / (item.max - item.min)) * 100
        ),
      },
      maxRange: {
        state: item.selectMax,
        position: Math.floor(
          ((item.selectMax - item.min) / (item.max - item.min)) * 100
        ),
      },
    });
  }, [item]);

  useEffect(() => {
    let timeOut;
    if (rangeState) {
      timeOut = setTimeout(() => {
        onChange(rangeState.minRange.state, rangeState.maxRange.state);
      }, 0);

      setRangeInputs({
        maxRange: rangeState.maxRange.state,
        minRange: rangeState.minRange.state,
      });
    }

    return () => clearTimeout(timeOut);
  }, [rangeState]);

  function onChangeInput(event, rangeType) {
    setRangeInputs((prev) => {
      const clone = { ...prev };
      clone[rangeType] = +event.target.value;
      return clone;
    });
  }
  function onEnterInput(rangeType) {
    setRangeState((prev) => {
      const clone = { ...prev };
      if (
        rangeInputs[rangeType] >= clone.min &&
        rangeInputs[rangeType] <= clone.max
      ) {
        clone[rangeType].state = rangeInputs[rangeType];
        clone[rangeType].position = Math.floor(
          ((rangeInputs[rangeType] - clone.min) / (clone.max - clone.min)) * 100
        );
      }
      if (rangeInputs[rangeType] >= clone.max) {
        clone[rangeType].state = clone.max;
      } else if (rangeInputs[rangeType] <= clone.min) {
        clone[rangeType].state = clone.min;
      }

      return clone;
    });
  }
  function onChangeRangeBall(event, rangeType) {
    const startBall = rangeState[rangeType].position;
    const maxWidth = containerRangeRef.current.clientWidth;

    if (event.type === "mousedown") {
      window.onmousemove = (mouseMove) => {
        const startMouse = event.clientX;
        const movePosition = mouseMove.clientX;
        onMove(startMouse, movePosition, rangeType, maxWidth, startBall);
      };
      window.onmouseup = () => {
        return (window.onmousemove = () => {});
      };
    } else if (event.type === "touchstart") {
      window.ontouchmove = (toucheMove) => {
        const startTouche = event.changedTouches[0].clientX;
        const moveTouchePosition = toucheMove.changedTouches[0].clientX;
        onMove(startTouche, moveTouchePosition, rangeType, maxWidth, startBall);
      };
      window.ontouchend = () => {
        window.ontouchmove = () => {};
      };
    }
  }
  function onMove(
    startMouseDown,
    movePosition,
    rangeType,
    maxWidth,
    startBall
  ) {
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
          clone[rangeType].state = Math.floor(stateRange);
          return clone;
        });
      }
    }
  }
  return (
    <div className="container_range_input">
      <div className="container_input">
        <div className="container_item_input">
          <h6>от</h6>
          <input
            value={rangeState ? Math.floor(rangeInputs.minRange) : 0}
            onChange={(e) => onChangeInput(e, "minRange")}
            onBlur={() => onEnterInput("minRange")}
            onKeyUp={(e) =>
              e.code === "Enter" ? onEnterInput("minRange") : ""
            }
            type="number"
          />
        </div>
        <div className="line"></div>
        <div className="container_item_input">
          <h6>до</h6>
          <input
            value={rangeState ? Math.floor(rangeInputs.maxRange) : 0}
            onChange={(e) => onChangeInput(e, "maxRange")}
            onBlur={() => onEnterInput("maxRange")}
            onKeyUp={(e) =>
              e.code === "Enter" ? onEnterInput("maxRange") : ""
            }
            type="number"
          />
        </div>
      </div>
      <div ref={containerRangeRef} className="container_range">
        <div
          style={{ left: `${rangeState?.minRange?.position}%` }}
          onMouseDown={(e) => onChangeRangeBall(e, "minRange")}
          onTouchStart={(e) => onChangeRangeBall(e, "minRange")}
          className="ball"
        ></div>
        <div className="line"></div>
        <div
          style={{ left: `${rangeState?.maxRange?.position}%` }}
          onMouseDown={(e) => onChangeRangeBall(e, "maxRange")}
          onTouchStart={(e) => onChangeRangeBall(e, "maxRange")}
          className="ball"
        ></div>
      </div>
    </div>
  );
};

export default RangeInput;
