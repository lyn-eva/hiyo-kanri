import React from 'react'

export default function Input(props: Props) {
	return <input placeholder='Item name' {...props} className='w-full bg-slate-100 px-2 py-1 outline-none' />
}

interface Props {
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	type?: React.HTMLInputTypeAttribute
}
