'use client'
import StaySearchForm from './(stay-search-form)/StaySearchForm'
const HeroSearchForm = (
	{
		defaultValue,
	}: {
		defaultValue?: {
			city?: string,
			availabilityDateStart?: string,
			availabilityDateEnd?: string,
		}
	}
) => {

	return (
		<div
			className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0`}
		>
			<StaySearchForm defaultValue={defaultValue} />
		</div>
	)
}

export default HeroSearchForm
