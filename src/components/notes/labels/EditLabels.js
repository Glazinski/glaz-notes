import React from 'react';
import DialogWindow from '../../DialogWindow';

const EditLabels = (props) => {
  const { open, handleClose } = props;
  const test = 0;

  // TODO:
  return (
    <DialogWindow open={open} handleClose={handleClose}>
      <span>elo</span>
    </DialogWindow>
  );
};

export default EditLabels;
