'use client'
import { EXPENSE } from '../types'
import { Dispatch, SetStateAction, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { useMutation, useQueryClient } from 'react-query'
import { createExpenseFn } from '.'

const reducerFunc = (state: T, { type, payload }: A) => {
	console.log(payload)
	switch (type) {
		case 'NAME':
			return { ...state, name: { value: payload.value, error: payload.error } }
		case 'AMOUNT':
			return { ...state, amount: { value: payload.value, error: payload.error } }
		case 'RESET':
			return defaultForm
	}
}

const defaultForm = { name: { value: '', error: '' }, amount: { value: '', error: '' } }

export default function CreateExpenseModal(props: Props) {
	const { open, setOpen } = props
	const [{ name, amount }, dispatch] = useReducer(reducerFunc, defaultForm)

	const uqc = useQueryClient()

	const { mutateAsync: createExpense } = useMutation(createExpenseFn, {
		onSuccess: async (expense) => {
			uqc.setQueryData<EXPENSE[]>('expenses', (expenses) => [...(expenses ?? []), expense])
			setOpen(false)
		},
	})

	const handleCreateExpense = async () => {
		if (!name.value) return dispatch({ type: 'NAME', payload: { value: '', error: 'Name must not be empty' } })
		// prettier-ignore
		if (Number(amount.value) < 0) return dispatch({ type: 'AMOUNT', payload: { value: amount.value, error: 'Amount must not be a negative number' } })
		if (amount.value === '')
			return dispatch({ type: 'AMOUNT', payload: { value: '', error: 'Amount must not be empty' } })
		await createExpense({ amount: +amount.value, name: name.value, tags: [] })
		dispatch({ type: 'RESET', payload: { value: '' } })
	}

	if (!open || !document) return null

	return createPortal(
		<div
			onClick={() => setOpen(false)}
			className='fixed top-0 right-0 grid h-screen w-full place-items-center bg-emerald-100 bg-opacity-50'
		>
			<div onClick={(e) => e.stopPropagation()} className='expand-animation w-10/12 rounded-md bg-white p-6 shadow-md'>
				<h2 className='mb-3 text-center text-xl font-medium'>Create a new expense</h2>
				<div className='mb-3'>
					<label className='text-sm text-gray-800'>Name</label>
					<input
						value={name.value}
						onChange={(e) => dispatch({ type: 'NAME', payload: { value: e.target.value } })}
						placeholder='Item name'
						className='w-full bg-slate-100 px-2 py-1 outline-none'
					/>
					<span className='text-sm text-red-500'>{name.error}</span>
				</div>
				<div className='mb-3'>
					<label className='text-sm text-gray-800'>Amount</label>
					<input
						value={amount.value}
						type='number'
						onChange={(e) => dispatch({ type: 'AMOUNT', payload: { value: e.target.value } })}
						placeholder='Item cost'
						className='w-full bg-slate-100 px-2 py-1 outline-none'
					/>
					<span className='text-sm text-red-500'>{amount.error}</span>
				</div>
				<button
					onClick={handleCreateExpense}
					className='mt-8 w-full rounded-md bg-emerald-500 py-1 text-center font-medium duration-300 active:scale-95'
				>
					Add Expense
				</button>
			</div>
		</div>,
		document.body
	)
}

interface Props {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

interface T {
	name: { value: string; error?: string }
	amount: { value: string; error?: string }
}

interface A {
	type: 'NAME' | 'AMOUNT' | 'RESET'
	payload: { value: string; error?: string }
}
