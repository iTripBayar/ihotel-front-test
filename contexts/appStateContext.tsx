'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the type for your state
interface AppState {
  language: string;
  showFilter: string;
  showMap: boolean;
  searchValue: string;
  logInState: string;
  hotel: string;
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
  | { type: 'TOGGLE_MAP'; payload: boolean }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_LOGINSTATE'; payload: string }
  | { type: 'SET_HOTEL'; payload: string };

// Define the reducer function for handling state changes
const appStateReducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'TOGGLE_FILTER':
      return { ...state, showFilter: action.payload };
    case 'TOGGLE_MAP':
      return { ...state, showMap: !state.showMap };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_LOGINSTATE':
      return { ...state, logInState: action.payload };
    case 'SET_HOTEL':
      return { ...state, hotel: action.payload };
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
    showMap: false,
    searchValue: '',
    logInState: '',
    hotel: '',
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
