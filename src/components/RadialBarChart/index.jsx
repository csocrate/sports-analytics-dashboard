/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - components/RadialBarChart
 * ------------------------------------------------------------
 */

import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const margin = { top: 0, bottom: 40, left: 30, right: 30 };

/**
 * This component renders user's achievement of the day's goal
 * as a radial bar chart.
 *
 * @component
 * @param {Object} props - Props for the component.
 *  @param {number} props.value - Value for the chart.
 *  @param {number} props.width - Width of the chart.
 *  @param {number} props.height - Height of the chart.
 * @returns {JSX.Element} Chart component.
 */
function RadialBarChart({ value, width, height }) {
  const boundWidth = width - margin.left - margin.right,
    boundHeight = height + margin.top + margin.bottom;
  const radius = Math.min(boundWidth, boundHeight) / 2;

  const ref = useRef();

  useEffect(() => {
    !isNaN(value) &&
      (() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove(); // To avoid duplicated g element after page load

        const g = svg
          .append('g')
          .attr(
            'transform',
            `translate(${boundWidth / 1.35},${boundHeight / 2.3})`,
          );

        const radialBar = d3
          .arc()
          .innerRadius(radius - 8)
          .outerRadius(radius)
          .startAngle(-value * Math.PI * 2)
          .endAngle(0)
          .cornerRadius(25);

        g.append('path').attr('d', radialBar);

        const textContainer = g.append('g').attr('class', 'score'),
          topText = `${value * 100}%`,
          centerText = 'de votre',
          bottomText = 'objectif',
          title = 'Score';

        textContainer
          .append('g')
          .attr('class', 'score__top')
          .attr('transform', `translate(0, -20)`)
          .append('text')
          .text(topText)
          .attr('y', '12');

        textContainer
          .append('g')
          .attr('transform', `translate(0, 0)`)
          .append('text')
          .attr('y', '10')
          .text(centerText);

        textContainer
          .append('g')
          .attr('transform', `translate(0, 20)`)
          .append('text')
          .attr('y', '7')
          .text(bottomText);

        svg
          .append('text')
          .attr('class', 'radial-chart__title')
          .attr('x', 30)
          .attr('y', 30)
          .text(title);
      })();
  }, [value, boundWidth, boundHeight, radius]);

  return (
    <div className="blocks__score">
      <svg
        className="radial-chart"
        width={width}
        height={height}
        ref={ref}
      ></svg>
    </div>
  );
}

RadialBarChart.propTypes = {
  value: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

RadialBarChart.defaultProps = {
  width: 200,
  height: 205,
};

export default RadialBarChart;
