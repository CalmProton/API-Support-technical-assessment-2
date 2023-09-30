import axios from "axios";

const API_KEY = "0113cbd5267847c49fab01658e8c81cb";
const API_SECRET =
  "cb4e9fcf0a154a5fbfb70eb42c2bc4d1549aed0a50da47b7b42c2379d0c158c7";

const client = "lt-support";
const url = `https://${client}.revelup.com/`;
const establishment = "101";

retrieveMenu();

async function retrieveMenu() {
  try {
    const menuObject = await axios.get(
      `${url}weborders/menu/?establishment=${establishment}&mode=6&name=Online`
    );

    let products: any[] = [];

    const categories = menuObject.data.data.categories;

    categories.forEach((category: { products: any }) => {
      const tempProducts = category.products;

      tempProducts.forEach((product: object) => {
        products.push(product);
      });
    });

    products.sort((a, b) => b.price - a.price);

    products.forEach((product) => {
      console.log(`${product.name} - $${product.price}`);
    });
  } catch (error) {
    console.log(error);
    return;
  }
}
