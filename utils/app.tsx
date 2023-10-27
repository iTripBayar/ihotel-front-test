// import { createContext, useContext, useReducer } from 'react';

// export type Lang = 'mn' | 'en';

// export type AppCtxState = {
//   lang: Lang;
//   filter: boolean;
//   price: {
//     name: string;
//     value: number[];
//   } | null;
//   searchValue: string;
//   showMap: boolean;
//   phone: string;
//   totalRooms: number;
// };

// type Action =
//   | { type: 'CHANGE_APP_STATE'; payload: Partial<AppCtxState> }
//   | { type: 'TOGGLE_SHOW_MAP' }
//   | { type: 'SET_LOADING'; payload: boolean };
// // | { type: 'SET_ORDER'; payload: rooms.RoomTypeItem }
// // | { type: 'SET_HISTORY'; payload: Order[] };

// type LoadingState = {
//   loading: boolean;
// };

// // type RoomState = {
// //   roomType: rooms.RoomTypeItem | null;
// //   histories: Order[];
// // };

// export type AppCtxProps = {
//   appState: AppCtxState;
//   loadingState: LoadingState;
//   // roomState: RoomState;
//   dispatch: React.Dispatch<Action>;
// };
// //  stayType: StayType;
// //   price: {
// //     name: string;
// //     value: number[];
// //   } | null;
// //   searchValue: string;
// //   showMap: boolean;
// //   phone: string;
// //   totalRooms: number;
// const defaultValue: AppCtxProps = {
//   appState: {
//     lang: 'mn',
//     filter: false,
//     price: null,
//     searchValue: '',
//     showMap: false,
//     phone: '',
//     totalRooms: 0,
//   },
//   loadingState: {
//     loading: false,
//   },
//   // roomState: {
//   //   roomType: null,
//   //   histories: [],
//   // },
//   dispatch: () => {
//     /**/
//   },
// };

// const appReducer = (state: AppCtxState, action: Action): AppCtxState => {
//   switch (action.type) {
//     case 'CHANGE_APP_STATE':
//       return { ...state, ...action.payload };
//     case 'TOGGLE_SHOW_MAP':
//       return { ...state, showMap: !state.showMap };
//     default:
//       return state;
//   }
// };

// const loadingReducer = (state: LoadingState, action: Action): LoadingState => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     default:
//       return state;
//   }
// };

// // const roomReducer = (state: RoomState, action: Action): RoomState => {
// //   switch (action.type) {
// //     case 'SET_ORDER':
// //       return { ...state, roomType: action.payload };

// //     case 'SET_HISTORY':
// //       return { ...state, histories: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// export const AppCtx = createContext<AppCtxProps>(defaultValue);
// export const useAppCtx = (): AppCtxProps => useContext(AppCtx);

// export const AppCtxProvider: React.FC<React.PropsWithChildren> = ({
//   children,
// }) => {
//   const [appState, dispatchAppState] = useReducer(
//     appReducer,
//     defaultValue.appState,
//   );
//   const [loadingState, dispatchLoading] = useReducer(
//     loadingReducer,
//     defaultValue.loadingState,
//   );
//   // const [roomState, dispatchRoom] = useReducer(
//   //   roomReducer,
//   //   defaultValue.roomState,
//   // );

//   const dispatch = (action: Action) => {
//     dispatchAppState(action);
//     dispatchLoading(action);
//     // dispatchRoom(action);
//   };
//   return (
//     <AppCtx.Provider
//       value={{
//         appState,
//         loadingState,
//         // roomState,
//         dispatch,
//       }}
//     >
//       {children}
//       {loadingState.loading && <div></div>}
//     </AppCtx.Provider>
//   );
// };
