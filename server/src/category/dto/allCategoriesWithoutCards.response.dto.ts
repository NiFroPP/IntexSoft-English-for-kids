import { Types } from 'mongoose'

export interface AllCategoriesWithoutCardsResponseDto {
  _id: Types.ObjectId
  name: string
  nameRU: string
  image: string
}
