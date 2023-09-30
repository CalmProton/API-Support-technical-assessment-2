import axios from "axios";

const API_KEY = "";
const API_SECRET = "";

const client = "lt-support";
const url = `https://${client}.revelup.com/`;
const establishment = "101";

retrieveMenu();

async function retrieveMenu() {
  try {
    const response = await axios.get(
      `${url}weborders/menu/?establishment=${establishment}&mode=6&name=Online`
    );

    let products: any[] = [];

    const categories = response.data.data.categories;

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
