const { PrismaClient } = require("@prisma/client");
const { route } = require("./user");
const prisma = new PrismaClient();

const router = require("express").Router();

// create a review
router.post("/", async (req, res, next) => {
     try {

        const {userId, itemId, rating, comment } = req.body;

          const review = await prisma.review.create({
               data: {
                userId: userId,
                itemId: itemId,
                rating: rating,
                comment: comment
               }
          });
          res.send(review);
     } catch (error) {
          next(error);
     }
});

// update a review
router.put("/:id", async (req, res, next) => {
     try {
          const { rating, comment } = req.body;

          const updateReview = await prisma.review.update({
            where: {
                id: req.params.id,
            },
            data: {
                rating: rating,
                comment: comment,
            },
          });
          if(!review) {
            return res.status(404).send("No Review")
          }
          res.send(updateReview);
     } catch (error) {
          next(error);
     }
});

// delete a review
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteReview = await prisma.review.delete({
            where: {
                id: req.params.id,
            },
            include: {
                comments: true
            }
        })

        res.status(200).json({message: 'review deleted', deleteReview});
    } catch (error) {
        next(error)
    }
});



module.exports = router;