const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

// get a comment
router.get("/:id", async (req, res, next) => {
     try {
          const comment = await prisma.comment.findUnique({
               where: {
                    id: req.params.id,
               },
               include: {
                user: true
            }
          });
          res.send(comment);
     } catch (error) {
          next(error);
     }
});

// create a comment
router.post("/", async (req, res, next) => {
     try {

        const {reviewId, userId, itemId, rating, text } = req.body;

          const comment = await prisma.review.create({
               data: {
                reviewId: reviewId,
                userId: userId,
                itemId: itemId,
                rating: rating,
                text: text
               }
          });
          res.send(comment);
     } catch (error) {
          next(error);
     }
});

// update a comment
router.put("/", async (req, res, next) => {
     try {
          const { text } = req.body;

          const updateText = await prisma.review.update({
            where: {
                id: req.params.id,
            },
            data: {
                text: text,
            },
          });
          res.send(updateText);
     } catch (error) {
          next(error);
     }
});

// delete a comment
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteText = await prisma.review.delete({
            where: {
                id: req.params.id,
            },  
        })

        res.status(200).json({ message: "comment deleted", deleteText });
    } catch (error) {
        next(error)
    }
});


module.exports = router;
