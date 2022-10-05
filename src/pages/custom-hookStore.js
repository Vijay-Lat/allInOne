import React, { useState, useEffect } from "react";
let hookState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setstate = useState(hookState)[1];

  const dispatchFn = (actionName, val) => {
    const newState = actions[actionName](hookState, val);
    hookState = { ...hookState, ...newState };
    for (const listener of listeners) {
      listener(hookState);
    }
  };

  useEffect(() => {
    listeners.push(setstate);

    return () => {
      // clean up function to remove the previous setState
      listeners = listeners?.filter((li) => li !== setstate);
    };
  }, [setstate]);
  return [hookState, dispatchFn];
};

export const openStore = (userActions, initialState) => {
  if (initialState) {
    hookState = { ...hookState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
