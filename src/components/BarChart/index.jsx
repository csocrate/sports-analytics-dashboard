import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 70, bottom: 20, left: 10, right: 40 };

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
        name: 'Poids (kg)',
        color: '#000',
      });
      acc.push({
        day: d.day,
        value: d.calories,
        name: 'Calories brûlées (kCal)',
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
    // List of colors
    const colors = new Set(barChartDatas.map((d) => d.color));
    const colorScale = d3
      .scaleOrdinal()
      .domain(Array.from(names))
      .range(Array.from(colors));

    const svgTitle = 'Activité quotidienne';

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
      .attr('transform', `translate(0,${boundHeight + margin.bottom})`)
      .call(d3.axisBottom(fx).tickSize(0).tickPadding(25))
      .call((g) => g.selectAll('.domain').remove())
      .selectAll('.tick text')
      .style('font-size', '14px')
      .style('font-weight', '700')
      .attr('fill', '#9B9EAC');

    // Adds Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(barChartDatas, (d) => d.value)])
      .nice()
      .rangeRound([boundHeight + margin.bottom, margin.top]);
    svg
      .append('g')
      .attr('transform', `translate(${boundWidth}, 0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.selectAll('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .attr(
            'transform',
            `translate(-${boundWidth + margin.right + margin.left}, -0)`,
          )
          .attr('x1', (margin.right + margin.left) * 1.75)
          .attr('x2', boundWidth - (margin.right + margin.left) * 0.35)
          .attr('stroke', '#9B9EAC')
          .attr('stroke-opacity', 0.5)
          .attr('stroke-dasharray', '2,2'),
      )
      .selectAll('.tick text')
      .style('font-size', '14px')
      .style('font-weight', '700')
      .attr('fill', '#9B9EAC');

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

    // Adds legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${boundWidth - margin.right * 4.5},0)`)
      .selectAll('g')
      .data(Array.from(names))
      .join('g')
      .attr('transform', (d, i) => `translate(${i * 95}, 0)`);
    legend
      .append('circle')
      .attr('r', 5)
      .attr('cx', -50)
      .attr('cy', 10)
      .attr('fill', (d) => colorScale(d));
    legend
      .append('text')
      .attr('x', -34)
      .attr('y', 10)
      .attr('dy', '.35em')
      .style('font-size', '12px')
      .style('font-weight', '700')
      .attr('fill', '#74798C')
      .text((d) => d);

    // Adds title
    const title = svg
      .append('g')
      .attr('transform', `translate(${boundHeight - margin.top * 2.35},0)`);
    title
      .append('text')
      .attr('x', -30)
      .attr('y', 15)
      .text(svgTitle)
      .style('font-size', '15px')
      .style('font-weight', '700')
      .attr('fill', '#20253A');
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
