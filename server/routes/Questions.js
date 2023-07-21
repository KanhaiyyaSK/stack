import express from 'express'
import auth from '../middlewares/auth.js'
import { AskQuestion, getAllquestions, deleteQuestion, voteQuestion } from '../controllers/Questions.js'

const router = express.Router()
router.post('/Ask', auth, AskQuestion)
router.get('/get', getAllquestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion)

export default router