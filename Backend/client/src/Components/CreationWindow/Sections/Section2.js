import React, { forwardRef } from "react";

const Section2 = forwardRef((props, ref) => {
  return (
    <div className="section-container">
      <h3 ref={ref}>
        Section 2
      </h3>
    </div>
  );
});

export default Section2;