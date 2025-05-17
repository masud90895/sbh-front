import React, { FC, useState } from 'react'

interface Props {
	dayOfMonth: number
	date?: Date | undefined
	status?: 'available' | 'reserved' | 'blocked'
	error?: string | null
}

const DatePickerCustomDay: FC<Props> = ({ dayOfMonth, date, status = 'available', error }) => {
	const [showTooltip, setShowTooltip] = useState(false)

	const getStatusStyles = () => {
		const baseStyles = 'react-datepicker__day_span rounded-full transition-all duration-200'
		
		switch (status) {
			case 'reserved':
				return `${baseStyles} bg-red-100 text-red-600 cursor-not-allowed`
			case 'blocked':
				return `${baseStyles} bg-yellow-100 text-yellow-600 cursor-not-allowed`
			case 'available':
				return `${baseStyles} hover:bg-green-100 hover:text-green-600 cursor-pointer`
			default:
				return baseStyles
		}
	}

	const getTooltipMessage = () => {
		if (error) return error
		switch (status) {
			case 'reserved':
				return 'This date is already reserved'
			case 'blocked':
				return 'This date is blocked'
			default:
				return 'Available for booking'
		}
	}

	return (
		<div className="relative">
			<span 
				className={getStatusStyles()}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				{dayOfMonth}
			</span>
			{showTooltip && (
				<div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform rounded-md bg-gray-900 px-2 py-1 text-xs text-white">
					{getTooltipMessage()}
					<div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rotate-45 bg-gray-900"></div>
				</div>
			)}
		</div>
	)
}

export default DatePickerCustomDay
