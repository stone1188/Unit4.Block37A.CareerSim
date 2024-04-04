// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
 const { prisma } = require('../db')
const { faker } = require('@faker-js/faker');

async function seed() {
    console.log('Its the SEED');
    try {
        // await prisma.user.deleteMany();

        
    await prisma.user.create({
            data: {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
        },
    })
    
        console.log('users made');
    } catch (error) {
        console.error(error);
    }
}

seed();

module.exports = seed;