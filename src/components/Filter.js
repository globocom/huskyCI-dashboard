import React from 'react';

const Filter = ({ options = [] }) => 
  <select style={{
    borderRadius: '4px',
    color: '#3d4572',
    width: '140px',
    height: '30px',
    padding: '0 0 0 5px',
    fontWeight: '700',
    border: 'solid 1px #a57e71',
    margin: '0 10px 0 10px',
  }}>
    { 
      options.map(option => 
        <option value={option.value}>{option.label}</option>
      ) 
    }
  </select>

export default Filter;
