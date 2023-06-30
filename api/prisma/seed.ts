import { hashSync } from 'bcryptjs'
import { Prisma, PrismaClient } from '@prisma/client'

import customers from './data/customers'

const prisma = new PrismaClient()

const permisionsData: Prisma.PermissionCreateInput[] = [
  { action: 'user/list' },
  { action: 'user/create' },
  { action: 'user/edit' },
  { action: 'user/delete' },
  { action: 'role/list' },
  { action: 'role/create' },
  { action: 'role/edit' },
  { action: 'role/delete' },
  { action: 'customer/list' },
  { action: 'customer/create' },
  { action: 'customer/edit' },
  { action: 'customer/delete' },
]

const rolesData: Prisma.RoleCreateInput[] = [
  {
    name: 'reader',
    permissions: {
      connect: [
        { action: 'user/list' },
        { action: 'role/list' },
        { action: 'customer/list' },
      ],
    },
  },
  {
    name: 'editor',
    permissions: {
      connect: [
        { action: 'user/list' },
        { action: 'user/edit' },
        { action: 'role/list' },
        { action: 'role/edit' },
        { action: 'customer/list' },
        { action: 'customer/edit' },
      ],
    },
  },
  {
    name: 'admin',
    permissions: {
      connect: [
        { action: 'user/list' },
        { action: 'user/create' },
        { action: 'user/edit' },
        { action: 'user/delete' },
        { action: 'role/list' },
        { action: 'role/create' },
        { action: 'role/edit' },
        { action: 'role/delete' },
        { action: 'customer/list' },
        { action: 'customer/create' },
        { action: 'customer/edit' },
        { action: 'customer/delete' },
      ],
    },
  },
]

const usersData: Prisma.UserCreateInput[] = [
  {
    name: 'German Chavarín',
    email: 'gerchavarin@equality.company',
    password: hashSync('german'),
    roles: {
      connect: [
        { name: 'admin' },
      ]
    }
  },
  {
    name: 'Iván Moreno',
    email: 'ivan@equality.company',
    password: hashSync('ivan'),
    roles: {
      connect: [
        { name: 'admin' },
      ]
    }
  },
  {
    name: 'Liliana Rodríguez',
    email: 'lili.rdz@equality.company',
    password: hashSync('liliana'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'César León',
    email: 'cesar@equality.company',
    password: hashSync('cesar'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Jorge León',
    email: 'jorge.leon@equality.company',
    password: hashSync('jorge'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Iliana Sánchez',
    email: 'iliana@equality.company',
    password: hashSync('iliana'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Carlos Angeles ',
    email: 'carlos.angeles@equality.company',
    password: hashSync('carlos'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Felipe Mogro',
    email: 'fmogro@equality.company',
    password: hashSync('felipe'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Jesus Cansino',
    email: 'jesus@equality.company',
    password: hashSync('jesus'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'María Arteaga',
    email: 'mc@equality.company',
    password: hashSync('maria'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Monserrat Paredes',
    email: 'monse@equality.company',
    password: hashSync('monserrat'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
  {
    name: 'Francisco Acevedo',
    email: 'francisco@equality.company',
    password: hashSync('francisco'),
    roles: {
      connect: [
        { name: 'editor' },
        { name: 'reader' },
      ]
    }
  },
]

const productsData: Prisma.ProductCreateInput[] = [
  {
    name: 'Credolab',
    shortName: 'credolab',
  },
  {
    name: 'Lms',
    shortName: 'lms',
  },
  {
    name: 'Nuovo',
    shortName: 'nuovo',
  },
  {
    name: 'Protexion',
    shortName: 'protexion',
  },
  {
    name: 'Pagos',
    shortName: 'pagos',
  },
  {
    name: 'Entretenimiento',
    shortName: 'entretenimiento',
  },
]

async function main() {
  console.log(`[!] Start seeding ...`)

  console.log(`[+] Creating permissions`);

  for (const p of permisionsData) {
    const permission = await prisma.permission.create({
      data: p,
    })
    console.log(`[-] created permission with id: ${permission.id}`)
  }

  console.log(`[+] All permissions created successfully`);

  console.log(`[+] Creating roles`);

  for (const r of rolesData) {
    const role = await prisma.role.create({
      data: r,
    })
    console.log(`[-] created role with id: ${role.id}`)
  }

  console.log(`[+] All roles created successfully`);

  console.log(`[+] Creating users`);

  for (const u of usersData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`[-] created user with id: ${user.id}`)
  }

  console.log(`[+] All users created successfully`);

  console.log(`[!] Seeding finished.`)

  console.log(`[+] Creating products`);

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`[-] created product with id: ${product.id}`)
  }

  console.log(`[+] All products created successfully`);

  console.log(`[+] Creating customers`);

  for (const customer of customers) {
    const products = []

    if (customer.credolab === 1) {
      products.push({ shortName: 'credolab' })
    }
    if (customer.lms === 1) {
      products.push({ shortName: 'lms' },)
    }
    if (customer.nuovo === 1) {
      products.push({ shortName: 'nuovo' })
    }
    if (customer.protexion === 1) {
      products.push({ shortName: 'protexion' })
    }
    if (customer.pagos === 1) {
      products.push({ shortName: 'pagos' })
    }
    if (customer.entretenimiento === 1) {
      products.push({ shortName: 'entretenimiento' })
    }

    const customerCreated = await prisma.customer.create({
      data: {
        customId: customer.cust_id,
        name: customer.nombre || '',
        email: customer.email || '',
        country: customer.pais || '',
        registeredName: customer.razon_social || '',
        rfc: customer.rfc || '',
        address: customer.d_fisc || '',
        economicActivity: customer.giro || '',
        status: customer.status || '',
        sellerName: customer.vendedor || '',
        sellerComments: customer.comentarios || '',
        comissionTerm: new Date(),
        percentageComissions: customer.porcentaje_comision || 0,
        products: {
          connect: products
        }
      }
    })
    console.log(`[-] created customer with id: ${customerCreated.id}`)

    const contacts = []

    if (customer?.nom_com && customer.nom_com.length > 0) {
      contacts.push(
        {
          name: customer.nom_com || '',
          email: customer?.email_com || '',
          type: 'com',
        }
      )
    }

    if (customer?.email_tec && customer.email_tec.length > 0) {
      const emailsTec = customer.email_tec.split(',')
      emailsTec.forEach((email, i) => {
        let nameTec = ''
        if (customer?.nom_tec) {
          const namesTec = customer.nom_tec.split(',')
          nameTec = namesTec[i] || customer.nom_tec
        }
        contacts.push(
          {
            name: nameTec,
            email: email,
            type: 'tec',
          }
        )
      })
    }

    for (const contactData of contacts) {
      const contact = await prisma.contact.create({
        data: {
          name: contactData.name,
          email: contactData.email,
          type: contactData.type,
          customerId: customerCreated.id,
        }
      })
      console.log(`[-] created contact with id: ${contact.id}`)
    }

  }

  console.log(`[+] All customers created successfully`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
