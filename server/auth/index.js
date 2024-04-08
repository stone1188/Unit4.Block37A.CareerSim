const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../db");
// const axios = require("axios");


// register user
router.post("/register", async (req, res, next) => {
     try {
          const { username, email, password } = req.body;

            // check for existing user
            const existingUser = await prisma.user.findUnique({
                where: {
                    username: username,
                },
            })

            // deny them 
            if(existingUser) {
                return res.status(400).json({message: 'Username Exists'});
            }

          const newUser = await prisma.user.create({
               data: {
                    username: username,
                    email: email,
                    password: password,
               },
          });

          const token = jwt.sign({ userId: newUser.id}, process.env.JWT_SECRET);

          res.status(201).json({token});
     } catch (error) {
          next(error);
     }
});

// login
router.post('/login', async (req, res, next) => {
    try {
        const {username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });

        if (!user || password !== user.password) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.json({token});
    }catch (error) {
        next(error);
    }
})

module.exports = router;