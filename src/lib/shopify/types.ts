// Shopify Storefront API types (minimal, matching our UI needs)

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      images: {
        edges: { node: ShopifyImage }[];
      };
    };
    selectedOptions: { name: string; value: string }[];
    image: ShopifyImage | null;
    price: ShopifyPrice;
  };
  cost: {
    totalAmount: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
  };
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
}
