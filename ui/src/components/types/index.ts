import { Decimal } from '@prisma/client/runtime'

export interface EXPENSE {
	id: string
	name: string
	tags: number[]
	amount: Decimal
	createdAt: string
	updatedAt: Date
	userId: string
}
