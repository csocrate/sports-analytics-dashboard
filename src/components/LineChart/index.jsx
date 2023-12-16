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
    const x = d3
      .scaleBand()
      .domain(datas.map((d) => d.day))
      .range([0, width])
      .padding(0);
    // .paddingInner(1);

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

    svg
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom)
      .style('border-radius', '5px')
      .style('fill', '#FFF')
      .style('background', '#E60000');

    // Adds the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues([1, 2, 3, 4, 5, 6, 7])
          .tickFormat((d) => dayLetters[d - 1])
          .tickSize(0)
          .tickPadding(1),
      )
      .select('.domain')
      .remove();

    svg.selectAll('.tick text').style('font-size', '12').style('fill', '#FFF');

    svg
      .append('text')
      .attr('x', 30)
      .attr('y', 45)
      .text('Durée moyenne des sessions')
      .style('font-size', '12px')
      .attr('class', 'score-title');

    // Adds line
    svg
      .append('path')
      .datum(datas)
      .attr('fill', 'none')
      .attr('stroke', '#FFF')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [datas]);

  return (
    <div className="graphics__sessions">
      {/* <svg></svg> */}
      <svg ref={svgRef}></svg>
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
