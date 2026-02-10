// Shopify Storefront API client
// Uses environment variables — never hardcode credentials

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-10";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }

  return json.data as T;
}
