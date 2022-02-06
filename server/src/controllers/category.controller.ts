import { Request, Response, NextFunction } from 'express'
import CategoryService from '../service/category.service'

const CategoryController = {
  async addCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, nameRU, image } = req.body
      const newCategory = await CategoryService.addCategory(name, nameRU, image)

      res.status(201).json(newCategory)
    } catch (e) {
      next(e)
    }
  },

  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, updName, updNameRU, updImage } = req.body
      const updCategory = await CategoryService.updateCategory(
        name,
        updName,
        updNameRU,
        updImage
      )

      res.json(updCategory)
    } catch (e) {
      next(e)
    }
  },

  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name } = req.body
      await CategoryService.deleteCategory(name)

      res.json({ message: `Category '${name}' was deleted` })
    } catch (e) {
      next(e)
    }
  },

  async addCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, cards } = req.body
      await CategoryService.addCard(name, cards)

      res.status(201).json({
        message: `Card '${cards.name}' added to category '${name}'`,
      })
    } catch (e) {
      next(e)
    }
  },

  async updateCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, cardName, updCard } = req.body
      await CategoryService.updateCard(name, cardName, updCard)

      res.json({
        message: `Card '${cardName}' from category '${name}' was changed`,
      })
    } catch (e) {
      next(e)
    }
  },

  async deleteCard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, cards } = req.body
      await CategoryService.deleteCard(name, cards)

      res.json({
        message: `Card '${cards.name}' in category '${name}' was deleted`,
      })
    } catch (e) {
      next(e)
    }
  },

  async getAllCategoriesWithoutCards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await CategoryService.getAllCategoriesWithoutCards()

      res.json(categories)
    } catch (e) {
      next(e)
    }
  },

  async getOneCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name } = req.body
      const category = await CategoryService.getOneCategory(name)

      res.json(category)
    } catch (e) {
      next(e)
    }
  },

  async getAllData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await CategoryService.getAllData()

      res.json(data)
    } catch (e) {
      next(e)
    }
  },
}

export default CategoryController
