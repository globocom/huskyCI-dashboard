import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';


const Metric = ({
  boxMargin, boxSizeWidth, boxSizeHeight, title, value,
}) => (
  <div style={{
    margin: boxMargin,
    width: boxSizeWidth,
    height: boxSizeHeight - 150,
  }}
  >
    <Paper>
      <div className="metric-container">
        <span className="title-box">{title}</span>
        <span className="metric-value">{value}</span>
      </div>
    </Paper>
  </div>
);

Metric.defaultProps = {
  boxMargin: 8,
  boxSizeWidth: 400,
  boxSizeHeight: 300,
};

Metric.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  boxMargin: PropTypes.number,
  boxSizeWidth: PropTypes.number,
  boxSizeHeight: PropTypes.number,
};

export default Metric;
