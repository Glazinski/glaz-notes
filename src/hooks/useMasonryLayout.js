import { useState, useEffect, useCallback } from 'react';

import calculateLayout from '../Layout/calculateLayout';

const columnNumMap = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
};

export default (data, breakSize, view) => {
  const [colNum, setColNum] = useState(2);
  const [layout, setLayout] = useState(null);

  const handleColumnNum = useCallback(() => {
    if (view === 'list') {
      setColNum(1);
      return;
    }

    setColNum(columnNumMap[breakSize]);
  }, [breakSize, view]);

  useEffect(() => {
    handleColumnNum();
  }, [handleColumnNum]);

  useEffect(() => {
    if (data && colNum) {
      const lay = calculateLayout(data, colNum);

      setLayout(lay);
    }
  }, [data, colNum]);

  return layout;
};
