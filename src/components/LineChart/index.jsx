import PropTypes from 'prop-types';
// import * as d3 from 'd3';

function LineChart({ datas }) {
  console.log(datas);
}

LineChart.propTypes = {
  datas: PropTypes.array.isRequired,
};

export default LineChart;
