import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { changeTheme } from '../../store/actions/uiActions';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// MUI icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const Settings = ({ signOut, changeTheme, theme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
    handleClose();
  };

  return (
    <>
      <Tooltip title="settings" aria-label="settings" placement="bottom">
        <IconButton edge="end" color="inherit" onClick={handleClick}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleTheme}>
          {theme === 'dark' ? <span>Disable dark theme</span> : <span>Enable dark theme</span>}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

Settings.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps, { signOut, changeTheme })(Settings);
