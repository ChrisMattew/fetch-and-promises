import { apiClient } from './api-client';

let loading = false;

const getSomething = async (url) => {
  const products = await apiClient.get(`${url}`);
  console.log(products);
};

// Resource: carts?limit=3
const fetchCarts = () => {
  return apiClient.get('carts?limit=3');
};
// Resource: products/{id}
const fetchProduct = (id: string) => {
  if (Math.random() > 0.8) throw new Error('Network error');
  return apiClient.get(`products/${id}`);
};

// Resource: users/{id}
const fetchUser = (id: string) => {
  return apiClient.get(`users/${id}`);
};

const main = async () => {
  // 1. Recuperare i carrelli (carts)
  const [cart] = await fetchCarts();
  // 2. Ricostruire il carrello recuperando 'userId' e 'productId' per ogni carrello
  const user = await fetchUser(cart.id);
  const product = await fetchProduct(
    cart.products.map(({ productId }) => productId)
  );
  console.log(product);

  // const newCart = Promise.all(carts.map((cart)=>));
  // 3. Gestire correttamente il loading

  // 4. Gestire correttamente gli errori visualizzando un alert

  // 5. Creare un array con top 3 prodotti più comprati
};

main();
// fetch('https://fakestoreapi.com/products')
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((products) => console.log(products));
