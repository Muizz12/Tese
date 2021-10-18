import React,{createContext,useContext,useReducer} from "react";

//Prepares the Datalayer

export const StateContext=createContext();

//wrap or app and provide the Data layer
export const StateProvider=({reducer,intialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,intialState)}>
        {children}
    </StateContext.Provider>
);
// pull information from the data layer
export const useStateValue=()=>useContext(StateContext)