import { initStore } from "./custom-hookStore";

import React from 'react'

const prductsStore = () => {
    const users = ["name1","name2"]
    const actions = {
        showCard: currState => {return {show : !currState.show}},
        addArray : (currState,val) => {return {users:[...currState.users,val]}}

    }
initStore(actions,{show:false,users})
}

export default prductsStore