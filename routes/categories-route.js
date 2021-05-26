var express = require('express');
var router = express.Router();
var categoriesController=require('../controllers/categories-controller');

router.post('/',async function(req, res, next) {
    await(categoriesController.addCategory(req, res));
});

router.put('/:id',async function(req, res, next) {
    await(categoriesController.editCategoryById(req, res)); 
});

router.get('/',async function(req, res, next) {
    await(categoriesController.getAll(req, res));
});

router.get('/:id',async function(req, res, next) {
    await(categoriesController.getOneById(req, res));
});

router.delete('/:id',async function(req, res, next) {
    await(categoriesController.deleteCategory(req, res));
});

module.exports = router;
