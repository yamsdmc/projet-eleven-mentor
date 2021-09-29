import express from "express";

export const routerTest = express.Router();

/**
 * @swagger
 * /tete:
 *  get:
 *    description: Get all books
 *    responses:
 *      200:
 *       description: Success
 */
routerTest.get("/tete", (req, res) => {
    res.send([
        {
            id: 1,
            title: "title test 1",
        },
        {
            id: 2,
            title: "title test 2",
        },
    ]);
});
