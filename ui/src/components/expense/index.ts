export { default as ExpensePage } from './ExpensePage'
import { QueryFunctionContext, QueryKey } from 'react-query'

// const server_url = 'https://hiyo-kanri-web-server.onrender.com/api/v1'
const server_url = 'http://localhost:5000/api/v1'

export const getExpensesFn = async (q: QueryFunctionContext<QueryKey, string>) => {
	const queryString = q.queryKey[1]
	return fetch(`${server_url}/expenses${queryString ?? ''}`)
		.then((res) => res.json())
		.then((res) => res.expenses)
}

export const createExpenseFn = (body: { name: string; amount: number; tags: string[] }) =>
	fetch(`${server_url}/expense`, {
		body: JSON.stringify(body),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json())
