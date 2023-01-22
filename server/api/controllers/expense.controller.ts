import { Handler } from 'express'
import { PrismaClient } from '@prisma/client'

const ExpenseTB = new PrismaClient().expense

export const getExpenses: Handler = async (req, res) => {
	try {
		const { from: _from, to: _to } = req.query
		const from = _from ? new Date(_from as string) : new Date()
		const to = _to ? new Date(new Date(_to as string).getTime() + 86400000) : new Date()
		// prettier-ignore
		const where = from || to ? { AND: [{ createdAt: { gte: from } }, { createdAt: { lt: to } }] } : {}
		const expenses = await ExpenseTB.findMany({ where })
		return res.json({ expenses }).end()
		// 2023-01-21T12:55:28.960Z
		// 2023-01-21T13:01:20.751Z
	} catch (e) {
		return res.status(400).end()
	}
}

export const createExpense: Handler = async (req, res) => {
	const expense = await ExpenseTB.create({ data: req.body })
	res.json(expense).end()
}

export const updateExpense: Handler = async (req, res) => {
	const expense = await ExpenseTB.update({ where: { id: req.params.id }, data: req.body })
	res.json(expense).end()
}
