import React, { ReactNode, createContext, useReducer } from 'react';

import { ACCESS_TYPE_OPEN, metrics } from '../constants/consts';
import { DataSets, Filter, IAction } from '../types/types';

export const initialState: IState = {
  dataSet: 'papers',
  query: '5G',
  filters: {
    yearStart: '1960',
    yearEnd: '',
    citationsMin: '',
    citationsMax: '',
    authors: [],
    venues: [],
    accessType: ACCESS_TYPE_OPEN,
    typesOfPaper: [],
    fieldsOfStudy: [],
    publishers: [],
    metric: metrics[0].value
  }
};

export interface IState {
  dataSet: DataSets;
  query: string;
  filters: Filter;
}

const ACTION_TYPES = {
  SET_QUERY: 'SET_QUERY',
  RESET_QUERY: 'RESET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS'
};

const queryReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_FILTERS: {
      return {
        ...state,
        filters: { ...action.payload }
      };
    }

    case ACTION_TYPES.SET_QUERY: {
      return {
        ...state,
        ...action.payload
      };
    }

    case ACTION_TYPES.RESET_QUERY: {
      return {
        ...state,
        dataSet: initialState.dataSet,
        query: initialState.query
      };
    }

    case ACTION_TYPES.RESET_FILTERS: {
      return {
        ...state,
        filters: initialState.filters
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const setQuery =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  (params: { dataSet: DataSets; query: string }) => {
    if (dispatch)
      dispatch({ type: ACTION_TYPES.SET_QUERY, payload: { ...params } });
  };
export const resetQueryState =
  (dispatch: React.Dispatch<IAction> | undefined) => () => {
    if (dispatch) dispatch({ type: ACTION_TYPES.RESET_QUERY });
  };

export const setFilters =
  (dispatch: React.Dispatch<IAction> | undefined) => (filters: Filter) => {
    if (dispatch)
      dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: { ...filters } });
  };

export const resetFilters =
  (dispatch: React.Dispatch<IAction> | undefined) => () => {
    if (dispatch) dispatch({ type: ACTION_TYPES.RESET_FILTERS });
  };

const Context = () => {
  const QueryContext = createContext<{
    state: IState;
    dispatch?: React.Dispatch<IAction>;
  }>(null!);
  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(queryReducer, initialState);

    return (
      <QueryContext.Provider value={{ state, dispatch }}>
        {children}
      </QueryContext.Provider>
    );
  };

  return { QueryContext, Provider };
};

export const { QueryContext, Provider } = Context();
