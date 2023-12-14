import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ datas }) {
  // console.log(datas);
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);

    // Declares the chart dimensions and margins.
    const width = 258;
    const height = 263;
    const marginTop = 30;
    const marginBottom = 35;

    // Declares the x (horizontal position) scale.
    const x = d3
      .scaleBand()
      .domain(datas.map((d) => d.day))
      .range([0, [width]]);

    // Declares the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain(
        [0, d3.max(datas, (d) => d.sessionLength) * 2],
        [height - marginBottom, marginTop],
      )
      .range([height, 0]);

    // Declares the line generator.
    const line = d3
      .line()
      .x((d) => x(d.day))
      .y((d) => y(d.sessionLength))
      .curve(d3.curveCardinal);

    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', '#E60000')
      .style('border-radius', '5px')
      .style('overflow', 'visible')
      .selectAll('.line')
      .data([datas])
      .join('path')
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#FFF');

    // Adds the x-axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x));
  }, [datas]);

  return (
    <div className="graphics__sessions">
      <svg ref={ref}></svg>
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
