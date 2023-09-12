"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const customers_1 = __importDefault(require("./data/customers"));
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
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
    for (const customer of customers_1.default) {
        const products = [];
        if (customer.credolab === 1) {
            products.push({ shortName: 'credolab' });
        }
        if (customer.lms === 1) {
            products.push({ shortName: 'lms' });
        }
        if (customer.nuovo === 1) {
            products.push({ shortName: 'nuovo' });
        }
        if (customer.protexion === 1) {
            products.push({ shortName: 'protexion' });
        }
        if (customer.pagos === 1) {
            products.push({ shortName: 'pagos' });
        }
        if (customer.entretenimiento === 1) {
            products.push({ shortName: 'entretenimiento' });
        }
        const customerCreated = await prisma.customer.create({
            data: {
                customId: customer.cust_id,
                name: (_a = customer.nombre) !== null && _a !== void 0 ? _a : '',
                email: (_b = customer.email) !== null && _b !== void 0 ? _b : '',
                country: (_c = customer.pais) !== null && _c !== void 0 ? _c : '',
                registeredName: (_d = customer.razon_social) !== null && _d !== void 0 ? _d : '',
                rfc: (_e = customer.rfc) !== null && _e !== void 0 ? _e : '',
                address: (_f = customer.d_fisc) !== null && _f !== void 0 ? _f : '',
                economicActivity: (_g = customer.giro) !== null && _g !== void 0 ? _g : '',
                status: (_h = customer.status) !== null && _h !== void 0 ? _h : '',
                sellerName: (_j = customer.vendedor) !== null && _j !== void 0 ? _j : '',
                sellerComments: (_k = customer.comentarios) !== null && _k !== void 0 ? _k : '',
                comissionTerm: (_l = customer.vigencia_comision) !== null && _l !== void 0 ? _l : '',
                percentageComissions: (_m = customer.porcentaje_comision) !== null && _m !== void 0 ? _m : 0,
                products: {
                    connect: products
                },
                dbName: customer.db_name ? customer.db_name : '',
            }
        });
        console.log(`[-] created customer with id: ${customerCreated.id}`);
        const contacts = [];
        if ((customer === null || customer === void 0 ? void 0 : customer.nom_com) && customer.nom_com.length > 0) {
            contacts.push({
                name: (_o = customer.nom_com) !== null && _o !== void 0 ? _o : '',
                email: (_p = customer === null || customer === void 0 ? void 0 : customer.email_com) !== null && _p !== void 0 ? _p : '',
                type: 'com',
            });
        }
        if ((customer === null || customer === void 0 ? void 0 : customer.email_tec) && customer.email_tec.length > 0) {
            const emailsTec = customer.email_tec.split(',');
            emailsTec.forEach((email, i) => {
                var _a;
                let nameTec = '';
                if (customer === null || customer === void 0 ? void 0 : customer.nom_tec) {
                    const namesTec = customer.nom_tec.split(',');
                    nameTec = (_a = namesTec[i]) !== null && _a !== void 0 ? _a : customer.nom_tec;
                }
                contacts.push({
                    name: nameTec,
                    email: email,
                    type: 'tec',
                });
            });
        }
        for (const contactData of contacts) {
            const contact = await prisma.contact.create({
                data: {
                    name: contactData.name,
                    email: contactData.email,
                    type: contactData.type,
                    customerId: customerCreated.id,
                }
            });
            console.log(`[-] created contact with id: ${contact.id}`);
        }
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
