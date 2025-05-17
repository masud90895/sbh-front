'use client'

import { FC, useState } from 'react'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import MapContainer from '@/components/MapContainer'
import { MapIcon } from '@heroicons/react/24/outline'
import T from '@/utils/getT'
import { useSearchParams } from 'next/navigation'
import { useGetPropertyQuery } from '@/redux/feature/getProperty'
import ListingCard from '@/shared/ListingCard'

const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)
export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
	const searchParamsCity = useSearchParams().get('city');
	const searchParamsStart = useSearchParams().get('availabilityDateStart');
	const searchParamsEnd = useSearchParams().get('availabilityDateEnd');
	const searchParamsGuestAdults = useSearchParams().get('guestAdults');
	const [value, setValue] = useState(searchParamsCity);
	const [startDate, setStartDate] = useState<Date | null>(
		searchParamsStart ? new Date(searchParamsStart) : null
	)
	const [endDate, setEndDate] = useState<Date | null>(
		searchParamsEnd? new Date(searchParamsEnd) : null
	);
	const [guestAdults, setGuestAdults] = useState<number | null>(
		searchParamsGuestAdults ? parseInt(searchParamsGuestAdults) : null
	);


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

	if(guestAdults) {
		query["numberOfGuests"] = guestAdults;
	} else {
		delete query["numberOfGuests"];
	}


	const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
	const [showFullMapFixed, setShowFullMapFixed] = useState(false)

	
const {data, isLoading, isError} = useGetPropertyQuery(query);

	console.log(data, 'data',isLoading, isError)



	return (
		<div>
			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
					<Heading2 className="!mb-8"
						heading={`Stays in ${value}`}
						subHeading={
							<div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
								<span className="font-medium">
									{startDate && new Date(startDate).toLocaleDateString('en-US', {
										month: 'short',
										day: '2-digit',
									})}
								</span>
								<span className="text-neutral-300 dark:text-neutral-600">-</span>
								<span className="font-medium">
									{endDate && new Date(endDate).toLocaleDateString('en-US', {
										month: 'short',
										day: '2-digit',
									})}
								</span>
							</div>
						}
					/>
					<div className="mb-8 lg:mb-11">
						{/* <TabFilters /> */}
					</div>
					<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6">
						{isLoading ? (
							<>
								{[...Array(6)].map((_, index) => (
									<div key={index} className="animate-pulse">
										<div className="h-[300px] rounded-2xl bg-neutral-200 dark:bg-neutral-700"></div>
										<div className="mt-4 space-y-3">
											<div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700"></div>
											<div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700"></div>
										</div>
									</div>
								))}
							</>
						) : data?.length === 0 ? (
							<div className="col-span-full flex flex-col items-center justify-center py-16">
								<div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
									<svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
								<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
									No Properties Found
								</h3>
								<p className="text-neutral-500 dark:text-neutral-400 text-center max-w-sm">
									We couldn't find any properties matching your search. Try adjusting your filters or explore other locations.
								</p>
							</div>
						) :
						isError ? (
							<div className="col-span-full flex flex-col items-center justify-center py-16">
								<div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
									<svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
									</svg>
								</div>
								<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
									Something went wrong
								</h3>
								<p className="text-neutral-500 dark:text-neutral-400 text-center max-w-sm">
									We're having trouble loading the properties. Please try again later or contact support if the problem persists.
								</p>
							</div>
						) :
						
						
						(
							data?.map((item: any) => (
								<div
									key={item.id}
									onMouseEnter={() => setCurrentHoverID((_) => item.id)}
									onMouseLeave={() => setCurrentHoverID((_) => -1)}
								>
									<ListingCard item={item} />
								</div>
							))
						)}
					</div>
					{/* <div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div> */}
				</div>

				{!showFullMapFixed && (
					<div
						className="fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 cursor-pointer items-center justify-center gap-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl md:bottom-8 xl:hidden"
						onClick={() => setShowFullMapFixed(true)}
					>
						<MapIcon className="h-5 w-5" />
						<span>{T['common']['Show map']}</span>
					</div>
				)}

				{/* MAPPPPP */}
				<div
					className={`xl:static xl:block xl:flex-1 ${
						showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
					}`}
				>
					{showFullMapFixed && (
						<ButtonClose
							onClick={() => setShowFullMapFixed(false)}
							className="absolute left-3 top-3 z-50 h-10 w-10 rounded-xl bg-white shadow-lg"
						/>
					)}

					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
							currentHoverID={currentHoverID}
							DEMO_DATA={DEMO_STAYS}
							listingType="stay"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionGridHasMap
