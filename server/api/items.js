// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const { prisma } = require("../db");
const router = require("express").Router();

// retrieve a list of items
router.get("/", async (req, res, next) => {
     try {
          const items = await prisma.item.findMany();
          res.send(items);
     } catch (error) {
          next(error);
     }
});

// get a single item
router.get("/:id", async (req, res, next) => {
     try {
          const item = await prisma.item.findUnique({
               where: {
                    id: req.params.id,
               },
               include: {
                reviews: true,
                comments: true
            }
          });
          res.send(item);
     } catch (error) {
          next(error);
     }
});

//update and item via id
router.put("/:id", async (req, res, next) => {
     try {
        const { name, description} = req.body;
        
        const updateItem = await prisma.item.update({
            where: {
                id: req.params.id,
            },
            data: {
            name: name,
            description: description
            }
        });
        res.send(updateItem);
    } catch (error) {
        next(error);
    }
});

// create an item
router.post("/newitem", async (req, res, next) => {
     try {
          const { name, description } = req.body;

          const newItem = await prisma.item.create({
               data: {
                    name: name,
                    description: description
               },
          });
          res.send(newItem);
     } catch (error) {
          next(error);
     }
});

// delete an item
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteItem = await prisma.item.delete({
            where: {
                id: req.params.id,
            },  
        })

        res.status(200).json({message: 'item deleted', deleteItem});
    } catch (error) {
        next(error)
    }
});

module.exports = router;