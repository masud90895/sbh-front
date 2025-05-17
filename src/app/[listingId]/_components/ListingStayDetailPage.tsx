'use client'

import { useState } from 'react'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Route } from 'next'
import T from '@/utils/getT'
import {
	Calendar01Icon,
	Comment01Icon,
	Timer02Icon,
} from '@/components/Icons'
import StayDatesRangeInput from '../../(listing-detail)/listing-stay-detail/StayDatesRangeInput'
import GuestsInput from '../../(listing-detail)/listing-stay-detail/GuestsInput'
import SectionDateRange from '../../(listing-detail)/SectionDateRange'
import ListingInfo from './ListingInfo'
import ListingDetails from './ListingDetails'
import ListingAmenities from './ListingAmenities'
import ListingLocation from './ListingLocation'
import ListingImageGallery from './ListingImageGallery'
import ListingReviews from './ListingReviews'
import { useGetPropertySingleCalendarQuery } from '@/redux/feature/getProperty'

const ListingStayDetailPage = ({data}: any) => {
	const search = useParams()
	const listingId = Array.isArray(search?.listingId) ? search.listingId[0] : search?.listingId

	const {data:calender} = useGetPropertySingleCalendarQuery(listingId)
		console.log(calender)

	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false)

	const thisPathname = usePathname()
	const router = useRouter()

	function closeModalAmenities() {
		setIsOpenModalAmenities(false)
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true)
	}

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}


	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setError(null)

		if (start && end) {
			const diffTime = Math.abs(end.getTime() - start.getTime())
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

			if (diffDays < 2) {
				setError('Minimum stay duration is 2 days')
				return
			}
			if (diffDays > 28) {
				setError('Maximum stay duration is 28 days')
				return
			}

			// Check if all dates in range are available
			const allDatesAvailable = checkDateRangeAvailability(start, end)
			if (!allDatesAvailable) {
				setError('Selected dates contain unavailable days')
				return
			}
		}

		setStartDate(start)
		setEndDate(end)
	}

	const checkDateRangeAvailability = (start: Date, end: Date) => {
		if (!calender?.data) return true

		const startTime = start.getTime()
		const endTime = end.getTime()

		for (let time = startTime; time <= endTime; time += 24 * 60 * 60 * 1000) {
			const date = new Date(time)
			const dateStr = date.toISOString().split('T')[0]
			const calendarEntry = calender.data.find(entry => entry.date === dateStr)
			
			if (!calendarEntry || calendarEntry.status !== 'available') {
				return false
			}
		}
		return true
	}

	const isDateAvailable = (date: Date) => {
		if (!calender?.data) return true
		
		const dateStr = date.toISOString().split('T')[0]
		const calendarEntry = calender.data.find(entry => entry.date === dateStr)
		
		return calendarEntry?.status === 'available'
	}

	const getDateStatus = (date: Date) => {
		if (!calender?.data) return 'available'
		
		const dateStr = date.toISOString().split('T')[0]
		const calendarEntry = calender.data.find(entry => entry.date === dateStr)
		
		return calendarEntry?.status || 'available'
	}





	
	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Refund 50% of the booking value when customers cancel the room
						within 48 hours after successful booking and 14 days before the
						check-in time. <br />
						Then, cancel the room 14 days before the check-in time, get a 50%
						refund of the total amount paid (minus the service fee).
					</span>
				</div>
			</div>
		)
	}

	const renderSidebar = () => {
		




		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						AED {data?.price}
						<span className="ms-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
					</span>
					<StartRating point={data?.averageReviewRating ?? '4.9'} />
				</div>

				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput 
						className="z-[11] flex-1" 
						calendarData={calender} 
						startDate={startDate}
						endDate={endDate}
						onChangeDate={onChangeDate}
						isDateAvailable={isDateAvailable}
						getDateStatus={getDateStatus}
						error={error}
						
					/>
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>$119 x 3 night</span>
						<span>$357</span>
					</div>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>Service charge</span>
						<span>$0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>$199</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary href={'/checkout'}>
					{T['common']['Reserve']}
				</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="ListingDetailPage">
			<div className="ListingDetailPage__content container">
				<div className="nc-ListingStayDetailPage">
					{/*  HEADER */}
					{/* <header className="rounded-md sm:rounded-xl">
						<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
							<div
								className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
								onClick={handleOpenModalImageGallery}
							>
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={PHOTOS[0]}
									alt=""
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
								/>
								<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
							</div>
							{PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
								<div
									key={index}
									className={`relative overflow-hidden rounded-md sm:rounded-xl ${
										index >= 3 ? 'hidden sm:block' : ''
									}`}
								>
									<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
										<Image
											fill
											className="rounded-md object-cover sm:rounded-xl"
											src={item || ''}
											alt=""
											sizes="400px"
										/>
									</div>

									<div
										className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
										onClick={handleOpenModalImageGallery}
									/>
								</div>
							))}

							<button
								className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
								onClick={handleOpenModalImageGallery}
							>
								<Squares2X2Icon className="h-5 w-5" />
								<span className="ml-2 text-sm font-medium text-neutral-800">
									{T['common']['Show all photos']}
								</span>
							</button>
						</div>
					</header> */}
					<ListingImageGallery imageGallery={data?.listingImages} />

					{/* MAIN */}
					<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
						{/* CONTENT */}
						<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pe-10 xl:w-2/3">
							<ListingInfo data={data} />
							<ListingDetails data={data} />
							<ListingAmenities data={data} />
							<SectionDateRange
							calendarData={calender}
							startDate={startDate}
							endDate={endDate}
							onChangeDate={onChangeDate}
							isDateAvailable={isDateAvailable}
							getDateStatus={getDateStatus}
							error={error}
							
							/>
							<ListingReviews />
							<ListingLocation latitude={data?.lat} longitude={data?.lng} address={data?.address} />
							{renderSection8()}
						</div>

						{/* SIDEBAR */}
						<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
							<div className="sticky top-28">{renderSidebar()}</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default ListingStayDetailPage
