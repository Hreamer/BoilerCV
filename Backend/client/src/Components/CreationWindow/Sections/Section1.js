import React, { forwardRef } from "react";

const Section1 = forwardRef((props, ref) => {
  return (
    <h3 ref={ref} className="section">
      Section 1
    </h3>
  );
});

export default Section1;
