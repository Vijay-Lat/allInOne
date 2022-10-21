import React, { useState, useReducer } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import _ from "lodash";
import * as R from "ramda";
import { useStore } from "./custom-hookStore";

const LodashLearn = () => {
  const [userName, setUserName] = useState("");
  let initialState = {
    name: "",
  };
  const [stateVal, dispatchFn] = useStore();
  const reducerFn = (state, action) => {
    console.log(state, action);
  };
  const [state, dispatch] = useReducer(reducerFn, initialState);
  const getPlayerStats = async () => {
    console.log("stats");
    const data = await axios.get(
      `https://api.chess.com/pub/player/${userName}/stats`
    );
    console.log(data, "data");
  };
  let mapArray = [
    {
      color: "red",
      value: "#f00",
      num: 1,
    },
    {
      color: "green",
      value: "#0f0",
      num: 1,
    },
    {
      color: "blue",
      value: "#00f",
      num: 1,
    },
    {
      color: "cyan",
      value: "#0ff",
      num: 1,
    },
    {
      color: "magenta",
      value: "#f0f",
      num: 1,
    },
    {
      color: "yellow",
      value: "#ff0",
      num: 1,
    },
    {
      color: "black",
      value: "#000",
      num: 1,
    },
  ];

  let addNum = [1, 2, 3, 4, 5, 6];

  const addedNum = _(addNum).reduce(_.add); // to add numbers

  const redRightUse = _(addNum).reduceRight(_.add);

  const divededNum = _(addNum).reduce(_.divide); // divides the previously divided with the next value

  const divideRedUse = _(addNum).reduceRight(_.divide); // gives a different output
  console.log(addedNum, "addedNum");

  console.log(redRightUse, "redRightUse");

  console.log(divededNum, "divededNum");

  console.log(divideRedUse, "divideRedUse");

  const mappedVal = _.mapKeys(mapArray, (color) => <li>{color?.color}</li>);
  // this works
  const mappedVal_2 = _.map(mapArray, (color) => (
    <li key={color?.value}>{color?.color}</li>
  )).reverse();
  // this doesn't work
  // const reverseMap = _(mapArray).reverse().map((color)=><li>{color?.color}</li>)
  console.log(mappedVal, "mappedVal");
  // console.log(reverseMap,"reverseMap")
  const colorPath = ["color"];
  const colorLens = R.lens(R.path(colorPath), R.assocPath(colorPath));
  const grpval = _.groupBy(mapArray, R.view(colorLens));
  console.log(grpval, "colorlEs");

  const indianNames = [
    "neela",
    "lakshmi",
    "santhi",
    "LATHA",
    "manjula",
    null,
    undefined,
    "manjula",
  ];
  const isValid = (val) => !_.isUndefined(val) && !_.isNull(val);
  const chainedReaction = _.chain(indianNames)
    .filter(isValid)
    .map((s) => s.replace(/[t]/i, "T"))
    .uniq()
    .map(_.startCase)
    .sort()
    .value();
  console.log(chainedReaction, "chainedReaction");

  // recursion

  const recursionAdd = (n) => {
    if (_.isNull(n) || _.isUndefined(n) || n <= 0) {
      console.log("Finished");
      return false;
    }
    console.log("#" + n, "add");
    recursionAdd(n - 1);
  };
  recursionAdd(100);

  const explode = (str) => str.split(/\s+/);
  const count = (arr) => arr?.length;

  const countWords = R.compose(count, explode);

  // const countWords = R.compose(explode,count) // this won't work second function should be used first like mentioned above
  let str =
    "Life is a beautiful thing never betray anybody and don't break someone's trust";
  const ans = countWords(str);
  console.log(ans, "ans");

  let methodExecution = {
    checkFun: () => {
      console.log("Checked", "method");
    },
  };

  // const drawHash = (height) => {
  //   if (_.isNull(height) || _.isUndefined(height) || height <= 0) {
  //     console.log("Finished");
  //     return false;
  //   }
  //   if (height !== undefined && height !== null && height !== 0) {
  //     for (let i = 0; i <= height; i++) {
  //       document.write("#<br/>", height);
  //     }
  //   }
  //   drawHash(height - 1);
  // };
  // drawHash(10);
  // methodExecution["checkFun"]()
  methodExecution.checkFun();


  const customStoreUserHandler = () => {
    dispatchFn("addUsers",userName);
  };

  const customStoreToggleHandler = ()=>{
    dispatchFn("showCard")
  }

  return (
    <div>
      {stateVal?.show && <h1>Visible</h1>}
      <Button onClick={customStoreToggleHandler}>Show Custom Store</Button>
      <Button onClick={customStoreUserHandler}>Add users</Button>
      <TextField
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
};

export default LodashLearn;
