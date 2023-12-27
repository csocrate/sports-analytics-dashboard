import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 10, bottom: 20, left: 10, right: 40 };

function BarChart({ datas, width, height }) {
  const svgRef = useRef(null);

  const datasUpdated = d3.map(new Set(datas), (d) => {
    const day = new Date(d.day);
    return {
      ...d,
      day: day.getDate(),
    };
  });
  const barChartDatas = d3.reduce(
    new Set(datasUpdated),
    (acc, d) => {
      acc.push({
        day: d.day,
        value: d.kilogram,
        name: 'Poids(kg)',
        color: '#000',
      });
      acc.push({
        day: d.day,
        value: d.calories,
        name: 'Calories brûlées(kCal)',
        color: '#E60000',
      });
      return acc;
    },
    [],
  );
  // console.log(barChartDatas);

  // Declares the chart dimensions and margins.
  const boundWidth = width - margin.right - margin.left;
  const boundHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // List of names
    const names = new Set(barChartDatas.map((d) => d.name));

    // Adds X axis
    const fx = d3
      .scaleBand()
      .domain(new Set(barChartDatas.map((d) => d.day)))
      .rangeRound([margin.left, boundWidth - margin.right])
      .paddingInner(0.1);
    const x = d3
      .scaleBand()
      .domain(names)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.75);
    svg
      .append('g')
      .attr('transform', `translate(0,${boundHeight - margin.top})`)
      .call(d3.axisBottom(fx).tickSize(0).tickPadding(25))
      .call((g) => g.selectAll('.domain').remove())
      .selectAll('.tick text')
      .style('font-size', '14px');

    // Adds Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(barChartDatas, (d) => d.value)])
      .nice()
      .rangeRound([boundHeight + margin.bottom, margin.top]);
    svg
      .append('g')
      .attr('transform', `translate(${boundWidth}, 0)`)
      .call(d3.axisRight(y).tickSize(0))
      .call((g) => g.selectAll('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .attr(
            'transform',
            `translate(-${boundWidth + margin.right + margin.left}, -0)`,
          )
          .attr('x2', boundWidth + margin.right + margin.left)
          .attr('stroke-opacity', 0.5)
          .attr('stroke-dasharray', '2,2'),
      )
      .selectAll('.tick text')
      .style('font-size', '14px');

    // Appends a group for each day, and a rect for each name
    svg
      .append('g')
      .selectAll()
      .data(d3.group(barChartDatas, (d) => d.day))
      .join('g')
      .attr('transform', ([day]) => `translate(${fx(day)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('ry', 5)
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.value))
      .attr('fill', (d) => d.color);
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
