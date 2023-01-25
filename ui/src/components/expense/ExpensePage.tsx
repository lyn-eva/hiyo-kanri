'use client'
import { useQuery } from 'react-query'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { EXPENSE } from '../types'
import { DatePicker } from '../util'
import CreateExpenseItem from './CreateExpenseModal'
import LoadingCircle from '../util/LoadingCircle'
import { getExpensesFn } from '.'

const initDate = (d: string | null) => d && new Date(new Date(d).setHours(0, 0, 0, 0))

export default function Expense() {
	const [query, setQuery] = useSearchParams()
	const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), [])
	const [date, setDate] = useState(initDate(query.get('from')) || today)
	const isToday = useMemo(() => date.getTime() === today.getTime(), [date])
	const [open, setOpen] = useState(true)
	const location = useLocation()

	const { data: expenses, isLoading, isSuccess } = useQuery<EXPENSE[]>(['expenses', location.search], getExpensesFn)

	useEffect(() => {
		if (Date.parse(query.get('from') as string) && Date.parse(query.get('to') as string)) return
		const d = new Date().toLocaleDateString()
		setQuery({ from: d, to: d })
	}, [])

	const handleDatePick = (value: Date) => {
		setDate(value)
		const d = value.toLocaleDateString()
		setQuery({ from: d, to: d })
	}

	return (
		<section className='pb-4'>
			<div className='mx-auto w-11/12 pt-2'>
				<header className='flex justify-between py-1'>
					<h1 className='text-xl font-medium'>
						<span className='px-2 bg-emerald-400'>{isToday ? 'Today' : date.toLocaleDateString()}</span>&apos;s expenses
					</h1>
					<DatePicker {...{ date, setDate }} onClick={handleDatePick} />
				</header>
				<ol className='expense-table py-2'>
					<li className='flex bg-slate-200 sticky top-0 py-1 px-2 font-medium'>
						<div className='grow'>Name</div>
						<div className=''>Price</div>
					</li>
					{isLoading ? (
						<LoadingCircle className='my-6' />
					) : !isLoading && !isSuccess ? (
						<p className='text-center my-6'>Something went wrong!</p>
					) : !expenses?.length ? (
						<p className='text-center my-6'>No expenses :)</p>
					) : (
						expenses.map(({ name, amount, id }) => (
							<li key={id} className='flex border-b-[1px] px-2 py-1 hover:bg-slate-50 duration-200 active:scale-[98%]'>
								<div className='grow'>{name}</div>
								<div className=''>{(+amount).toLocaleString()}</div>
							</li>
						))
					)}
					<li className='flex bg-slate-200 py-1 px-2 font-medium'>
						<div className=''>Count = {expenses?.length.toLocaleString()}</div>
						<div className='grow'></div>
						<div className='mr-1'>Total = </div>
						<div className=''>{expenses?.reduce((total, { amount: p }) => total + +p, 0).toLocaleString()}</div>
					</li>
				</ol>
				<div className='mt-4'>
					<button
						onClick={() => setOpen(true)}
						className='w-full rounded-md bg-emerald-500 py-1 text-center font-medium duration-300'
					>
						Add Expense {isToday ? '' : `for ${date.toLocaleDateString()}`}
					</button>
				</div>
			</div>
			<CreateExpenseItem {...{ open, setOpen, date, isToday }} />
		</section>
	)
}

// interface Props {
// 	expenses: EXPENSE[]
// }
