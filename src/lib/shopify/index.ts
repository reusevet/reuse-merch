// Shopify Storefront API — high-level functions
// Re-exports types for convenience

export type {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyImage,
  ShopifyPrice,
} from "./types";

import { shopifyFetch } from "./client";
import type { ShopifyProduct, ShopifyCart } from "./types";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  CREATE_CART,
  ADD_LINES_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_CART_LINES,
  GET_CART,
} from "./queries";

// ---------- PRODUCTS ----------

export async function getAllProducts(first = 50): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(GET_ALL_PRODUCTS, { first });
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  return data.product;
}

// ---------- CART ----------

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(CREATE_CART, { lines: lines.length ? lines : undefined });
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return data.cartCreate.cart;
}

export async function addLinesToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(ADD_LINES_TO_CART, { cartId, lines });
  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(UPDATE_CART_LINES, { cartId, lines });
  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { message: string }[] };
  }>(REMOVE_CART_LINES, { cartId, lineIds });
  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART, {
    cartId,
  });
  return data.cart;
}
