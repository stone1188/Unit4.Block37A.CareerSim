const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

prisma.$extends({
    query: {
        user:{
            create({ model, operations, args, query}) {
                args.data = {...args.data, password: bcrypt.hashSync(args.data.password, Number(process.env.SALT_ROUNDS))}
                return query(args);
            }
        },
    }
})



module.exports = {prisma};