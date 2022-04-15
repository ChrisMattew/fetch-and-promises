import { apiClient } from './api-client';

// Resource: carts?limit=3
const fetchCarts = () => {
  return apiClient.get('carts?limit=3');
};
// Resource: products/{id}
const fetchProduct = (id: string) => {
  return apiClient.get(`products/${id}`);
};

// Resource: users/{id}
const fetchUser = (id: string) => {
  return apiClient.get(`users/${id}`);
};

const main = async () => {
  let loading = true;
  // 1. Recuperare i carrelli (carts)
  try {
    const [cart] = await fetchCarts();
    // 2. Ricostruire il carrello recuperando 'userId' e 'productId' per ogni carrello
    const user = await fetchUser(cart.userId);

    // const userProducts = []

    // for (const {productId} of cart.products) {
    //   userProducts.push(await fetchProduct(productId))
    // }

    const userProducts = await Promise.all(
      cart.products.map(({ productId }: any) => {
        return fetchProduct(productId);
      })
    );

    const { userId, products, ...rest } = cart;

    const userCart = {
      ...rest,
      user,
      products: products.map(({ productId, ...rest }: any, index: number) => ({
        product: userProducts[index],
        ...rest,
      })),
    };
    console.log(userCart);
    // 3. Gestire correttamente il loading DONE

    // 4. Gestire correttamente gli errori visualizzando un alert DONE

    // 5. Creare un array con top 3 prodotti più comprati
  } catch (e) {
    console.log(e.message);
  }
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
