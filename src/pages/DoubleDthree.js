import React, { useRef, useEffect } from "react";
import * as graph from "d3";
import "./styles.css";

const DoubleDthree = () => {
  const graphRef = useRef();
  useEffect(() => {
    renderMultiChart();
  }, []);

  const renderMultiChart = () => {
    var data = [
      {
        section: "Section-A",
        values: [
          { date: "2022-04-01", price: "50" },
          { date: "2022-05-01", price: "10" },
          { ddate: "2022-06-01", price: "5" },
          { date: "2022-07-01", price: "71" },
          { date: "2022-08-01", price: "20" },
          { date: "2022-09-01", price: "9" },
          { date: "2022-10-01", price: "220" },
          { date: "2022-11-01", price: "235" },
          { date: "2022-12-01", price: "61" },
          { date: "2022-01-01", price: "10" },
          { date: "2022-02-01", price: "10" },
          { date: "2022-03-01", price: "10" },
        ],
      },
      {
        section: "Section-B",
        values: [
          { date: "2022-04-01", price: "200" },
          { date: "2022-05-01", price: "120" },
          { date: "2022-06-01", price: "33" },
          { date: "2022-07-01", price: "21" },
          { date: "2022-08-01", price: "51" },
          { date: "2022-09-01", price: "190" },
          { date: "2022-10-01", price: "120" },
          { date: "2022-11-01", price: "85" },
          { date: "2022-12-01", price: "221" },
          { date: "2022-01-01", price: "101" },
          { date: "2022-02-01", price: "10" },
          { date: "2022-03-01", price: "10" },
        ],
      },
      {
        section: "Section-C",
        values: [
          { date: "2022-04-01", price: "50" },
          { date: "2022-05-01", price: "10" },
          { ddate: "2022-06-01", price: "5" },
          { date: "2022-07-01", price: "71" },
          { date: "2022-08-01", price: "20" },
          { date: "2022-09-01", price: "9" },
          { date: "2022-10-01", price: "100" },
          { date: "2022-11-01", price: "100" },
          { date: "2022-12-01", price: "61" },
          { date: "2022-01-01", price: "10" },
          { date: "2022-02-01", price: "10" },
          { date: "2022-03-01", price: "10" },
        ],
      },
    ];

    const width = 800;
    const height = 400;
    const margin = 10;
    const duration = 250;

    const lineOpacity = "0.25";
    const lineOpacityHover = "0.85";
    const otherLinesOpacityHover = "0.1";
    const lineStroke = "1.5px";
    const lineStrokeHover = "2.5px";

    const circleOpacity = "0.85";
    const circleOpacityOnLineHover = "0.25";
    const circleRadius = 3;
    const circleRadiusHover = 6;

    /* Format Data */

    const parseDate = graph.timeParse("%Y-%m-%d");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
      });
    });

    /* Scale */
    const xScale = graph
      .scaleTime()
      .domain(graph.extent(data[0].values, (d) => d.date))
      .range([0, width - margin]);

    const yScale = graph
      .scaleLinear()
      .domain([0, graph.max(data[0].values, (d) => d.price)])
      .range([height - margin, 0]);

    const color = graph.scaleOrdinal(graph.schemeCategory10);

    /* Add SVG */
    const svg = graph
      .select(graphRef.current)
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    const line = graph
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price));

    const lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .on("mouseover", function (d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.section)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 5);
      })
      .on("mouseout", function (d) {
        svg.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d.values))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function (d) {
        graph.selectAll(".line").style("opacity", otherLinesOpacityHover);
        graph.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        graph
          .select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
        const area = graph
          .area()
          .x((d) => xScale(d.date))
          .y0(yScale(0))
          .y1((d) => yScale(d.price));
        line
          .append("path")
          .datum(data, (d) => d.values)
          .attr("d", area)
          .attr("fill", "red")
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("transform", "translate(20,50");
      })
      .on("mouseout", function (d) {
        graph.selectAll(".line").style("opacity", lineOpacity);
        graph.selectAll(".circle").style("opacity", circleOpacity);
        graph
          .select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data((d) => d.values)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (d) {
        graph
          .select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.price}`)
          .attr("x", (d) => xScale(d.date) + 5)
          .attr("y", (d) => yScale(d.price) - 10);
      })
      .on("mouseout", function (d) {
        graph
          .select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function (d) {
        graph
          .select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        graph
          .select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    const xAxis = graph.axisBottom(xScale).ticks(12);
    const yAxis = graph.axisLeft(yScale).ticks(6);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000");
  };
  const getClassName = (inval)=>{
    const classNameSetter = new Map()
    classNameSetter.set("1","colorVar")
    classNameSetter.set("1","colorVar")
    classNameSetter.set("1","colorVar")
    classNameSetter.set("1","colorVar")

    const classNameGetter = classNameSetter.get(inval)
    return classNameGetter
  }
  // return <div ref={graphRef}></div>;
  return (
    <div className={getClassName("1")}>
      Hello world
    </div>
  )
};
export default DoubleDthree;
