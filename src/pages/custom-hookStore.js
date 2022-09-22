import React, { useState } from "react";
let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setstate = useState(globalState)[1];

  useEffect(() => {
    listeners.push(setstate);

    return () => {
        // clean up function to remove the previous setState
      listeners = listeners?.filter((li) => li !== setstate);
    };
  }, [setstate]);
};

export default useStore;
