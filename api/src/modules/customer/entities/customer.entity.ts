import { Contact, Product } from '@prisma/client'

export default interface CustomerEntity {
  id: string
  customId: string
  name: string
  email: string
  country: string
  registeredName: string
  rfc: string
  address: string
  economicActivity: string
  status: string
  sellerName: string
  sellerComments: string
  comissionTerm: string
  percentageComissions: number
  products: Pick<Product, 'name' | 'shortName'>[]
  contacts: Pick<Contact, 'name' | 'email' | 'type'>[]
  devices: string[]
  skuStart: string | null
  skuEnd: string | null
  sku3m: boolean
  skuHBMF: boolean
  skuHBMPRE: boolean
  dbName: string | null
}
