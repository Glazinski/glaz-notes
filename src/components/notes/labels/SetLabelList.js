import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const listHeight = 50;

const useStyles = makeStyles((theme) => ({
  list: {
    width: 225,
    minHeight: listHeight,
  },
  item: {
    height: 25,
    margin: '5px 0',
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));

const SetLabelList = (props) => {
  const classes = useStyles();
  const { labels, labelsList, handleLabels } = props;

  const [checked, setChecked] = useState(labels);
  const [curValue, setCurValue] = useState(null);
  const [type, setType] = useState(null);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newType = currentIndex !== -1 ? 'del' : 'add';

    setType(newType);
    setCurValue(value);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    handleLabels(checked, curValue, type);
  }, [checked]);

  return (
    <Paper className={classes.list}>
      <List subheader={<ListSubheader>Label note</ListSubheader>}>
        {_.values(_.mapValues(labelsList, 'labelId')).map((labelId) => {
          const id = `checkbox-list-label-${labelId}`;

          return (
            <ListItem
              onClick={handleToggle(labelId)}
              className={classes.item}
              key={labelId}
              role={undefined}
              button
            >
              <Checkbox
                color="default"
                size="small"
                edge="start"
                checked={checked.indexOf(labelId) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': id }}
              />
              <ListItemText id={id} primary={labelsList[labelId].labelName} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

SetLabelList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelsList: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleLabels: PropTypes.func.isRequired,
};

export default SetLabelList;
