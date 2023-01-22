import { Router } from 'express'
import { createExpense, getExpenses, updateExpense } from '../controllers/expense.controller'
import {
	validateBodyMiddleware,
	validateCreateExpenseBody,
	validateUpdateExpenseBody,
} from '../validation/index.validation'

const router = Router()

router.get('/expenses', getExpenses)
router.post('/expense', validateBodyMiddleware(validateCreateExpenseBody), createExpense)
router.put('/expense/:id', validateBodyMiddleware(validateUpdateExpenseBody), updateExpense)

module.exports = router
