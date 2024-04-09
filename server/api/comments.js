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
router.post("/review/:reviewId/comment", async (req, res, next) => {
     try {

        const { userId, itemId, text } = req.body;
        const { reviewId } = req.params;

          const comment = await prisma.comment.create({
         
               data: {
                reviewId: reviewId,
                userId: userId,
                itemId: itemId,
                text: text
               }
          });
          res.send(comment);
     } catch (error) {
          next(error);
     }
});

// update a comment
router.put("/:id", async (req, res, next) => {
     try {
          const { text } = req.body;

          const updateText = await prisma.comment.update({
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

        res.status(200).json({message: 'comment deleted', deleteText});
    } catch (error) {
        next(error)
    }
});


module.exports = router;
