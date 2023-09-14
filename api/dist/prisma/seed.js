"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
// import customers from './data/customers'
const customers_json_1 = __importDefault(require("./data/customers.json"));
const prisma = new client_1.PrismaClient();
const permisionsData = [
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
];
const rolesData = [
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
];
const usersData = [
    {
        name: 'German Chavarín',
        email: 'gerchavarin@equality.company',
        password: (0, bcryptjs_1.hashSync)('german'),
        roles: {
            connect: [
                { name: 'admin' },
            ]
        }
    },
    {
        name: 'Iván Moreno',
        email: 'ivan@equality.company',
        password: '$2a$10$.g0RQuzedcdF0ZQgMFSRi.OTrjjnsjSqNf42zdr5lv5M2cfFaJ/EO',
        roles: {
            connect: [
                { name: 'admin' },
            ]
        }
    },
    {
        name: 'Lucy Núñez',
        email: 'lucy@equality.company',
        password: '$2a$08$oO3PUqgcqUnlkf1lsGMGAO079fYXqCNYBvkya/fD4nvjCk73MCx7q',
        roles: {
            connect: [
                { name: 'editor' },
            ]
        }
    },
    {
        name: 'Estefanía Andrade',
        email: 'estefania@equality.company',
        password: '$2a$08$2BeG18IXA0KlLL9ZGzBsa.pcefCL69iViTTaAnrlo.8OK3mO.13F6',
        roles: {
            connect: [
                { name: 'editor' },
            ]
        }
    },
    {
        name: 'Luis Amaya',
        email: 'luisamaya@equality.company',
        password: '$2a$08$4KW.RtoX.CTa2HPRjsOo0.jV/DipRnkykkuepBavk5v5cD9OYs35a',
        roles: {
            connect: [
                { name: 'editor' },
            ]
        }
    },
    {
        name: 'César León',
        email: 'cesar@equality.company',
        password: '$2a$08$NocbUewuLX4Yt3K3zppiMeigMjPonVKAjeEIc4fN5V8jyKr//lV6W',
        roles: {
            connect: [
                { name: 'admin' },
            ]
        }
    },
    {
        name: 'Josué Cobos',
        email: 'josue.cobos@equality.company',
        password: '$2a$08$broZgrgE2bxgv1mhrA7qZ.JTS.aDRLpEqbND1AiV42mupdYm1yBrG',
        roles: {
            connect: [
                { name: 'admin' },
            ]
        }
    },
];
const productsData = [
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
];
async function main() {
    console.log(`[!] Start seeding ...`);
    console.log(`[+] Creating permissions`);
    for (const p of permisionsData) {
        const permission = await prisma.permission.create({
            data: p,
        });
        console.log(`[-] created permission with id: ${permission.id}`);
    }
    console.log(`[+] All permissions created successfully`);
    console.log(`[+] Creating roles`);
    for (const r of rolesData) {
        const role = await prisma.role.create({
            data: r,
        });
        console.log(`[-] created role with id: ${role.id}`);
    }
    console.log(`[+] All roles created successfully`);
    console.log(`[+] Creating users`);
    for (const u of usersData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`[-] created user with id: ${user.id}`);
    }
    console.log(`[+] All users created successfully`);
    console.log(`[+] Creating products`);
    for (const p of productsData) {
        const product = await prisma.product.create({
            data: p,
        });
        console.log(`[-] created product with id: ${product.id}`);
    }
    console.log(`[+] All products created successfully`);
    console.log(`[+] Creating customers`);
    for (const customer of customers_json_1.default) {
        const { customId, name, email, country, registeredName, rfc, address, economicActivity, status, sellerName, sellerComments, comissionTerm, percentageComissions, devices, skuStart, skuEnd, sku3m, skuHBMF, skuHBMPRE, dbName, contacts, products } = customer;
        const customerCreated = await prisma.customer.create({
            data: {
                customId,
                name,
                email,
                country,
                registeredName,
                rfc,
                address,
                economicActivity,
                status,
                sellerName,
                sellerComments,
                comissionTerm,
                percentageComissions,
                devices,
                skuStart,
                skuEnd,
                sku3m,
                skuHBMF,
                skuHBMPRE,
                dbName,
                contacts: {
                    create: contacts
                },
                products: {
                    connect: products
                }
            }
        });
        console.log(`[-] created customer with id: ${customerCreated.id}`);
    }
    console.log(`[+] All customers created successfully`);
    console.log(`[!] Seeding finished.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});
