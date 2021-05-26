var express = require('express');
var router = express.Router();
var booksController=require('../controllers/books-controller');

router.post('/',async function(req, res, next) {
    await(booksController.addBook(req, res));
});

router.put('/:id',async function(req, res, next) {
    await(booksController.editBookById(req, res)); 
});

router.get('/',async function(req, res, next) {
    await(booksController.getAll(req, res));
});

router.get('/:id',async function(req, res, next) {
    await(booksController.getOneById(req, res));
});

router.delete('/:id',async function(req, res, next) {
    await(booksController.deleteBook(req, res));
});

module.exports = router;
