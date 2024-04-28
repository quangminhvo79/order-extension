import flattenDeep from 'lodash/flattenDeep'
import compact from 'lodash/compact'

const config: { [key: string]: any } = {
  taobao: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    video: ['video.lib-video'],
    quantity: ['countValueForPC'],
    link: '',
    sku: ['.skuItem.current .skuValueName'],
    service: ['.skuServiceItemWrapper .skuServiceUniqItem.selectedService'],
    shopLink: 'ShopHeader--board--',
    shopName: 'ShopHeader--title--',
    market: 'taobao',
    id: ['id', 'itemid'],
  },
  tmall: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    video: ['video.lib-video'],
    quantity: ['countValueForPC'],
    link: '',
    sku: ['.skuItem.current .skuValueName'],
    service: ['.skuServiceItemWrapper .skuServiceUniqItem.selectedService'],
    shopLink: 'ShopHeader--board--',
    shopName: 'ShopHeader--title--',
    market: 'tmall',
    id: ['id', 'itemid'],
  },
}

const getDataOnPage = (config_name: string) => {
  if (document) {
    const data = config[config_name]

    const name = compact(data.name.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)?.textContent
    }))[0]

    const price = compact(data.price.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)?.textContent
    }))[0]

    const salePrice = data.salePrice.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)?.textContent
    })

    const image = compact(data.image.map((className: string) => {
      return (document.querySelector(`[class*="${className}"]`) as HTMLImageElement)?.src
    }))

    const video = compact(data.video.map((className: string) => {
      return (document.querySelector(className) as HTMLImageElement)?.src
    }))

    const quantity = compact(data.quantity.map((className: string) => {
      return (document.querySelector(`[class*="${className}"]`) as HTMLInputElement)?.value
    }))[0]

    const sku = compact(data.sku.map((className: string) => {
      const skuList = Array.from(document.querySelectorAll(className))
      return skuList?.map((item: any) => item.textContent)
    }))

    const service = compact(data.service.map((className: string) => {
      const serviceList = Array.from(document.querySelectorAll(className))
      return serviceList?.map((item: any) => item.textContent)
    }))

    const shopName = (document.querySelector(`[class*="${data.shopName}"]`) as HTMLDivElement).textContent
    const shopLink = (document.querySelector(`a[class*="${data.shopLink}"]`) as HTMLLinkElement)?.href
    const shopId = new URL(shopLink).host.split('.')[0]
    const productId = compact(data.id.map((id: string) => {
      return new URLSearchParams(document.location.search).get(id)
    }))[0]

    return {
      id: productId,
      name,
      price,
      salePrice,
      image: image[0] || '',
      video: video[0],
      qty: quantity,
      sku: flattenDeep(sku),
      link: document.location.href,
      service,
      shopName,
      shopLink,
      shopId,
    }
  }

}

export default getDataOnPage
