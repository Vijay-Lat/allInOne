import React, { useRef, useEffect } from "react";
import {
  select,
  csv,
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveBasis,
  schemeCategory10,
  nest,
  descending,
} from "d3";

import { ColorLegend } from "./ColorLegend";

const Home = () => {
  const graphRef = useRef();

  const width = 800;
  const height = 400;
  const svg = select(graphRef.current)
    .attr("width", width)
    .attr("height", height);

  const render = (data) => {
    console.log(data, "inside");
    const title = "Class Wise Performance ";

    const xValue = (d) => d.timestamp;
    const xAxisLabel = "Month";

    const yValue = (d) => d.temperature;
    const circleRadius = 6;
    const yAxisLabel = "temperature";

    const colorValue = (d) => d.temperature;

    const margin = { top: 60, right: 160, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const colorScale = scaleOrdinal(schemeCategory10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 80)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")
      .text(xAxisLabel);

    const lineGenerator = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveBasis);

    const lastYValue = (d) => yValue(d.values[d.values.length - 1]);

    const nested = nest()
      .key(colorValue)
      .entries(data)
      .sort((a, b) => descending(lastYValue(a), lastYValue(b)));

    console.log(nested);

    colorScale.domain(nested.map((d) => d.key));

    g.selectAll(".line-path")
      .data(nested)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("class", "line-path")
      .attr("d", (d) => lineGenerator(d.values))
      .attr("stroke", (d) => colorScale(d.key));

    g.append("text").attr("class", "title").attr("y", -10).text(title);

    svg.append("g").attr("transform", `translate(790,121)`).call(ColorLegend, {
      colorScale,
      circleRadius: 13,
      spacing: 30,
      textOffset: 15,
    });
  };

    useEffect(() => {
      csv(
        "https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv"
      ).then((data) => {
        console.log(data, "data")
        data.forEach((d) => {
          d.temperature = +d.temperature;
          d.timestamp = new Date(d.timestamp);
        });
        render(data);
      });
    }, []);

  const rere = [
    {
      section: "A",
      temperature: 54,
      month: "1609439400",
    },
    {
      section: "A",
      temperature: 34,
      month: "1609439400",
    },
    {
      section: "A",
      temperature: 73,
      month: "1609439400",
    },
    {
      section: "B",
      temperature: 90,
      month: "1609439400",
    },
    {
      section: "B",
      temperature: 21,
      month: "1609439400",
    },
    {
      section: "B",
      temperature: 54,
      month: "1609439400",
    },
  ];

  // useEffect(() => {
  //   rere.forEach((d) => {
  //     d.temperature = +d.temperature;
  //     d.timestamp = new Date(d.month);
  //   });
  //   render(rere);
  // }, [rere]);
  console.log(rere, "rerer");
  return <svg ref={graphRef}></svg>;
};

export default Home;
