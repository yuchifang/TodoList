import React from "react";
const DrinkInput = React.forwardRef<HTMLInputElement, { placeholderText: string, setClassName: string }>
  (({ placeholderText, setClassName }, ref) => (
    <input
      className={setClassName}
      placeholder={placeholderText}
      type="text"
      ref={ref}
    />
  ));
export default DrinkInput;
