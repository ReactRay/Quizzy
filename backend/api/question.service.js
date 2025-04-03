import { dbService } from '../services/db.service.js'
import { ObjectId } from 'mongodb'

export const questionService = {
  query,
}

async function query() {
  try {
    const collection = await dbService.getCollection('questions')
    const questions = await collection.find().toArray()
    return questions
  } catch (err) {
    loggerService.error('cannot find questions', err)
    throw err
  }
}
