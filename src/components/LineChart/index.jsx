/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - components/LineChart
 * ------------------------------------------------------------
 */

import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 10, bottom: 30, left: 0, right: 0 };

/**
 * This component renders user's average session duration
 * as a line chart.
 *
 * @component
 * @param {Object} props - Props for the component.
 *  @param {Array} props.datas - Data for the chart.
 *  @param {number} props.width - Width of the chart.
 *  @param {number} props.height - Height of the chart.
 * @returns {JSX.Element} Chart component.
 */
function LineChart({ datas, width, height }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Declares the chart dimensions and margins.
    const boundWidth = width - margin.left - margin.right,
      boundHeight = height - margin.top - margin.bottom;

    // Declares the x (horizontal position) scale.
    const x = d3.scaleUtc(
      d3.extent(datas, (d) => d.day),
      [margin.left, boundWidth - margin.right],
    );
    const xAxis = d3.scaleUtc(
      d3.extent(datas, (d) => d.day),
      [margin.left + 20, boundWidth - (margin.left + 20)],
    );

    // Declares the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain(
        [0, d3.max(datas, (d) => d.sessionLength) * 2.5],
        [boundHeight - margin.bottom, margin.top],
      )
      .range([boundHeight, 0]);

    // Declares the line generator.
    const line = d3
      .line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveCardinal.tension(0));

    const dayLetters = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const topTitle = 'Durée moyenne des';
    const bottomTitle = 'sessions';

    svg
      .attr('width', boundWidth)
      .attr('height', boundHeight + margin.top + margin.bottom);

    // Adds line
    svg
      .append('path')
      .datum(datas)
      .attr('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    const tooltip = d3.select('.tooltip-session');
    const tooltipGroup = svg.append('g');

    const tooltipDot = tooltipGroup
      .append('circle')
      .attr('class', 'tooltip-dot')
      .attr('r', 5)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('fill', '#FFF')
      .attr('stroke', '#F9F9F9')
      .attr('stroke-width', '3');

    const tooltipRect = tooltipGroup
      .append('rect')
      .attr('class', 'tooltip-rect')
      .attr('width', '0')
      .attr('height', boundHeight + margin.top + margin.bottom);

    const mousePosition = (e) => {
      const mouseCoordinates = d3.pointer(e);
      const xScale = d3.scaleBand(
        datas.map((d) => d.day),
        [0, boundWidth + margin.left + margin.right],
      );

      const xPos = mouseCoordinates[0];
      const eachBand = xScale.bandwidth();
      let index = Math.floor(xPos / eachBand);
      if (index <= 0) index = 0;
      const currentData = datas[index];

      tooltipDot
        .classed('visible', true)
        .attr('cx', x(currentData.day))
        .attr('cy', y(currentData.sessionLength))
        .raise();

      tooltip
        .classed('visible', true)
        .style('top', `${y(currentData.sessionLength) - 50}px`);

      currentData.day >= datas.length - 1
        ? tooltip.style('left', `${x(currentData.day) - 70}px`)
        : tooltip.style('left', `${x(currentData.day)}px`);

      tooltip.select('span').text(`${currentData.sessionLength} min`);

      tooltipRect
        .classed('visible', true)
        .attr('width', x(currentData.day))
        .attr('height', boundHeight + margin.top + margin.bottom);
    };

    const mouseLeave = () => {
      tooltipDot.classed('visible', false);
      tooltip.classed('visible', false);
      tooltipRect.classed('visible', false);
    };

    // Adds the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${boundHeight})`)
      .call(
        d3
          .axisBottom(x)
          .scale(xAxis)
          .tickFormat((d) => dayLetters[d - 1])
          .tickSize(0)
          .tickPadding(15),
      )
      .select('.domain')
      .remove();

    svg.append('text').attr('x', 30).attr('y', 35).text(topTitle);
    svg.append('text').attr('x', 30).attr('y', 55).text(bottomTitle);

    // Adds a coverage area
    svg
      .append('rect')
      .attr('width', boundWidth)
      .attr('height', boundHeight + margin.top + margin.bottom)
      .on('mousemove', mousePosition)
      .on('mouseleave', mouseLeave);
  }, [datas, width, height]);

  return (
    <div className="blocks__sessions">
      <svg className="line-chart" ref={svgRef}></svg>
      <div className="tooltip-session">
        <span></span>
      </div>
    </div>
  );
}

LineChart.propTypes = {
  datas: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

LineChart.defaultProps = {
  datas: [],
  width: 258,
  height: 263,
};

export default LineChart;
