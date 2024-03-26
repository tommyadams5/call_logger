import { useState } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  initial: number;
  end: number;
  setBaseState: any;
}

// Slider for View Results tab to page through facts by day
function RangeSlider({ initial, end, setBaseState }: RangeSliderProps) {
  const [value, setValue] = useState(initial);

  const handleChange = (event: any) => {
    setValue(event.target.value);
    setBaseState((x: any) => ({ ...x, dateNum: event.target.value }));
  };

  const moveRight = () => {
    setValue(Math.min(value + 1, end));
    setBaseState((x: any) => ({ ...x, dateNum: Math.min(value + 1, end) }));
  };

  const moveLeft = () => {
    setValue(Math.max(0, value - 1));
    setBaseState((x: any) => ({ ...x, dateNum: Math.max(0, value - 1) }));
  };

  return (
    <div className="range-slider">
      <div className="slider_box">
        <button className="slider_button" onClick={moveLeft}>
          {"<"}
        </button>
        <input
          type="range"
          min="0"
          max={end}
          value={value}
          onChange={handleChange}
          className="slider"
          id="myRange"
        />
        <button className="slider_button" onClick={moveRight}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default RangeSlider;
