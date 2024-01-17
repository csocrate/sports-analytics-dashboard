/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - components/RadarChart
 * ------------------------------------------------------------
 */

import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

/**
 * This component renders user activity types
 * as a radar chart.
 *
 * @component
 * @param {Object} props - Props for the component.
 *  @param {Array} props.datas - Data for the chart.
 *  @param {Object} props.kinds - Kinds for the chart.
 *  @param {number} props.width - Width of the chart.
 *  @param {number} props.height - Height of the chart.
 * @returns {JSX.Element} Chart component.
 */
function RadarChart({ datas, kinds, width, height }) {
  const svgRef = useRef(null);

  const axisLabels = Object.values(kinds).map(
    (el) => el[0].toUpperCase() + el.slice(1),
  );
  axisLabels.unshift(axisLabels.pop());

  // Defines ratio datas
  const maxValue = d3.max(datas, (d) => d.value);
  const datasWithRatio = d3.map(datas, (d) => ({
    ...d,
    ratio: parseFloat((d.value / maxValue).toFixed(1)),
  }));
  const ratioDatas = datasWithRatio.reduce((acc, d) => {
    acc.push(d.ratio);
    return acc;
  }, []);
  ratioDatas.unshift(ratioDatas.pop());

  const centerX = width / 2,
    centerY = height / 2,
    numPoints = 6,
    radius = height / 3,
    points = [
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
    ],
    radarDatas = ratioDatas.map((ratio, i) => ({
      name: axisLabels[i],
      ratioData: ratio,
    })),
    axisLines = radarDatas.map((axis, i) => ({
      x1: centerX,
      y1: centerY,
      x2: Math.sin((i / numPoints) * Math.PI * 2 + Math.PI) * radius + centerX,
      y2: Math.cos((i / numPoints) * Math.PI * 2 + Math.PI) * radius + centerY,
      axeLabel: axis.name,
    })),
    polygonPoints = points.map((point) => `${point.x},${point.y}`);

  const mainPolygon = polygonPoints.map((coord) =>
    coord.split(',').map(Number),
  );
  // Avoids NaN error on <polygon> attribute points
  const polygonNbPoints = mainPolygon.filter(
    (coordPoints) => !coordPoints.some(isNaN),
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const graduations = [0.125, 0.25, 0.5, 0.75, 1];

    //Adds main polygon
    svg
      .append('polygon')
      .attr('class', 'main-polygon')
      .attr('points', polygonNbPoints);

    // Adds axis lines
    svg
      .selectAll('line')
      .data(axisLines)
      .join('line')
      .attr('class', 'axis-line')
      .attr('x1', (d) => d.x1)
      .attr('y1', (d) => d.y1)
      .attr('x2', (d) => d.x2)
      .attr('y2', (d) => d.y2);
    svg.selectAll('.axis-line').remove();

    // Draws axis polygons corresponding to graduations
    for (let i = 0; i < graduations.length; i++) {
      const axisPolygons = radarDatas.map((axis, j) => ({
        x:
          centerX +
          Math.sin((j / numPoints) * Math.PI * 2 + Math.PI) *
            radius *
            graduations[i],
        y:
          centerY +
          Math.cos((j / numPoints) * Math.PI * 2 + Math.PI) *
            radius *
            graduations[i],
      }));

      svg
        .append('polygon')
        .attr('class', 'axis-polygon')
        .attr(
          'points',
          axisPolygons.map((point) => `${point.x},${point.y}`),
        );
    }

    // Adds labels
    const labelPositions = [
      { x: 0, y: -10 },
      { x: -25, y: 0 },
      { x: -25, y: 5 },
      { x: 0, y: 15 },
      { x: 28, y: 5 },
      { x: 23, y: 0 },
    ];

    for (let i = 0; i < labelPositions.length; i++) {
      svg
        .append('text')
        .attr('text-anchor', 'middle')
        .attr(
          'x',
          Math.sin((i / numPoints) * Math.PI * 2 + Math.PI) * radius +
            centerX +
            labelPositions[i].x,
        )
        .attr(
          'y',
          Math.cos((i / numPoints) * Math.PI * 2 + Math.PI) * radius +
            centerY +
            labelPositions[i].y,
        )
        .text(axisLabels[i]);
    }
  }, [
    radarDatas,
    axisLabels,
    centerX,
    centerY,
    polygonNbPoints,
    radius,
    ratioDatas,
    axisLines,
  ]);

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
  width: 200,
  height: 205,
};
export default RadarChart;
