// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const {prisma}  = require("../db")

const router = require("express").Router();

// router.use((req, res, next) => {
//     if(!req.user) {
//         return res.status(401).send("Gotta log in");
//     }
//     next();
// });

// get all users
router.get("/", async (req, res,next) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

// get a single user by id
router.get("/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
             where: {
                  id: req.params.id,
             },
             include: {
                reviews: true,
                comments: true
             }
        });
        res.send(user);
    } catch (error){
        next(error)
    }
});



module.exports = router