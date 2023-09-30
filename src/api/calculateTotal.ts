import axios from "axios";
import { retrieveMenu } from "./retrieveMenu";
import { API_KEY, API_SECRET, client, establishment } from "./config";

const url = `https://${client}.revelup.com/`;

calculateTotal();

async function calculateTotal() {
  let orderProducts: {
    price: any;
    product: any;
    barcode: any;
    quantity: number;
  }[] = [];

  const sortedProducts = await retrieveMenu();

  if (sortedProducts) {
    const topProducts = sortedProducts.slice(0, 3);

    topProducts.forEach((product) => {
      orderProducts.push({
        price: product.price,
        product: product.id,
        barcode: product.barcode,
        quantity: 1,
      });
    });
  } else {
    console.log(`Unable to retrieve products`);
  }

  const payload = {
    orderInfo: { dining_option: 1, asap: true },
    customMenuInfo: { mode: 6, name: "Online" },
    establishmentId: establishment,
    items: orderProducts,
  };

  const headers = {
    "Content-Type": "application/json",
    "API-AUTHENTICATION": `${API_KEY}:${API_SECRET}`,
  };

  try {
    const response = await axios.post(
      `${url}specialresources/cart/calculate/`,
      payload,
      { headers: headers }
    );

    const calculatedData = response.data.data;

    console.log(
      `\nSubtotal: $${calculatedData.subtotal}\nTax: $${calculatedData.tax}\nFinal Total: $${calculatedData.final_total}\n`
    );
  } catch (error) {
    console.log(error);
  }
}
