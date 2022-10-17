import { useState, useRef, useEffect } from 'react';

// Find the largest breakpoint the element is less than
const findBreakPoint = (breakpoints, width) => {
  const breakpointIndex = breakpoints
    .map((x) => Object.values(x)[0])
    .findIndex((x) => width < x);

  // element is larger than every breakpoint so it must be the last breakpoint
  if (breakpointIndex === -1) {
    return Object.keys(breakpoints[breakpoints.length - 1])[0];
  }

  return Object.keys(breakpoints[breakpointIndex])[0];
};

export default (elRef, breakpoints) => {
  const firstQuery = Object.keys(breakpoints[0])[0];
  const [breakSize, setBreakSize] = useState(firstQuery);

  const observer = useRef(
    new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element ot be watched
      const { width } = entries[0].contentRect;

      setBreakSize(findBreakPoint(breakpoints, width));
    })
  );

  useEffect(() => {
    if (elRef.current) {
      observer.current.observe(elRef.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [elRef, observer]);

  return breakSize;
};
