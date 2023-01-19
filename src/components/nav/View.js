import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewCompactOutlinedIcon from '@material-ui/icons/ViewCompactOutlined';

import { changeView } from '../../store/ui/actions';

const View = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.ui.view);

  const handleViewChange = () => {
    dispatch(changeView(view === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div style={{ marginRight: '15px' }}>
      {view === 'grid' ? (
        <Tooltip title="List View" aria-label="List View" placement="bottom">
          <IconButton edge="end" color="inherit" onClick={handleViewChange}>
            <ViewAgendaOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Grid View" aria-label="Grid View" placement="bottom">
          <IconButton edge="end" color="inherit" onClick={handleViewChange}>
            <ViewCompactOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default View;
