import { Schema, model, Document } from 'mongoose'

export interface Card {
  name: string
  nameRU: string
  image: string
  sound: string
}

const cardSchema = new Schema<Card>(
  {
    name: { type: String, require: true },
    nameRU: { type: String, require: true },
    image: { type: String, require: true },
    sound: { type: String, require: true },
  },
  {
    versionKey: false,
  }
)

export interface Category extends Document {
  name: string
  nameRU: string
  image: string
  cards: Array<Card>
}

const schema = new Schema<Category>(
  {
    name: { type: String, unique: true, require: true },
    nameRU: { type: String, require: true },
    image: { type: String, require: true },
    cards: {
      type: [cardSchema],
    },
  },
  {
    versionKey: false,
  }
)

const CategoryModel = model<Category>('Category', schema)

export default CategoryModel
