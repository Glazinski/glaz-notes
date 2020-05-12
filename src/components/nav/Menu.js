import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { changeTheme } from '../../store/actions/uiActions';
import View from './View';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

// MUI icons
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const Settings = (props) => {
  const { signOut, changeTheme, theme } = props;
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
    <div style={{ display: 'flex' }}>
      <Hidden only={['xs']}>
        <View />
      </Hidden>
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
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleTheme}>
          {theme === 'dark' ? <span>Disable dark theme</span> : <span>Enable dark theme</span>}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

Settings.propTypes = {
  signOut: PropTypes.func.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

export default connect(mapStateToProps, { signOut, changeTheme })(Settings);
