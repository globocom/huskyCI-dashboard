import React, { useState } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

export default function Filters(props) {
  const [option, setOption] = useState(null);

  const handleChange = event => {
    setOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <InputLabel htmlFor="select-filters">{props.labelValue}</InputLabel>
      <Select value={option} onChange={handleChange}>
        {props.info.map(option => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </div>
  );
}
