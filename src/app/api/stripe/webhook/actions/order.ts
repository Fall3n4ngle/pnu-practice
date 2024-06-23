import { client } from "../../../../../../sanity/lib/client";
import type { Order } from "../types/Order";

export const createOrder = async (order: Order) => {
  try {
    const createdOrder = await client.create(
      { ...order, _type: "order" },
      {
        token: process.env.NEXT_PUBLIC_SANITY_READ_WRITE_TOKEN,
        autoGenerateArrayKeys: true,
      },
    );

    return createdOrder;
  } catch (error: any) {
    throw new Error(`error creating an order: ${error.message}`);
  }
};
