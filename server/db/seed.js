// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
const { prisma } = require("../db");
const { faker } = require("@faker-js/faker");

async function seed() {
     console.log("Its the SEED");
     try {
          // await prisma.user.deleteMany();

          const user = Array.from({ length: 20 }).map(() => ({
               username: faker.internet.userName(),
               email: faker.internet.email(),
               password: faker.internet.password(),
          }));

          const item = Array.from({ length: 10 }).map(() => ({
               name: faker.commerce.product(),
               description: faker.commerce.productDescription(),
          }));

          await prisma.Item.createMany({ data: item });
          await prisma.User.createMany({ data: user });

          const Items = await prisma.Item.findMany();
          const Users = await prisma.User.findMany();

          const randomUserIdResult =
               await prisma.$queryRaw`SELECT id FROM "User" ORDER BY RANDOM() LIMIT 3;`;

          const randomItemId =
               await prisma.$queryRaw`SELECT id FROM "Item" ORDER BY RANDOM() LIMIT 1;`;
     

          Items.forEach(async (item) => {
               await prisma.item.update({
                    where: {
                         id: item.id,
                    },
                    data: {
                         reviews: {
                              createMany: {
                                   data: Array.from({ length: 2 }).map(() => ({
                                        rating: faker.number.int({
                                             min: 1,
                                             max: 5,
                                        }),
                                        comment: faker.word.words(),
                                        userId: randomUserIdResult[0].id,
                                        
                                   })),
                              },
                         },
                    },
               });
          });

          // const Reviews = await prisma.Review.findMany();
          // Reviews.forEach(async (review) => {
          //      await prisma.review.update({
          //           where: {
          //                id: review.id,
          //           },
          //           data: {
          //                comments: {
          //                     createMany: {
          //                          data: Array.from({ length: 1 }).map(() => ({
          //                               text: faker.word.words(),
          //                               userId: randomUserIdResult[1].id,
          //                               itemId: randomItemId[0].id
          //                          })),
          //                     },
          //                },
          //           },
          //      });
          // })

         
          console.log("things were made");
     } catch (error) {
          console.error(error);
     }
}




seed()
     .then(async () => {
          await prisma.$disconnect();
     })
     .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
     });

module.exports = seed;
