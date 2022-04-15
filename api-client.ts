const BASE_URL = 'https://fakestoreapi.com';

export const apiClient = {
  get: async (resource: string) => {
    if (Math.random() > 0.99) throw new Error('Network error !!');
    const response = await fetch(`${BASE_URL}/${resource}`);
    const result = await response.json();
    return result;
  },
  getThen: (resource: string) => {
    fetch(`${BASE_URL}/${resource}`).then((response) => response.json());
  },
};
