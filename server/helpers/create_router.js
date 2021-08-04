const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function(collection) {

    const router = express.Router();

    router.get('/', (req, res) => {
       collection
        .find()
        .toArray()
        .then((docs) => res.json(docs))
        .catch((err) => {
            console.error(err);
            res.status(500);
            res.json({ status: 500, error:err});
    });
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        collection.deleteOne({"_id": ObjectId(id)})
        .then ((result) => {
            res.json(result)
        });
    });


   
    return router;
};

module.exports = createRouter;