import { Request, Response } from 'express'
import CategoryService from './category.service'
import { wrapTryCatch } from '../utils/wrapTryCatch.utility'
import { AddCategoryRequestDto } from './dto/addCategory.request.dto'
import { UpdCategoryRequestDto } from './dto/updCategory.request.dto'
import { AddCardRequestDto } from './dto/addCard.request.dto'
import { UpdCardRequestDto } from './dto/updCard.request.dto'

const CategoryController = {
  addCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name, nameRU, image }: AddCategoryRequestDto = req.body
    await CategoryService.addCategory(name, nameRU, image)

    res.status(201).json({
      message: `Category '${name}' was created'`,
    })
  }),

  updateCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    const { updName, updNameRU, updImage }: UpdCategoryRequestDto = req.body
    await CategoryService.updateCategory(name, updName, updNameRU, updImage)

    res.json({
      message: `Category '${name}' was changed`,
    })
  }),

  deleteCategory: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    await CategoryService.deleteCategory(name)

    res.json({ message: `Category '${name}' was deleted` })
  }),

  addCard: wrapTryCatch(async (req: Request, res: Response) => {
    const { name } = req.params
    const { cards }: AddCardRequestDto = req.body
    await CategoryService.addCard(name, cards)

    res.status(201).json({
      message: `Card '${cards.name}' added to category '${name}'`,
    })
  }),

  updateCard: wrapTryCatch(async (req: Request, res: Response) => {
    const { name, word } = req.params
    const { updCard }: UpdCardRequestDto = req.body
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
        id: card._id,
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
