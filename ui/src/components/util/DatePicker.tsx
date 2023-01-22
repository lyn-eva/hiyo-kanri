import DatePicker from 'react-date-picker'
import { CalendarIcon } from '../icons'

export default function Datepicker(props: Props) {
	const { date, setDate, onClick } = props
	return (
		<DatePicker onChange={setDate} value={date} calendarIcon={<CalendarIcon />} clearIcon={null} onClickDay={onClick} />
	)
}

interface Props {
	date: Date
	setDate: React.Dispatch<React.SetStateAction<Date>>
	onClick: (v: Date) => void
}
