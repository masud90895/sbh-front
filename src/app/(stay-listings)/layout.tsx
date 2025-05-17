'use client'

import BackgroundSection from '@/components/BackgroundSection'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import React, { ReactNode, useState } from 'react'
import SectionHeroArchivePage from '../(server-components)/SectionHeroArchivePage'
import { useSearchParams } from 'next/navigation'
import { useGetPropertyQuery } from '@/redux/feature/getProperty'

const Layout = ({ children }: { children: ReactNode }) => {
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



console.log(query, 'query');
	const {data, isLoading, isError} = useGetPropertyQuery(query);

	console.log(data, 'data')


	return (
		<div className="nc-ListingStayPage relative">
			<BgGlassmorphism />

			{/* SECTION HERO */}
			<div className="container pb-24 pt-10 lg:pb-28 lg:pt-16">
				<SectionHeroArchivePage searchParamsCity={searchParamsCity} data={data}
					defaultValue={{
						city: searchParamsCity ?? undefined,
						availabilityDateStart: searchParamsStart ?? undefined,
						availabilityDateEnd: searchParamsEnd ?? undefined,
						guestAdults: guestAdults ?? undefined,
						
					}}
				/>
			</div>

			{children}

			<div className="container overflow-hidden">
				{/* SECTION 1 */}
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategories
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
					/>
				</div>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />

				{/* SECTION */}
				<div className="relative mb-24 py-16 lg:mb-28">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div>
			</div>
		</div>
	)
}

export default Layout
