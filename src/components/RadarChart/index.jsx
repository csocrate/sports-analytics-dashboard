import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

function RadarChart({ datas, kinds, width, height }) {
  const svgRef = useRef(null);

  console.log(datas);
  console.log(kinds);

  const axisConfig = Object.values(kinds).map(
    (el) => el[0].toUpperCase() + el.slice(1),
  );
  axisConfig.unshift(axisConfig.pop());
  console.log(axisConfig);

  // Defines ratio datas
  const maxValue = d3.max(datas, (d) => d.value);
  const datasWithRatio = d3.map(datas, (d) => ({
    ...d,
    ratio: (d.value / maxValue).toFixed(1),
  }));
  const ratioDatas = datasWithRatio.reduce((acc, d) => {
    acc.push(d.ratio);
    return acc;
  }, []);
  ratioDatas.unshift(ratioDatas.pop());
  console.log(ratioDatas);

  const centerX = width / 2;
  const centerY = height / 2;
  const numPoints = 6;
  const radius = height / 3;
  const points = [
    {
      x:
        Math.sin((0 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[0] +
        centerX,
      y:
        Math.cos((0 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[0] +
        centerY,
    },
    {
      x:
        Math.sin((1 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[1] +
        centerX,
      y:
        Math.cos((1 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[1] +
        centerY,
    },
    {
      x:
        Math.sin((2 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[2] +
        centerX,
      y:
        Math.cos((2 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[2] +
        centerY,
    },
    {
      x:
        Math.sin((3 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[3] +
        centerX,
      y:
        Math.cos((3 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[3] +
        centerY,
    },
    {
      x:
        Math.sin((4 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[4] +
        centerX,
      y:
        Math.cos((4 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[4] +
        centerY,
    },
    {
      x:
        Math.sin((5 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[5] +
        centerX,
      y:
        Math.cos((5 / numPoints) * Math.PI * 2 + Math.PI) *
          radius *
          ratioDatas[5] +
        centerY,
    },
  ];
  const lines = d3.range(numPoints).map((i) => ({
    x1: points[i].x,
    y1: points[i].y,
    x2: points[(i + 1) % numPoints].x,
    y2: points[(i + 1) % numPoints].y,
  }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('fill', '#282D30');

    //Draw the Circle
    svg
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius)
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 2);
    //Add polygon
    svg
      .selectAll('line')
      .data(lines)
      .enter()
      .append('line')
      .attr('x1', (d) => d.x1)
      .attr('y1', (d) => d.y1)
      .attr('x2', (d) => d.x2)
      .attr('y2', (d) => d.y2)
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);
    //Add labels
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((0 / numPoints) * Math.PI * 2 + Math.PI) * radius + centerX,
      )
      .attr(
        'y',
        Math.cos((0 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX -
          10,
      )
      .text(axisConfig[0]);
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((1 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX -
          35,
      )
      .attr(
        'y',
        Math.cos((1 / numPoints) * Math.PI * 2 + Math.PI) * radius + centerX,
      )
      .text(axisConfig[1]);
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((2 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX -
          25,
      )
      .attr(
        'y',
        Math.cos((2 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX +
          20,
      )
      .text(axisConfig[2]);
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((3 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX +
          25,
      )
      .attr(
        'y',
        Math.cos((3 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX +
          20,
      )
      .text(axisConfig[3]);
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((4 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX +
          35,
      )
      .attr(
        'y',
        Math.cos((4 / numPoints) * Math.PI * 2 + Math.PI) * radius + centerX,
      )
      .text(axisConfig[4]);
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'x',
        Math.sin((5 / numPoints) * Math.PI * 2 + Math.PI) * radius +
          centerX +
          40,
      )
      .attr(
        'y',
        Math.cos((5 / numPoints) * Math.PI * 2 + Math.PI) * radius + centerX,
      )
      .text(axisConfig[5]);
  }, [axisConfig, centerX, centerY, lines, radius]);

  return (
    <div className="blocks__performance">
      <svg
        className="radar-chart"
        width={width}
        height={height}
        ref={svgRef}
      ></svg>
    </div>
  );
}

RadarChart.propTypes = {
  datas: PropTypes.array,
  kinds: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};

RadarChart.defaultProps = {
  datas: [],
  kinds: {},
  width: '',
  height: '',
};
export default RadarChart;
