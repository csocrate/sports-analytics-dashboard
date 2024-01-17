/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - components/GroupedBarChart
 * ------------------------------------------------------------
 */

import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 70, bottom: 20, left: 10, right: 40 };

/**
 * This component renders user's daily activity
 * as a grouped bar chart.
 *
 * @component
 * @param {Object} props - Props for the component.
 *  @param {Array} props.datas - Data for the chart.
 *  @param {number} props.width - Width of the chart.
 *  @param {number} props.height - Height of the chart.
 * @returns {JSX.Element} Chart component.
 */
function GroupedBarChart({ datas, width, height }) {
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
        unit: 'kg',
        name: `Poids (kg)`,
        color: '#000',
      });
      acc.push({
        day: d.day,
        value: d.calories,
        unit: 'kCal',
        name: 'Calories brûlées (kCal)',
        color: '#E60000',
      });
      return acc;
    },
    [],
  );

  // Declares the chart dimensions and margins.
  const boundWidth = width - margin.right - margin.left;
  const boundHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const groups = d3.group(barChartDatas, (d) => d.day);
    const subgroups = new Set(barChartDatas.map((d) => d.name));

    // List of colors
    const colors = new Set(barChartDatas.map((d) => d.color));
    const colorScale = d3
      .scaleOrdinal()
      .domain(Array.from(subgroups))
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
      .domain(subgroups)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.75);
    svg
      .append('g')
      .attr('transform', `translate(0,${boundHeight + margin.bottom})`)
      .call(d3.axisBottom(fx).tickSize(0).tickPadding(25))
      .call((g) => g.selectAll('.domain').remove());

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
          .attr('x2', boundWidth - (margin.right + margin.left) * 0.35),
      );

    // key disabled on [key, data] for eslint
    const mouseOver = (e, [, data]) => {
      const activity = data.reduce((acc, d) => {
        acc.push(d.value + d.unit);
        return acc;
      }, []);

      const topText = activity[0];
      const bottomText = activity[1];

      //Adds tooltip
      const tooltip = d3
        .select(e.target.parentNode)
        .append('foreignObject')
        .attr('class', 'tooltip-activity')
        .attr('x', 90)
        .attr('y', 40)
        .attr('width', 50)
        .attr('height', 70)
        .append('xhtml:div')
        .attr('xmlns', 'http://www.w3.org/1999/xhtml');
      tooltip.append('xhtml:span').text(topText);
      tooltip.append('xhtml:span').text(bottomText);
    };

    const mouseOut = (e) => {
      d3.select(e.target.parentNode).select('.tooltip-activity').remove();
    };

    // Appends a group for each day, and a rect for each name
    const barGroup = svg
      .append('g')
      .selectAll('.grouped-bars')
      .data(groups)
      .join('g')
      .attr('class', 'grouped-bars')
      .attr('transform', ([, data]) => `translate(${fx(data[0].day)},0)`);
    // key disabled on [key, data] for eslint

    barGroup
      .selectAll()
      .data(([, d]) => d)
      .join('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('ry', 5)
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.value))
      .attr('fill', (d) => d.color);

    const tooltipBar = d3
      .selectAll('.grouped-bars')
      .data(groups)
      .append('rect');
    tooltipBar
      .attr('class', 'tooltip-bar')
      .attr('x', 12)
      .attr('y', 70)
      .attr('width', 70)
      .attr('height', 240)
      .on('mouseover', mouseOver)
      .on('mouseout', mouseOut);

    // Adds legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${boundWidth - margin.right * 4.5},0)`)
      .selectAll('g')
      .data(Array.from(subgroups))
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
      .attr('transform', `translate(${boundHeight - margin.top * 2.75},0)`);
    title
      .append('text')
      .attr('x', -60)
      .attr('y', 15)
      .text(svgTitle)
      .style('font-size', '15px')
      .style('font-weight', '700')
      .attr('fill', '#20253A');
  }, [barChartDatas, boundHeight, boundWidth]);

  return (
    <div className="bar-chart">
      <svg width={width} height={height} ref={svgRef}></svg>
    </div>
  );
}

GroupedBarChart.propTypes = {
  datas: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
};

GroupedBarChart.defaultProps = {
  datas: [],
  width: 650,
  height: 380,
};

export default GroupedBarChart;
