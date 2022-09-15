import React, { useRef, useState } from "react";
import * as d3 from "d3";
import _ from "lodash";

const GraphLines = () => {
  const lineGraphRef = useRef();
  const [data, setData] = useState([]);
  const jsonValues = d3
    .json(
      "https://raw.githubusercontent.com/sxywu/filmflowers/master/movies.json"
    )
    .then((data) => _.values(data));
  console.log(jsonValues, "jsonValues");
  const curvePath = "M 0 ,0 C -10,-10 -10,-40 0,-50 C 10,-40 10,-10 0,0";
  const circleRadius = [
    { id: 1, r: 5 },
    { id: 2, r: 15 },
    { id: 3, r: 25 },
    { id: 4, r: 35 },
    { id: 5, r: 45 },
  ];
  d3.select(lineGraphRef.current)
    .attr("width", 800)
    .attr("height", 400)
    .selectAll("circle")
    .data(circleRadius, (d) => d.id)
    .enter()
    .append("circle")
    .attr("fill", "green")
    .attr('stroke',"white")
    .attr("stroke-width","2")
    .attr("margin","5")
    .attr("r",d=>d.r)
    .attr("transform", "translate(50,50)");
  return (
    <div>
      <svg ref={lineGraphRef}>
      </svg>
    </div>
  );
};

export default GraphLines;
