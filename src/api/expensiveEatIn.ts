import axios from "axios";

const API_KEY = "";
const API_SECRET = "";

const client = "lt-support";
const url = `https://${client}.revelup.com/`;
const establishment = "101";

getExpensiveEatInItem();

interface OrderItem {
  tax_amount: number;
  modifier_amount: number;
  product_name_override: string;
  initial_price: number;
  quantity: number;
}

async function getExpensiveEatInItem() {
  const orderId = await getOrderId();

  if (orderId) {
    const items = (await getOrderItems(orderId)) as OrderItem[];
    let currentLargestItem: OrderItem = items[0];

    if (items) {
      items.forEach((item) => {
        const nextPrice =
          item.initial_price + item.tax_amount + item.modifier_amount;

        const currentLargestItemPrice =
          currentLargestItem.initial_price +
          currentLargestItem.tax_amount +
          currentLargestItem.modifier_amount;

        if (nextPrice > currentLargestItemPrice) {
          currentLargestItem = item;
        }
      });

      const mostExpensiveItem = currentLargestItem;

      console.log(`\nOrder #${orderId}\n`);
      console.log(
        `Product - \nName: ${mostExpensiveItem.product_name_override}\nPrice: ${
          mostExpensiveItem.initial_price
        }\nModifier Price: ${mostExpensiveItem.modifier_amount}\nItem Tax: ${
          mostExpensiveItem.tax_amount / mostExpensiveItem.quantity
        }\nQuantity: ${mostExpensiveItem.quantity}\n`
      );
    }
  } else {
    console.log(`No order was found`);
  }
}

async function getOrderId(): Promise<number | null> {
  const endpointOrder = `resources/OrderAllInOne/?has_items=true&fields=id&establishment=${establishment}&dining_option=1&order_by=-created_date&limit=1&api_key=${API_KEY}&api_secret=${API_SECRET}`;

  try {
    const response = await axios.get(`${url}${endpointOrder}`);

    const orderObject = response.data;
    if (orderObject.object) {
      const orderId = orderObject.objects[0].id;
      return orderId;
    } else {
      return null;
    }
  } catch (error) {
    console.log("An error occured while processing the request");
    return null;
  }
}

async function getOrderItems(orderId: number): Promise<any> {
  const endpointItem = `resources/OrderItem/?order=${orderId}&fields=initial_price,tax_amount,product_name_override,modifier_amount,quantity&limit=100&api_key=${API_KEY}&api_secret=${API_SECRET}`;

  try {
    const response = await axios.get(`${url}${endpointItem}`);

    const orderObject = response.data;
    const orderItems = orderObject.objects;

    return orderItems;
  } catch (error) {
    console.log("An error occured while processing the request");
    return null;
  }
}
