import axios from 'axios';
import { useQuery } from 'react-query';

import { AUTOCOMPLETE_ROUTES, API_BASE_URL } from '../constants/consts';

type autocompleteProps = { route: AUTOCOMPLETE_ROUTES; inputValue: string };

export const useAutocomplete = ({ route, inputValue }: autocompleteProps) => {
  const autocomplete = async () => {
    if (!inputValue) return [];

    try {
      const response = await axios.get(
        `${API_BASE_URL}/autocomplete/${route}?q=${inputValue}`
      );

      return response.data.map((item: { id: string; value: string }) => ({
        key: item.id,
        value: item.value
      }));
    } catch (error) {
      throw new Error('Network response error');
    }
  };

  const { data, isFetching } = useQuery(['routes', inputValue], autocomplete, {
    enabled: inputValue.length > 1
  });

  return { data, isFetching };
};
