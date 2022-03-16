import { Router } from 'express'
import CategoryController from './category.controller'

const router = Router()

router.get('/all', CategoryController.getAllData)
router.get('/words', CategoryController.getAllWords)
router.get('/:name', CategoryController.getOneCategory)
router.get('/', CategoryController.getAllCategoriesWithoutCards)
router.post('/', CategoryController.addCategory)
router.patch('/:name', CategoryController.updateCategory)
router.delete('/:name', CategoryController.deleteCategory)
router.post('/cards/:name', CategoryController.addCard)
router.patch('/cards/:name/:word', CategoryController.updateCard)
router.delete('/cards/:name/:word', CategoryController.deleteCard)

export = router
