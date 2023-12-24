import React, { ReactNode, createContext, useReducer } from 'react';

import { AUTHORS, Dataset, PAPERS, VENUES } from '../constants/dataset.types';
import { IAction } from '../constants/types';
import {
  Tab,
  VISUALIZATION_TITLE,
  visualization
} from '../constants/visualizations/visualizations.types';
import DistributionOverTime from '../features/search/analytics/visualizations/distributionOverTime/DistributionOverTime';
import TopResearch from '../features/search/analytics/visualizations/topResearch/TopResearch';

const VISUALIZATION_TAB: Record<visualization, Tab> = {
  [visualization.DISTRIBUTIONS_OVERTIME]: {
    key: visualization.DISTRIBUTIONS_OVERTIME,
    label: VISUALIZATION_TITLE.distribution_overtime,
    forceRender: true,
    destroyInactiveTabPane: true,
    children: <DistributionOverTime />
  },
  [visualization.TOP_RESEARCH]: {
    key: visualization.TOP_RESEARCH,
    label: VISUALIZATION_TITLE.top_research,
    forceRender: true,
    destroyInactiveTabPane: true,
    children: <TopResearch />
  }
};

const VISUALIZATION_BY_DATASET: Record<Dataset, Tab[]> = {
  [PAPERS]: [
    VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME],
    VISUALIZATION_TAB[visualization.TOP_RESEARCH]
  ],
  [VENUES]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]],
  [AUTHORS]: [VISUALIZATION_TAB[visualization.DISTRIBUTIONS_OVERTIME]]
};

interface IState {
  isFiltersCollaped: boolean;
  dataSet: Dataset;
  currentVisualizations: Tab[];
}
const initialState: IState = {
  isFiltersCollaped: false,
  dataSet: PAPERS,
  currentVisualizations: VISUALIZATION_BY_DATASET[PAPERS]
};

const ACTION_TYPES = {
  SET_IS_FILTERS_COLLAPSED: 'SET_IS_FILTERS_COLLAPSED',
  SET_SELECTED_DATA_SET: 'SET_SELECTED_DATA_SET'
};

const applicationReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_FILTERS_COLLAPSED:
      return {
        ...state,
        isFiltersCollaped: action.payload
      };
    case ACTION_TYPES.SET_SELECTED_DATA_SET:
      return {
        ...state,
        dataSet: action.payload,
        currentVisualizations:
          VISUALIZATION_BY_DATASET[action.payload as Dataset]
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

export const setSelectedDataSet =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  (params: { dataSet: Dataset }) => {
    if (dispatch)
      dispatch({
        type: ACTION_TYPES.SET_SELECTED_DATA_SET,
        payload: params.dataSet
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
