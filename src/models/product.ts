export type Product = {
  id: string,
  name: string,
  price: string,
  salePrice: string,
  image: string,
  video: string,
  qty: string | number,
  variants: {
    categoriesText: string[],
    allItems: string[],
    activeItems: string[],
  },
  link: string
  service: string[]
  shopLink: string,
  shopName: string,
  shopId: string,
}
