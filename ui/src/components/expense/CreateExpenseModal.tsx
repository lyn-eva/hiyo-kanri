import { EXPENSE } from '../types'
import { Dispatch, SetStateAction, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { useMutation, useQueryClient } from 'react-query'
import { createExpenseFn } from '.'
import { AnimatePresence, motion } from 'framer-motion'
import CreatableCombo from '../util/CreatableCombo'
import { setHour } from '../../util'
import LoadingCircle from '../util/LoadingCircle'

const reducerFunc = (state: T, { type, payload }: A) => {
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
	const { open, setOpen, date, isToday } = props
	const [{ name, amount }, dispatch] = useReducer(reducerFunc, defaultForm)

	const uqc = useQueryClient()

	const { mutateAsync: createExpense, isLoading } = useMutation(createExpenseFn, {
		onSuccess: async (expense) => {
			uqc.setQueriesData<EXPENSE[]>(['expenses'], (expenses) => [...(expenses ?? []), expense])
			setOpen(false)
		},
	})

	const handleCreateExpense = async () => {
		if (!name.value) return dispatch({ type: 'NAME', payload: { value: '', error: 'Name must not be empty' } })
		// prettier-ignore
		if (Number(amount.value) < 0) return dispatch({ type: 'AMOUNT', payload: { value: amount.value, error: 'Amount must not be a negative number' } })
		if (amount.value === '')
			return dispatch({ type: 'AMOUNT', payload: { value: '', error: 'Amount must not be empty' } })
		await createExpense({
			amount: +amount.value,
			name: name.value,
			createdAt: isToday ? undefined : setHour(date.getTime(), 23, 59, 59).toISOString(),
			userId: 'neon',
		})
		dispatch({ type: 'RESET', payload: { value: '' } })
	}

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					onClick={() => setOpen(false)}
					className='fixed top-0 right-0 grid h-screen w-full place-items-center bg-emerald-100 bg-opacity-50'
					exit={{ opacity: 0 }}
				>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						className='expand-animation w-11/12 max-w-[36rem] rounded-md bg-white p-5 shadow-md'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
					>
						<h2 className='mb-3 text-center text-xl font-medium'>Create a new expense</h2>
						<div className='mb-3'>
							<label className='text-sm text-gray-800'>Name</label>
							<input
								value={name.value}
								onChange={(e) => dispatch({ type: 'NAME', payload: { value: e.target.value } })}
								placeholder='Item name'
								className='me-inputbox'
							/>
							<span className='text-sm text-red-500'>{name.error}</span>
						</div>
						<div className='mb-3'>
							<label className='text-sm text-gray-800'>Amount</label>
							<input
								value={amount.value}
								onChange={(e) => dispatch({ type: 'AMOUNT', payload: { value: e.target.value } })}
								placeholder='Item cost'
								className='me-inputbox'
								type='number'
							/>
							<span className='text-sm text-red-500'>{amount.error}</span>
						</div>
						<div>
							<label className='text-sm text-gray-800'>Tags</label>
							<CreatableCombo id='tag-input' />
						</div>
						<button
							onClick={handleCreateExpense}
							className='mt-8 w-full rounded-md bg-emerald-500 py-[6px] text-center font-medium duration-300 active:scale-95'
						>
							{isLoading ? <LoadingCircle /> : `Add Expense ${isToday ? '' : `for ${date.toLocaleDateString()}`}`}
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

interface Props {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	date: Date
	isToday: boolean
}

interface T {
	name: { value: string; error?: string }
	amount: { value: string; error?: string }
}

interface A {
	type: 'NAME' | 'AMOUNT' | 'RESET'
	payload: { value: string; error?: string }
}
