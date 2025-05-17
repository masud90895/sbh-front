'use client'

import React, { Fragment, useState, FC } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
import T from '@/utils/getT'
import { IPropertyResponse } from '@/redux/feature/getProperty'

export interface StayDatesRangeInputProps {
	calendarData: IPropertyResponse | undefined,
	startDate: Date | null,
	endDate: Date | null,
	onChangeDate: (dates: [Date | null, Date | null]) => void,
	isDateAvailable: (date: Date) => boolean,
	getDateStatus: (date: Date) => "available" | "reserved" | "blocked",
	error: string | null,
	className?: string,
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
	className = 'flex-1',
	calendarData,
	startDate,
	endDate,
	onChangeDate,
	isDateAvailable,
	getDateStatus,
	error,
}) => {
	// const [startDate, setStartDate] = useState<Date | null>(null)
	// const [endDate, setEndDate] = useState<Date | null>(null)
	// const [error, setError] = useState<string | null>(null)

	// const onChangeDate = (dates: [Date | null, Date | null]) => {
	// 	const [start, end] = dates
	// 	setError(null)

	// 	if (start && end) {
	// 		const diffTime = Math.abs(end.getTime() - start.getTime())
	// 		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

	// 		if (diffDays < 1) {
	// 			setError('Minimum stay duration is 1 days')
	// 			return
	// 		}
	// 		if (diffDays > 28) {
	// 			setError('Maximum stay duration is 28 days')
	// 			return
	// 		}

	// 		// Check if all dates in range are available
	// 		const allDatesAvailable = checkDateRangeAvailability(start, end)
	// 		if (!allDatesAvailable) {
	// 			setError('Selected dates contain unavailable days')
	// 			return
	// 		}
	// 	}

	// 	setStartDate(start)
	// 	setEndDate(end)
	// }

	// const checkDateRangeAvailability = (start: Date, end: Date) => {
	// 	if (!calendarData?.data) return true

	// 	const startTime = start.getTime()
	// 	const endTime = end.getTime()

	// 	for (let time = startTime; time <= endTime; time += 24 * 60 * 60 * 1000) {
	// 		const date = new Date(time)
	// 		const dateStr = date.toISOString().split('T')[0]
	// 		const calendarEntry = calendarData.data.find(entry => entry.date === dateStr)
			
	// 		if (!calendarEntry || calendarEntry.status !== 'available') {
	// 			return false
	// 		}
	// 	}
	// 	return true
	// }

	// const isDateAvailable = (date: Date) => {
	// 	if (!calendarData?.data) return true
		
	// 	const dateStr = date.toISOString().split('T')[0]
	// 	const calendarEntry = calendarData.data.find(entry => entry.date === dateStr)
		
	// 	return calendarEntry?.status === 'available'
	// }

	// const getDateStatus = (date: Date) => {
	// 	if (!calendarData?.data) return 'available'
		
	// 	const dateStr = date.toISOString().split('T')[0]
	// 	const calendarEntry = calendarData.data.find(entry => entry.date === dateStr)
		
	// 	return calendarEntry?.status || 'available'
	// }

	const renderInput = () => {
		return (
			<>
				<div className="text-neutral-300 dark:text-neutral-400">
					<CalendarIcon className="h-5 w-5 lg:h-7 lg:w-7" />
				</div>
				<div className="flex-grow text-start">
					<span className="block font-semibold xl:text-lg">
						{startDate?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
						}) || 'Add dates'}
						{endDate
							? ' - ' +
								endDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								})
							: ''}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{T['HeroSearchForm']['CheckIn']} - {T['HeroSearchForm']['CheckOut']}
					</span>
					{error && (
						<span className="mt-1 block text-sm font-medium text-red-500">
							{error}
						</span>
					)}
				</div>
			</>
		)
	}

	return (
		<Popover className={`StayDatesRangeInput relative z-10 flex ${className}`}>
			{({ open }) => (
				<>
					<PopoverButton
						className={`relative flex flex-1 items-center gap-x-3 p-3 focus:outline-none ${
							open ? 'shadow-lg' : ''
						}`}
					>
						{renderInput()}
						{startDate && open && (
							<ClearDataButton onClick={() => onChangeDate([null, null])} />
						)}
					</PopoverButton>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute end-0 start-auto top-full z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl xl:-end-10">
							<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
								<DatePicker
									selected={startDate}
									onChange={onChangeDate}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									monthsShown={2}
									showPopperArrow={false}
									inline
									filterDate={isDateAvailable}
									renderCustomHeader={(p) => (
										<DatePickerCustomHeaderTwoMonth {...p} />
									)}
									renderDayContents={(day, date) => (
										<DatePickerCustomDay 
											dayOfMonth={day} 
											date={date} 
											status={date ? getDateStatus(date) : 'available'}
											error={error}
										/>
									)}
								/>
								<div className="mt-4 flex items-center justify-center gap-4">
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-green-500"></div>
										<span className="text-sm">Available</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-red-500"></div>
										<span className="text-sm">Reserved</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="h-4 w-4 rounded-full bg-yellow-500"></div>
										<span className="text-sm">Blocked</span>
									</div>
								</div>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default StayDatesRangeInput
