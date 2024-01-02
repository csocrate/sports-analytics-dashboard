import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

function RadialBarChart({ value }) {
  const width = 200;
  const height = width;
  const radius = Math.min(width, height) / 2;

  const ref = useRef();

  useEffect(() => {
    !isNaN(value) &&
      (() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove(); // To avoid duplicated g element after page load

        const g = svg
          .attr('width', '100%')
          .attr('height', '100%')
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        const arc = d3
          .arc()
          .innerRadius(radius - 10)
          .outerRadius(radius)
          .startAngle(-value * Math.PI)
          .endAngle(0)
          .cornerRadius(25);

        g.append('path').attr('d', arc).attr('fill', '#E60000');

        const textContainer = g.append('g').attr('text-anchor', 'middle');

        const topText = textContainer
          .append('g')
          .attr('transform', `translate(0, -20)`);

        const centerText = textContainer
          .append('g')
          .attr('transform', `translate(0, 0)`);

        const bottomText = textContainer
          .append('g')
          .attr('transform', `translate(0, 20)`);

        const score = `${value * 100}%`;

        topText
          .append('text')
          .text(score)
          .attr('fill', '#000')
          .attr('y', '2')
          .style('font-size', '1.75em')
          .attr('font-weight', '700');

        centerText
          .append('text')
          .text('de votre')
          .attr('fill', '#74798C')
          .attr('y', '5')
          .style('font-size', '.875em')
          .attr('font-weight', '500');

        bottomText
          .append('text')
          .text('objectif')
          .attr('fill', '#74798C')
          .attr('y', '7')
          .style('font-size', '.875em')
          .attr('font-weight', '500');
      })();
  }, [value, width, height, radius]);

  return (
    <div className="blocks__score">
      <p>Score</p>
      <svg ref={ref}></svg>
    </div>
  );
}

RadialBarChart.propTypes = {
  value: PropTypes.number,
};

export default RadialBarChart;
