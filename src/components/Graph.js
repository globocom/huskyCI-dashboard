import { Paper } from "@material-ui/core";
import { Bar, Doughnut, Pie, Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import React from "react";

const barChartDefaultOptions = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
        },
      },
    ],
  },
};

const pieChartDefaultOptions = {
  legend: {
    display: true,
  },
};

const dounghnutChartDefaultOptions = {
  legend: {
    display: true,
  },
};

const lineChartDefaultOptions = {
  legend: {
    display: true,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
        },
      },
    ],
  },
};

const GraphType = {
  Pie: "Pie",
  Doughnut: "Doughnut",
  Bar: "Bar",
  Line: "Line",
};

const asDoughnut = ({
  data,
  width,
  height,
  options = dounghnutChartDefaultOptions,
}) => <Doughnut data={data} width={width} height={height} options={options} />;

const asPie = ({ data, width, height, options = pieChartDefaultOptions }) => (
  <Pie data={data} width={width} height={height} options={options} />
);

const asBar = ({ data, width, height, options = barChartDefaultOptions }) => (
  <Bar data={data} width={width} height={height} options={options} />
);

const asLine = ({ data, width, height, options = lineChartDefaultOptions }) => (
  <Line data={data} width={width} height={height / 7} options={options} />
);

const renderGraph = props => {
  switch (props.type) {
    case GraphType.Bar:
      return asBar({ ...props });
    case GraphType.Doughnut:
      return asDoughnut({ ...props });
    case GraphType.Pie:
      return asPie({ ...props });
    case GraphType.Line:
      return asLine({ ...props });
    default:
      return asBar({ ...props });
  }
};

const Graph = props => <Paper>{renderGraph(props)}</Paper>;

Graph.defaultProps = {
  type: GraphType.Bar,
  boxMargin: 8,
  width: 400,
  height: 300,
};

Graph.propTypes = {
  type: PropTypes.string,
  data: PropTypes.node.isRequired,
  boxMargin: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export { Graph, GraphType };
