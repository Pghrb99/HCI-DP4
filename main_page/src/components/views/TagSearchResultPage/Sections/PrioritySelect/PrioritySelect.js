import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PrioritySelect() {
  const classes = useStyles();
  const [priority, setPriority] = useState(1);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <div className="PrioritySelect">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          onChange={handleChange}
        >
          <MenuItem value={1}>Easy to start</MenuItem>
          <MenuItem value={2}>Cost-effective</MenuItem>
          <MenuItem value={3}>Schedule-flexible</MenuItem>
          <MenuItem value={4}>Good for health</MenuItem>
          <MenuItem value={5}>Safe</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}