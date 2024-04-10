const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

const findUserWithToken = async (token) => {
    let id;
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        id = payload.userId;
    } catch (error) {
        console.error(error)
    }

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            username: true,
        }
    })

    if(!user) {
        const error = new Error("Not authorized");
        error.status = 401;
        throw error
    }
    return user;
}


module.exports = {prisma, findUserWithToken};