'use client'

import React, { Fragment, useState, FC } from 'react'
import DatePicker from 'react-datepicker'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import ClearDataButton from '../ClearDataButton'
import T from '@/utils/getT'

export interface ExperiencesDateSingleInputProps {
	className?: string
	fieldClassName?: string
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
	className = '',
	fieldClassName = ' nc-hero-field-padding--small',
}) => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/03/01'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/03/16'))

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	const renderInput = () => {
		return (
			<>
				<div className="flex-grow text-start">
					<span className="block font-semibold xl:text-base">
						{startDate?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
						}) || T['HeroSearchForm']['Date']}
						{endDate
							? ' - ' +
								endDate?.toLocaleDateString('en-US', {
									month: 'short',
									day: '2-digit',
								})
							: ''}
					</span>
					<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
						{startDate ? 'Date' : T['HeroSearchForm']['Add dates']}
					</span>
				</div>
			</>
		)
	}

	return (
		<>
			<Popover
				className={`ExperiencesDateSingleInput relative flex ${className}`}
			>
				{({ open }) => (
					<>
						<PopoverButton
							className={`relative z-10 flex flex-1 ${fieldClassName} items-center gap-x-3 focus:outline-none ${
								open ? 'nc-hero-field-focused--2' : ''
							}`}
						>
							{renderInput()}
							{startDate && open && (
								<ClearDataButton onClick={() => onChangeDate([null, null])} />
							)}
						</PopoverButton>

						{open && (
							<div className="absolute -inset-x-0.5 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
						)}

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-1/2 top-full z-10 mt-3 w-screen max-w-sm -translate-x-1/2 px-4 sm:px-0 lg:max-w-3xl">
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
										renderCustomHeader={(p) => (
											<DatePickerCustomHeaderTwoMonth {...p} />
										)}
										renderDayContents={(day, date) => (
											<DatePickerCustomDay dayOfMonth={day} date={date} />
										)}
									/>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}

export default ExperiencesDateSingleInput
