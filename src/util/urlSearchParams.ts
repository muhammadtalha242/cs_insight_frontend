export const getUrlSearchParams = (filters: any) => {
  const queryParams = new URLSearchParams();

  Object.keys(filters).forEach(key => {
    const value = filters[key];

    if (Array.isArray(value)) {
      value.forEach(item => queryParams.append(key, item));
    } else {
      queryParams.append(key, value);
    }
  });

  return queryParams;
};
