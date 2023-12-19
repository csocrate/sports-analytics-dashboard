import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 10, bottom: 30, left: 0, right: 0 };

function LineChart({ datas }) {
  // console.log(datas);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Declares the chart dimensions and margins.
    const width = 258 - margin.left - margin.right,
      height = 263 - margin.top - margin.bottom;

    // Declares the x (horizontal position) scale.
    const x = d3.scaleUtc(
      d3.extent(datas, (d) => d.day),
      [margin.left, width - margin.right],
    );
    const xAxis = d3.scaleUtc(
      d3.extent(datas, (d) => d.day),
      [margin.left + 20, width - (margin.left + 20)],
    );

    // Declares the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain(
        [0, d3.max(datas, (d) => d.sessionLength) * 2.5],
        [height - margin.bottom, margin.top],
      )
      .range([height, 0]);

    // Declares the line generator.
    const line = d3
      .line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveBasis);

    const dayLetters = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const topTitle = 'Durée moyenne des';
    const bottomTitle = 'sessions';
    const tooltip = d3.select('.tooltip');
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
      .attr('height', height + margin.top + margin.bottom);

    const mousePosition = (e) => {
      const mouseCoordinates = d3.pointer(e);
      // console.log(mouseCoordinates);
      const xCoordinate = x.invert(mouseCoordinates[0]);
      const dayBisector = d3.bisector((d) => d.day).right;
      const index = dayBisector(datas, xCoordinate);
      const currentData = datas[Math.max(0, index - 1)];
      // console.log(currentData);

      tooltipDot
        .classed('visible', true)
        .attr('cx', x(currentData.day))
        .attr('cy', y(currentData.sessionLength))
        .raise();

      tooltip
        .classed('visible', true)
        .style('top', `${y(currentData.sessionLength) - 50}px`)
        .style('left', `${x(currentData.day)}px`);

      tooltip.select('p').text(`${currentData.sessionLength} min`);

      tooltipRect
        .classed('visible', true)
        .attr('width', x(currentData.day))
        .attr('height', height + margin.top + margin.bottom);
    };

    svg
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom);

    // Adds the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(x)
          .scale(xAxis)
          .tickValues([1, 2, 3, 4, 5, 6, 7])
          .tickFormat((d) => dayLetters[d - 1])
          .tickSize(0)
          .tickPadding(1),
      )
      .select('.domain')
      .remove();

    svg.append('text').attr('x', 30).attr('y', 45).text(topTitle);
    svg.append('text').attr('x', 30).attr('y', 65).text(bottomTitle);

    // Adds line
    svg
      .append('path')
      .datum(datas)
      .attr('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Adds a coverage area
    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom)
      .on('mousemove', mousePosition);
  }, [datas]);

  return (
    <div className="graphics__sessions">
      <svg className="line-chart" ref={svgRef}></svg>
      <div className="tooltip">
        <p></p>
      </div>
    </div>
  );
}

LineChart.propTypes = {
  datas: PropTypes.array,
};

LineChart.defaultProps = {
  datas: [],
};

export default LineChart;
