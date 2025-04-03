import { questionService } from './question.service.js'

export async function getQuestions(req, res) {
  try {
    const questions = await questionService.query()
    res.send(questions)
  } catch (err) {
    res.status(400).send(`Couldn't get questions`)
  }
}
