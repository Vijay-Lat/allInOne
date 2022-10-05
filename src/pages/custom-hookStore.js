import React, { useState,useEffect } from "react";
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setstate = useState(globalState)[1];

  const dispatchFn = (actionName,val) => {
    console.log(actionName,"actionName")
    console.log(actions,"actions")
    console.log(globalState,"globalState")
    const newState = actions[actionName](globalState,val);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners){
      listener(globalState)
      console.log(globalState,"globalState")
    }
  };

  console.log(globalState,"globalState")

  useEffect(() => {
    listeners.push(setstate);

    return () => {
      // clean up function to remove the previous setState
      listeners = listeners?.filter((li) => li !== setstate);
    };
  }, [setstate]);
  return [globalState, dispatchFn];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
