import { Types } from 'mongoose'

interface Card {
  _id: Types.ObjectId
  name: string
  nameRU: string
}

export interface WordsResponseDto {
  _id: Types.ObjectId
  name: string
  nameRU: string
  cards: Array<Card>
}
