'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
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





const SectionDateRange = ({
	calendarData,
	startDate,
	endDate,
	onChangeDate,
	isDateAvailable,
	getDateStatus,
	error,
	className = 'flex-1',
}:StayDatesRangeInputProps) => {
	

	const renderSectionCheckIndate = () => {
		return (
			<div className="listingSection__wrap overflow-hidden">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Availability</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="relative">
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
					{error && (
						<div className="mt-4 text-center">
							<span className="text-sm font-medium text-red-500">
								{error}
							</span>
						</div>
					)}
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
			</div>
		)
	}

	return renderSectionCheckIndate()
}

export default SectionDateRange
