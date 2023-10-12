import { createContext, useContext, useReducer } from 'react';

export type Lang = 'mn' | 'en';

export type AppCtxState = {
  lang: Lang;
};

type Action =
  | { type: 'CHANGE_APP_STATE'; payload: Partial<AppCtxState> }
  | { type: 'TOGGLE_SHOW_MAP' }
  | { type: 'SET_LOADING'; payload: boolean };

type LoadingState = {
  loading: boolean;
};

export type AppCtxProps = {
  appState: AppCtxState;
  loadingState: LoadingState;
  dispatch: React.Dispatch<Action>;
};

const defaultValue: AppCtxProps = {
  appState: {
    lang: 'mn',
  },
  loadingState: {
    loading: false,
  },
  dispatch: () => {
    /**/
  },
};

const appReducer = (state: AppCtxState, action: Action): AppCtxState => {
  switch (action.type) {
    case 'CHANGE_APP_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const loadingReducer = (state: LoadingState, action: Action): LoadingState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AppCtx = createContext<AppCtxProps>(defaultValue);
export const useAppCtx = (): AppCtxProps => useContext(AppCtx);

export const AppCtxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [appState, dispatchAppState] = useReducer(
    appReducer,
    defaultValue.appState,
  );
  const [loadingState, dispatchLoading] = useReducer(
    loadingReducer,
    defaultValue.loadingState,
  );

  const dispatch = (action: Action) => {
    dispatchAppState(action);
    dispatchLoading(action);
  };
  return (
    <AppCtx.Provider
      value={{
        appState,
        loadingState,
        dispatch,
      }}
    >
      {children}
      {loadingState.loading && <div></div>}
    </AppCtx.Provider>
  );
};
