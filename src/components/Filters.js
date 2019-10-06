import React from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

export default function Filters(props) {
  const [option, setOption] = React.useState(props);
  const handleChange = event => {
    setOption(event.target.value);
  };
  console.log('option', option.info);
  return (
    <div>
      <InputLabel htmlFor="select-filters">{props.labelValue}</InputLabel>
      <Select value={option.value} onChange={handleChange}>
        {option.info.map(option => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </div>
  );
}
