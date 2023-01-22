import { z } from 'zod'

export const validateCreateExpenseBody = (body: {}) => createExpenseBody.safeParse(body)

export const validateUpdateExpenseBody = (body: {}) => updateExpenseBody.safeParse(body)

const createExpenseBody = z.object({ name: z.string(), amount: z.number(), tags: z.array(z.string()) }).strict()

const updateExpenseBody = createExpenseBody.partial()
