import { createContext, ReactElement, useContext, useState } from 'react';

import { ACCESS_TYPE_OPEN, metrics } from '../constants/consts';
import { Filter } from '../constants/types';

const FilterContext = createContext<
  | {
      filter: Filter;
      setFilter: (filter: Filter) => void;
      oldFilter: Filter;
      setOldFilter: (oldFilter: Filter) => void;
    }
  | undefined
>(undefined);

export function useFilter() {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  return context;
}

export function FilterProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const [filter, setFilter] = useState<Filter>({
    yearStart: '1960',
    yearEnd: '',
    citationsMin: '',
    citationsMax: '',
    authorIds: [],
    venueIds: [],
    accessType: ACCESS_TYPE_OPEN,
    typesOfPaper: [],
    fieldsOfStudy: [],
    publishers: [],
    metric: metrics[0].value
  });

  const [oldFilter, setOldFilter] = useState<Filter>(filter);

  return (
    <FilterContext.Provider
      value={{
        filter: filter,
        setFilter: setFilter,
        oldFilter: oldFilter,
        setOldFilter: setOldFilter
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}
