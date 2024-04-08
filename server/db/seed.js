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
        //             userId: "0e74ecfb-2832-4593-8a23-ec1c2dfd2668",
        //             itemId: "0b290c19-e600-4614-9562-1f3929e9447d",
        //        },
        //   });

        //   await prisma.comment.create({
        //        data: {
        //             text: faker.word.words(),
        //             userId: "a842e1a4-54ea-493c-905b-48bc8b925000",
        //             reviewId: "641fb4e2-8db9-44f0-9cef-6a6804787be6",
        //             itemId: "0b290c19-e600-4614-9562-1f3929e9447d",
        //        },
        //   });


          console.log("things were made");
     } catch (error) {
          console.error(error);
     }
}

seed();

module.exports = seed;
