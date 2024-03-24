import axios from 'axios';

import { AUTOCOMPLETE_ROUTES, API_BASE_URL } from '../constants/consts';

type autocompleteProps = { route: AUTOCOMPLETE_ROUTES; inputValue: string };

const autocomplete = async ({ route, inputValue }: autocompleteProps) => {
  if (!inputValue) return [];

  try {
    const response = await axios.get(
      `${API_BASE_URL}/autocomplete/${route}?q=${inputValue}`
    );

    return response.data;
  } catch (error) {
    throw new Error('Network response error');
  }
};

export { autocomplete };
