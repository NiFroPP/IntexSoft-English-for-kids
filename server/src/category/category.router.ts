import { Router } from 'express'
import CategoryController from './category.controller'

const router = Router()

router.get('/get/data', CategoryController.getAllData)
router.get('/get/all', CategoryController.getAllCategoriesWithoutCards)
router.get('/get/words', CategoryController.getAllWords)
router.post('/get/one', CategoryController.getOneCategory)
router.post('/add', CategoryController.addCategory)
router.post('/update', CategoryController.updateCategory)
router.post('/delete', CategoryController.deleteCategory)
router.post('/cards/add', CategoryController.addCard)
router.post('/cards/update', CategoryController.updateCard)
router.post('/cards/delete', CategoryController.deleteCard)

export = router
