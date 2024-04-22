const config: { [key: string]: any } = {
  taobao: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    image: ['PicGallery--mainPic--'],
    quantity: ['countValueForPC'],
    link: '',
    sku: ['.skuItem.current .skuValueName'],
  },
  "1688": {
    name: 'ItemHeader--mainTitle--',
    price: 'SecurityPrice--priceText--',
    iamge: 'PicGallery--mainPic--',
  }
}

const getDataOnPage = (config_name: string) => {
  if (document) {
    const data = config[config_name]


    const name = data.name.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)?.textContent
    }).filter((item: any) => item !== undefined)

    const price = data.price.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)?.textContent
    }).filter((item: any) => item !== undefined)


    const image = data.image.map((className: string) => {
      // @ts-ignore
      return document.querySelector(`[class*="${className}"]`)?.src
    }).filter((item: any) => item !== undefined)

    const quantity = data.quantity.map((className: string) => {
      // @ts-ignore
      return document.querySelector(`[class*="${className}"]`)?.value
    }).filter((item: any) => item !== undefined)

    const sku = data.sku.map((className: string) => {
      const skuList = Array.from(document.querySelectorAll(className))
      return skuList?.map((item: any) => item.textContent)
    }).filter((item: any) => item !== undefined)

    return {
      name,
      price,
      image,
      qty: quantity,
      sku,
      link: document.location.href
    }
  }

}

export default getDataOnPage
