import { Request, Response } from 'express'
import CategoryService from './category.service'
import { wrapTryCatch } from '../utils/wrapTryCatch.utility'

const CategoryController = {
  addCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name, nameRU, image } = req.body
    const newCategory = await CategoryService.addCategory(name, nameRU, image)

    res.status(201).json(newCategory)
  }),

  updateCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    const { updName, updNameRU, updImage } = req.body
    const updCategory = await CategoryService.updateCategory(
      name,
      updName,
      updNameRU,
      updImage
    )

    res.json(updCategory)
  }),

  deleteCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    await CategoryService.deleteCategory(name)

    res.json({ message: `Category '${name}' was deleted` })
  }),

  addCard: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    const { cards } = req.body
    await CategoryService.addCard(name, cards)

    res.status(201).json({
      message: `Card '${cards.name}' added to category '${name}'`,
    })
  }),

  updateCard: wrapTryCatch(async (req: Request, res: Response) => {
    const { name, word } = req.params
    const { updCard } = req.body
    await CategoryService.updateCard(name, word, updCard)

    res.json({
      message: `Card '${word}' from category '${name}' was changed`,
    })
  }),

  deleteCard: wrapTryCatch(async (req: Request, res: Response) => {
    const { name, word } = req.params
    await CategoryService.deleteCard(name, word)

    res.json({
      message: `Card '${word}' in category '${name}' was deleted`,
    })
  }),

  getAllCategoriesWithoutCards: wrapTryCatch(
    async (req: Request, res: Response) => {
      const categories = await CategoryService.getAllCategoriesWithoutCards()

      res.json(categories)
    }
  ),

  getOneCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    const category = await CategoryService.getOneCategory(name)

    res.json(category)
  }),

  getAllData: wrapTryCatch(async (req: Request, res: Response) => {
    const data = await CategoryService.getAllData()

    res.json(data)
  }),

  getAllWords: wrapTryCatch(async (req: Request, res: Response) => {
    const data = await CategoryService.getAllWords()
    const words = data.flatMap((word) =>
      word.cards.map((card) => ({
        name: card.name,
        nameRU: card.nameRU,
        category: word.name,
        categoryRU: word.nameRU,
      }))
    )

    res.json(words)
  }),
}

export default CategoryController
