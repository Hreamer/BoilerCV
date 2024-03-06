import React, { forwardRef } from "react";

const Section2 = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="section-container">
      <h3>
        Section 2
      </h3>
    </div>
  );
});

export default Section2;