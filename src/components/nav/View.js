import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeView } from '../../store/actions/uiActions';

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ViewCompactOutlinedIcon from '@material-ui/icons/ViewCompactOutlined';

const View = (props) => {
  const { view, changeView } = props;

  const handleViewChange = () => {
    const newView = view === 'grid' ? 'list' : 'grid';
    changeView(newView);
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

View.propTypes = {
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  view: state.ui.view,
});

export default connect(mapStateToProps, { changeView })(View);
