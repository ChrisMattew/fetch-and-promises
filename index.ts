import { apiClient } from './api-client';

let loading = false;

// Resource: carts?limit=3
const fetchCarts = () => {
  return apiClient.get('carts?limit=3');
};
// Resource: products/{id}
const fetchProduct = (id: string) => {
  if (Math.random() > 0) throw new Error('Network error');
  return apiClient.get(`products/${id}`);
};

// Resource: users/{id}
const fetchUser = (id: string) => {
  return apiClient.get(`users/${id}`);
};

const main = async () => {
  loading = true;
  // 1. Recuperare i carrelli (carts)
  const [cart] = await fetchCarts();
  // 2. Ricostruire il carrello recuperando 'userId' e 'productId' per ogni carrello
  const user = await fetchUser(cart.userId);

  const products = await Promise.all(
    cart.products.map(({ productId }: any) => {
      return fetchProduct(productId);
    })
  ).catch((e) => console.error(e));
  console.log(products);

  // 3. Gestire correttamente il loading DONE

  // 4. Gestire correttamente gli errori visualizzando un alert DONE

  // 5. Creare un array con top 3 prodotti più comprati

  loading = false;
};

main();

// fetch('https://fakestoreapi.com/products')
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((products) => console.log(products));

// const getSomething = async (url) => {
//   const products = await apiClient.get(`${url}`);
//   console.log(products);
// };
