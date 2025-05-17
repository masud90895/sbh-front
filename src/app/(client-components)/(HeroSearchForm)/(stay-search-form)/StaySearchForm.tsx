import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import StayDatesRangeInput from './StayDatesRangeInput'
import { useState } from 'react';

const StaySearchForm = ({
	defaultValue,
}:{
	defaultValue?: {
		city?: string,
		availabilityDateStart?: string,
		availabilityDateEnd?: string,
		guestAdults?: number,
	}
}) => {
	const [value, setValue] = useState(defaultValue?.city ?? '');
	const [startDate, setStartDate] = useState<Date | null>(
		defaultValue?.availabilityDateStart ? new Date(defaultValue.availabilityDateStart) : new Date(),
	)
	const [endDate, setEndDate] = useState<Date | null>(
		defaultValue?.availabilityDateEnd ? new Date(defaultValue.availabilityDateEnd) : new Date(),
	);

	const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(defaultValue?.guestAdults ?? 2);


	const query: Record<string, any> = {};
	if (value) {
		query.city = value;
	} else {
		delete query.city;
	}
	if (startDate) {
		query.availabilityDateStart = startDate.toISOString().split('T')[0];
	} else {
		delete query.availabilityDateStart;
	}
	if (endDate) {
		query.availabilityDateEnd = endDate.toISOString().split('T')[0];
	} else {
		delete query.availabilityDateEnd;
	}
	if(guestAdultsInputValue) {
		query.guestAdults = guestAdultsInputValue;
	} else {
		delete query.guestAdults;
	}



	return (
		<form className="relative mt-8 flex w-full rounded-full bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl">
			<LocationInput className="flex-[1.5]" value={value} setValue={setValue} />
			<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
			<StayDatesRangeInput className="flex-1"
				startDate={startDate}
				endDate={endDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
			/>
			<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
			<GuestsInput className="flex-1" buttonSubmitHref={`/listing-stay-map?${new URLSearchParams(query).toString()}`}
				guestAdultsInputValue={guestAdultsInputValue}
				setGuestAdultsInputValue={setGuestAdultsInputValue}
			/>
		</form>
	)
}

export default StaySearchForm
