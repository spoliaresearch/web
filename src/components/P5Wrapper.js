// P5Wrapper.js
import React, { useEffect, useRef } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch }) => {
  const wrapper = useRef();

  useEffect(() => {
    const canvas = new p5(sketch, wrapper.current);
    return () => canvas.remove();
  }, [sketch]);

  return <div ref={wrapper} />;
};

export default P5Wrapper;
