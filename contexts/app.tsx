import { createContext, useContext, useReducer } from 'react';

export type AppCtxState = {
  phone: string;
  dollarRate: string;
  logOrSign: string;
  menu: string;
  map: string;
  filter: string;
  selectedRoom: string;
  selectedAmount: string[];
  calendar: string;
  biggerImage: boolean;
};

type Action =
  | { type: 'CHANGE_APP_STATE'; payload: Partial<AppCtxState> }


export type AppCtxProps = {
  appState: AppCtxState;
  dispatch: React.Dispatch<Action>;
};

const defaultValue: AppCtxProps = {
  appState: {
    phone: '77279090',
    dollarRate: '',
    logOrSign: '',
    menu: '',
    map: '',
    filter: '',
    selectedRoom: '',
    selectedAmount: [],
    calendar: '',
    biggerImage: false,
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

export const AppCtx = createContext<AppCtxProps>(defaultValue);
export const useAppCtx = (): AppCtxProps => useContext(AppCtx);

export const AppCtxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [appState, dispatchAppState] = useReducer(
    appReducer,
    defaultValue.appState,
  );

  const dispatch = (action: Action) => {
    dispatchAppState(action);
  };
  return (
    <AppCtx.Provider
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
