import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  weight: {
    loading: true,
    data: undefined
  },
  height: {
    loading: true,
    data: undefined
  },
  age: {
    loading: true,
    data: undefined
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer((state, action) => {
    const { type, payload: { metric, data } } = action;
    const newState = { ...state };

    switch(type) {
      case 'REQUEST_VALUE': {
        newState[metric].loading = true;
        break;
      }
      case 'REQUEST_VALUE_SUCCESS': {
        newState[metric] = {
          loading: false,
          data
        };
        break;
      }
      case 'REQUEST_VALUE_FAILURE': {
        newState[metric] =  {
          loading: false,
          data: -1
        };
        break;
      }
      default: {
        break;
      }
    }

    return newState;
  }, initialState);
  
  return (
    <StoreContext.Provider value={{store, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
};