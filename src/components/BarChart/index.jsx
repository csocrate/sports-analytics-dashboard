import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 30, bottom: 50, left: 30, right: 50 };

function BarChart({ datas, width, height }) {
  const svgRef = useRef(null);

  const barChartDatas = d3.map(new Set(datas), (d) => {
    const day = new Date(d.day);
    return {
      ...d,
      day: day.getDate(),
    };
  });

  // Declares the chart dimensions and margins.
  const boundWidth = width - margin.right - margin.left;
  const boundHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Declares the x (horizontal position) scale.
    const x = d3.scaleUtc(
      d3.extent(barChartDatas, (d) => d.day),
      [margin.left, boundWidth - margin.right],
    );
    const xAxis = d3.scaleUtc(
      d3.extent(barChartDatas, (d) => d.day),
      [margin.left, boundWidth - margin.left],
    );

    // Declares the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain(d3.extent(barChartDatas, (d) => d.kilogram))
      .range([boundHeight, 0]);
    const yAxis = d3.axisRight(y);

    // Adds the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${boundHeight})`)
      .call(d3.axisBottom(x).scale(xAxis).tickSize(0).tickPadding(20));

    // Adds the y-axis
    svg
      .append('g')
      .attr('transform', `translate(${boundWidth}, 0)`)
      .call(yAxis.tickSize(0));
    console.log(barChartDatas);
  }, [barChartDatas, boundHeight, boundWidth]);

  return (
    <div className="graphics__activity">
      <svg
        className="bar-chart"
        width={width}
        height={height}
        ref={svgRef}
      ></svg>
    </div>
  );
}

BarChart.propTypes = {
  datas: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

BarChart.defaultProps = {
  datas: [],
  width: '',
  height: '',
};

export default BarChart;
