// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
const { prisma } = require("../db");
const { faker } = require("@faker-js/faker");


        

        

async function seed() {
     console.log("Its the SEED");
     try {
          // await prisma.user.deleteMany();
        
        

        //   await prisma.user.createMany({
        //         data: Array.from({ length: 15 }).map(() => {
        //             return {
        //                 username: faker.internet.userName(),
        //                 email: faker.internet.email(),
        //                 password: faker.internet.password(),
        //             };
        //         })   
        //   });

        //   await prisma.item.createMany({
        //        data: Array.from({ length: 15 }).map(() => {
        //             return {
        //                 name: faker.commerce.productName(),
        //                 description: faker.commerce.productDescription()
        //             };
        //         })
        //   });

        //   await prisma.review.create({
        //        data: {
        //             rating: 5,
        //             comment: faker.word.words(),
        //             userId: "9d4e4fa3-cc7b-4bd5-9500-dd241283fa90",
        //             itemId: "44114d97-4b4d-4810-80f5-919b21c9ae58",
        //        },
        //   });

        //   await prisma.comment.create({
        //        data: {
        //             text: faker.word.words(),
        //             userId: "80df4e77-be43-40f6-bf68-836ff14881df",
        //             reviewId: "5546b3fa-9d56-413b-8211-179650f8e53c",
        //             itemId: "a5d801c4-4803-4898-b1aa-f7f95e2cc522",
        //        },
        //   });


          console.log("things were made");
     } catch (error) {
          console.error(error);
     }
}

seed();

module.exports = seed;
