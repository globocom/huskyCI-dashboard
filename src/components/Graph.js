import { Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import React from 'react';

const chartOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      ticks: {
        min: 0,
      },
    }],
  },
};

const Graph = ({ boxMargin, boxSizeWidth, boxSizeHeight, data }) => (
  <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
    <Paper>
      <Bar
        width={boxSizeWidth}
        height={boxSizeHeight}
        data={data}
        options={chartOptions}
      />
    </Paper>
  </div>
);

Graph.defaultProps = {
  boxMargin: 8,
  boxSizeWidth: 400,
  boxSizeHeight: 300,
};

Graph.propTypes = {
  data: PropTypes.node.isRequired,
  boxMargin: PropTypes.number,
  boxSizeWidth: PropTypes.number,
  boxSizeHeight: PropTypes.number,
};

export default Graph;
