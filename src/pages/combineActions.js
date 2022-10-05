import { openStore } from "./custom-hookStore";

import React from "react";

const combineActions = () => {
  const users = ["VijayMK", "Sonu"];
  const actions = {
    showCard: (currState) => {
      return { show: !currState.show };
    },
    addUsers: (currState, val) => {
      return { users: [...currState.users, val] };
    },
  };
  openStore(actions, { show: false, users });
};

export default combineActions;
