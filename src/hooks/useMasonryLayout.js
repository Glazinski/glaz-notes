import { useState, useEffect } from 'react';
import calculateLayout from '../utils/calculateLayout';

export default (data, breakSize, view) => {
  const [colNum, setColNum] = useState(2);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    if (view === 'list') {
      setColNum(1);
    } else {
      switch (breakSize) {
        case 'xs': setColNum(1); break;
        case 'sm': setColNum(2); break;
        case 'md': setColNum(3); break;
        case 'lg': setColNum(4); break;
        case 'xl': setColNum(5); break;
        case 'xxl': setColNum(6); break;
        default: break;
      }
    }
  }, [breakSize, view]);

  useEffect(() => {
    if (data && colNum) {
      const lay = calculateLayout(data, colNum);

      setLayout(lay);
    }
  }, [data, colNum]);

  return layout;
};
