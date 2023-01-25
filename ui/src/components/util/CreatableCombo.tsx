import { useCallback, useRef, useState } from 'react'
import _ from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import XIcon from '../icons/XIcon'

const getPosition = (id: string) => {
	const p = document.getElementById(id)?.getBoundingClientRect()
	if (!p) return {}
	return { top: p.height + p.top, width: p.width, left: p.left }
}

export default function CreatableCombo(props: Props) {
	const { id } = props
	const [selected, setSelected] = useState<string[]>([])
	const [options, setOptions] = useState(['School Fee', 'Commute', 'Phone bill'])
	const [input, setInput] = useState('')
	const [open, setOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { top, left, width } = getPosition(id)

	const openIt = () => setOpen(true)

	const closeIt = () => setOpen(false)

	const focusInput = () => inputRef.current?.focus()

	const handleClickOption = (i: number) => () => {
		setSelected((p) => [...p, options[i]])
		setOptions((p) => p.filter((e, n) => n !== i))
		closeIt()
		focusInput()
	}

	const handeRemoveTag = (i: number) => () => {
		setSelected((p) => p.filter((e, n) => n !== i))
		setOptions((p) => [...p, selected[i]])
		focusInput()
	}

	const handleCreateTag = useCallback(() => {
		if (!input.trim()) return
		setSelected((p) => [...p, input])
		setInput('')
		focusInput()
	}, [input])

	return (
		<div className='relative'>
			<div id={id} className='bg-slate-100 flex gap-1 items-start p-1 flex-wrap'>
				{_.map(selected, (tag, i) => (
					<div
						key={tag}
						className='px-1 bg-emerald-400 rounded-sm flex items-center gap-x-1'
						onClick={handeRemoveTag(i)}
					>
						{tag}
						<XIcon className='h-4 w-4 mt-[1px]' />
					</div>
				))}
				<div className='grow'>
					<input
						className='me-inputbox p-0 px-1'
						placeholder='choose a tag'
						onChange={(e) => setInput(e.target.value)}
						value={input}
						onClick={openIt}
						onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
						ref={inputRef}
					/>
				</div>
			</div>

			{createPortal(
				<AnimatePresence>
					{open && (
						<div
							className='fixed bottom-0 right-0 w-screen min-h-fit h-screen'
							onClick={closeIt}
							style={{ height: `calc(100vh - ${top}px)` }}
						>
							<motion.ul
								className='absolute bg-slate-100 w-full mt-2 py-2 shadow-md rounded-md overflow-hidden'
								style={{ width, left }}
								initial={{ y: -5 }}
								animate={{ y: 0 }}
								exit={{ opacity: 0, y: -5 }}
							>
								{input.trim() && (
									<li className='px-2 py-1 cursor-default hover:bg-slate-200 border-b-[1px]' onClick={handleCreateTag}>
										<b>Create</b> {input}
									</li>
								)}

								{options.length ? (
									_.map(options, (option, i) => (
										<li
											key={option}
											className={`cursor-default px-2 py-1 hover:bg-slate-200 ${i > 0 ? 'border-t-[1px]' : ''}`}
											onClick={handleClickOption(i)}
										>
											{option}
										</li>
									))
								) : input ? null : (
									<li className='px-2 text-emerald-900'>type to create a new tag ...</li>
								)}
							</motion.ul>
						</div>
					)}
				</AnimatePresence>,
				document.body
			)}
		</div>
	)
}

interface Props {
	id: string
}
