const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const prisma = new PrismaClient().$extends({
     query: {
          user: {
               create({ model, operations, args, query }) {
                    args.data = {
                         ...args.data,
                         password: bcrypt.hashSync(
                              args.data.password,
                              Number(process.env.SALT_ROUNDS)
                         ),
                    };
                    return query(args);
               },
          },

          item: {
               create({ model, operations, args, query }) {
                    args.data = { ...args.data };
                    return query(args);
               },
          },

          review: {
               create({ model, operations, args, query }) {
                    args.data = { ...args.data };
                    return query(args);
               },
          },
          comment: {
               create({ model, operations, args, query }) {
                    args.data = { ...args.data };
                    return query(args);
               },
          },
     },
});



module.exports = {prisma};