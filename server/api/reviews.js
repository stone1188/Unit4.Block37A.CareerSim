const { PrismaClient } = require("@prisma/client");
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


// write routes for editing and deleting reviews, 
// ask for help tomorrow about generating multiple comments and reviews
// remember to make comments

module.exports = router;