import React, { ReactNode, createContext, useReducer } from 'react';

import { IAction } from '../types/types';

interface IState {
  isFiltersCollaped: boolean;
}
const initialState: IState = {
  isFiltersCollaped: false
};

const ACTION_TYPES = {
  SET_IS_FILTERS_COLLAPSED: 'SET_IS_FILTERS_COLLAPSED'
};

const applicationReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_FILTERS_COLLAPSED:
      return {
        ...state,
        isFiltersCollaped: action.payload
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const SetFilterCollapsed =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  (params: { isFiltersCollaped: boolean }) => {
    if (dispatch)
      dispatch({
        type: ACTION_TYPES.SET_IS_FILTERS_COLLAPSED,
        payload: params.isFiltersCollaped
      });
  };

const Context = () => {
  const ApplicationContext = createContext<{
    state: IState;
    dispatch: React.Dispatch<IAction>;
  }>(null!);
  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(applicationReducer, initialState);

    return (
      <ApplicationContext.Provider value={{ state, dispatch }}>
        {children}
      </ApplicationContext.Provider>
    );
  };

  return { ApplicationContext, Provider };
};

export const { ApplicationContext, Provider } = Context();
