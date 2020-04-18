import React, { useState, useEffect } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const listHeight = 50;

const useStyles = makeStyles((theme) => ({
  list: {
    // position: 'absolute',
    // bottom: '100%',
    // top: '100%',
    // right: 0,
    width: 225,
    minHeight: listHeight,
    // zIndex: 99999,
    // padding: theme.spacing(1),
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

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    handleLabels(checked);
  }, [checked]);

  // console.log(checked);
  // console.log(labelsList);

  return (
    <Paper className={classes.list}>
      <List
        subheader={<ListSubheader>Label note</ListSubheader>}
      >
        {labelsList.map((labelName) => {
          // const { labelName, labelId } = label;
          const id = `checkbox-list-label-${labelName}`;

          return (
            <ListItem
              onClick={handleToggle(labelName)}
              className={classes.item}
              key={labelName}
              role={undefined}
              button
            >
              <Checkbox
                color="default"
                size="small"
                edge="start"
                checked={checked.indexOf(labelName) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': id }}
              />
              <ListItemText
                id={id}
                primary={labelName}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
  // return (
  //   <Paper className={classes.list}>
  //     <Typography variant="body2">Label note</Typography>
  //   </Paper>
  // );
};

export default SetLabelList;
