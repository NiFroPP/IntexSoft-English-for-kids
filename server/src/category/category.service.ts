import { Model } from 'mongoose'
import CategoryModel, { Category } from './category.model'
import CustomErrors from '../errors/API.error'
import { AllCategoriesWithoutCardsResponseDto } from './dto/allCategoriesWithoutCards.response.dto'
import { WordsResponseDto } from './dto/words.response.dto'

class CategoryService {
  constructor(private model: Model<Category>) {
    this.model = model
  }

  async isCandidateExist(name: string): Promise<Category> {
    const candidate = await this.model.findOne({ name })
    if (!candidate) {
      throw CustomErrors.badRequestError(`Category '${name}' does not exist`)
    }
    return candidate
  }

  async getAllData(): Promise<Category[]> {
    return this.model.find()
  }

  async getAllWords(): Promise<WordsResponseDto[]> {
    return this.model.find(
      {},
      { name: 1, nameRU: 1, cards: { name: 1, nameRU: 1 } }
    )
  }

  async getAllCategoriesWithoutCards(): Promise<
    AllCategoriesWithoutCardsResponseDto[]
  > {
    return this.model.find({}, { name: 1, nameRU: 1, image: 1 })
  }

  async getOneCategory(name: string): Promise<Category> {
    return this.isCandidateExist(name)
  }

  async addCategory(
    name: string,
    nameRU: string,
    image: string
  ): Promise<void> {
    const candidate = await this.model.findOne({ name })
    if (candidate) {
      throw CustomErrors.badRequestError(`Category '${name}' already exist`)
    }

    await this.model.create({
      name,
      nameRU,
      image,
      cards: [],
    })
  }

  async updateCategory(
    name: string,
    updName: string,
    updNameRU: string,
    updImage: string
  ) {
    await this.isCandidateExist(name)
    await this.model.updateOne(
      { name },
      { $set: { name: updName, nameRU: updNameRU, image: updImage } }
    )
  }

  async deleteCategory(name: string): Promise<void> {
    await this.isCandidateExist(name)
    await this.model.deleteOne({ name })
  }

  async addCard(
    name: string,
    cards: { name: string; nameRU: string; image: string; sound: string }
  ): Promise<void> {
    await this.isCandidateExist(name)
    await this.model.updateOne(
      { name },
      {
        $push: {
          cards: {
            name: cards.name,
            nameRU: cards.nameRU,
            image: cards.image,
            sound: cards.sound,
          },
        },
      }
    )
  }

  async updateCard(
    name: string,
    word: string,
    updCard: { name: string; nameRU: string; image: string; sound: string }
  ): Promise<void> {
    await this.isCandidateExist(name)
    await this.model.updateOne(
      { name, cards: { $elemMatch: { name: word } } },
      {
        $set: {
          'cards.$.name': updCard.name,
          'cards.$.nameRU': updCard.nameRU,
          'cards.$.image': updCard.image,
          'cards.$.sound': updCard.sound,
        },
      }
    )
  }

  async deleteCard(name: string, word: string): Promise<void> {
    await this.isCandidateExist(name)
    await this.model.updateOne(
      { name },
      {
        $pull: { cards: { name: word } },
      }
    )
  }
}

export default new CategoryService(CategoryModel)
