import { Expense, PrismaClient } from '@prisma/client'

const ExpenseTB = new PrismaClient().expense

export const getExpenses = async (args: { from?: string; to?: string }) => {
	try {
		const { from: _from, to: _to } = args
		const from = _from ? new Date(_from as string) : new Date(new Date().toDateString())
		const to = _to ? new Date(new Date(_to as string).getTime() + 86400000) : new Date()
		// prettier-ignore
		const where = from || to ? { AND: [{ createdAt: { gte: from } }, { createdAt: { lt: to } }] } : {}
		return ExpenseTB.findMany({ where })
	} catch (e) {
		// return res.status(400).end()
	}
}

export const createExpense = async (args: { data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'> }) => {
	try {
		const { data } = args
		return ExpenseTB.create({ data })
	} catch (e) {
		// return res.status(400).end()
	}
}
