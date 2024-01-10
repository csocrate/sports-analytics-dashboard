import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const margin = { top: 0, bottom: 40, left: 50, right: 40 };

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
            `translate(${boundWidth / 1.325},${boundHeight / 2.3})`,
          );

        const radialBar = d3
          .arc()
          .innerRadius(radius - 10)
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
          .attr('y', '2');

        textContainer
          .append('g')
          .attr('transform', `translate(0, 0)`)
          .append('text')
          .attr('y', '5')
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
          .attr('y', 45)
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
  value: '',
  width: '',
  height: '',
};

export default RadialBarChart;
