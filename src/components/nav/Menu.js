import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import View from './View';
import { changeTheme } from '../../store/ui/actions';
import { signOut } from '../../store/auth/actions';

const Settings = () => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    dispatch(signOut());
    handleClose();
  };

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(changeTheme(newTheme));
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
        <MenuItem onClick={handleTheme}>
          {theme === 'dark' ? (
            <span>Disable dark theme</span>
          ) : (
            <span>Enable dark theme</span>
          )}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Settings;
