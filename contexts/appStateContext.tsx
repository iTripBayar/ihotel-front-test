'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the type for your state
interface AppState {
  language: string;
  showFilter: string;
  filterValue: {
    category: string[];
    price: { min: number; max: number };
    additional: string[];
  };
  showMap: boolean;
  logInState: string;
  hotel: string;
  searchValue: string;
  onlineToggle: boolean;
}

// Define the type for the context value
interface AppStateContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// Define your action types
type Action =
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'TOGGLE_FILTER'; payload: string }
  | {
      type: 'SET_FILTERVALUE';
      payload: {
        category: string[];
        price: { min: number; max: number };
        additional: string[];
      };
    }
  | { type: 'TOGGLE_MAP'; payload: boolean }
  | { type: 'SET_LOGINSTATE'; payload: string }
  | { type: 'SET_HOTEL'; payload: string }
  | { type: 'SET_SEARCHVALUE'; payload: string }
  | { type: 'TOGGLE_ONLINETOGGLE'; payload: boolean };

// Define the reducer function for handling state changes
const appStateReducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_FILTER':
      return { ...state, showFilter: action.payload };
    case 'SET_FILTERVALUE':
      return {
        ...state,
        filterValue: action.payload,
      };
    case 'TOGGLE_MAP':
      return { ...state, showMap: !state.showMap };
    case 'SET_LOGINSTATE':
      return { ...state, logInState: action.payload };
    case 'SET_HOTEL':
      return { ...state, hotel: action.payload };
    case 'SET_SEARCHVALUE':
      return { ...state, searchValue: action.payload };
    case 'TOGGLE_ONLINETOGGLE':
      return { ...state, onlineToggle: action.payload };
    default:
      return state;
  }
};

// Create a context with a default value
const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined,
);

// Create a context provider component
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appStateReducer, {
    language: 'mn',
    showFilter: '',
    filterValue: { category: [], price: { min: 0, max: 0 }, additional: [] },
    showMap: false,
    logInState: '',
    hotel: '',
    searchValue: '',
    onlineToggle: false,
  });

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
