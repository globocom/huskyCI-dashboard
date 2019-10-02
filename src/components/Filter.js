import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const filterStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 500,
  },
  formLabel: {
    lineHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));



const FilterComponent = (props) => {
  const {
    filterName, onChange, options, values, label,
  } = props;
  const [filters, setFilters] = React.useState([]);
  const classes = filterStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={`filter-${filterName.toLowerCase()}`}>{label}</InputLabel>
      <Select
        multiple
        value={filters}
        onChange={(e) => {
          setFilters(e.target.value);
          onChange(filterName, e.target.value);
        }}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option, i) => (
          <MenuItem key={values[i]} value={values[i]}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FilterComponent.propTypes = {
  filterName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterComponent;
