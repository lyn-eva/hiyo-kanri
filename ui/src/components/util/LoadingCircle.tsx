import React from 'react'

export default function LoadingCircle({ className }: { className?: React.ComponentProps<'div'>['className'] }) {
	return (
		<div className={className ?? 'my-2'}>
			<div className='animate-spin border-[3px] mx-auto h-5 w-5 rounded-full border-t-cyan-500'></div>
		</div>
	)
}
