import type { Handler, Response } from 'express'
import type { SafeParseReturnType, ZodError } from 'zod'

export const badRequest = (res: Response, error: ZodError) => {
	const httpBodyErrors = error.issues.reduce((obj, e) => {
		if (e.code === 'unrecognized_keys') return { ...obj, [e.keys[0]]: 'Unnecessory' }
		return { ...obj, [e.path[0]]: e.message }
	}, {})
	res.json({ status: 400, message: 'irrelevant body', httpBodyErrors }).end()
}

export const validateBodyMiddleware: VBM = (validateFn) => (req, res, next) => {
	const validation = validateFn(req.body)
	if (!validation.success) return badRequest(res, validation.error)
	next()
}

type ValidateFn = (body: any) => SafeParseReturnType<any, any>
type VBM = (fn: ValidateFn) => Handler

export * from '../validation/expense.validation'
