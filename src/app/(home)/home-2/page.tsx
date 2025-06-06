'use client'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import React from 'react'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import SectionHowItWork from '@/components/SectionHowItWork'
import BackgroundSection from '@/components/BackgroundSection'
import { TaxonomyType } from '@/data/types'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
//
import logo1 from '@/images/logos/nomal/1.png'
import logo1Dark from '@/images/logos/dark/1.png'
//
import logo2 from '@/images/logos/nomal/2.png'
import logo2Dark from '@/images/logos/dark/2.png'
//
import logo3 from '@/images/logos/nomal/3.png'
import logo3Dark from '@/images/logos/dark/3.png'
//
import logo4 from '@/images/logos/nomal/4.png'
import logo4Dark from '@/images/logos/dark/4.png'
//
import logo5 from '@/images/logos/nomal/5.png'
import logo5Dark from '@/images/logos/dark/5.png'
//
import HIW1img from '@/images/HIW2-1.png'
import HIW2img from '@/images/HIW2-2.png'
import HIW3img from '@/images/HIW2-3.png'
import HIW1imgDark from '@/images/HIW2-1-dark.png'
import HIW2imgDark from '@/images/HIW2-2-dark.png'
import HIW3imgDark from '@/images/HIW2-3-dark.png'
import rightImgPng from '@/images/our-features-2.png'

import SectionGridFeatureProperty from '../SectionGridFeatureProperty'
import SectionDowloadApp from '../SectionDowloadApp'
import SectionHero2 from '@/app/(server-components)/SectionHero2'
import Image from 'next/image'
import { useGetPropertyQuery } from '@/redux/feature/getProperty'



function PageHome2() {
	return (
		<main className="nc-PageHome2 relative overflow-hidden">
			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				<SectionHero2 className="" />

				<div className="ncSectionLogos grid grid-cols-3 gap-5 sm:gap-16 lg:grid-cols-5">
					<div className="flex items-end justify-center">
						<Image className="block dark:hidden" src={logo1} alt="logo1" />
						<Image className="hidden dark:block" src={logo1Dark} alt="logo1" />
					</div>
					<div className="flex items-end justify-center">
						<Image className="block dark:hidden" src={logo4} alt="logo4" />
						<Image className="hidden dark:block" src={logo4Dark} alt="logo4" />
					</div>
					<div className="flex items-end justify-center">
						<Image className="block dark:hidden" src={logo2} alt="logo2" />
						<Image className="hidden dark:block" src={logo2Dark} alt="logo2" />
					</div>
					<div className="flex items-end justify-center">
						<Image className="block dark:hidden" src={logo3} alt="logo3" />
						<Image className="hidden dark:block" src={logo3Dark} alt="logo3" />
					</div>

					<div className="flex items-end justify-center">
						<Image className="block dark:hidden" src={logo5} alt="logo5" />
						<Image className="hidden dark:block" src={logo5Dark} alt="logo5" />
					</div>
				</div>

				<SectionHowItWork
					data={[
						{
							id: 1,
							img: HIW1img,
							imgDark: HIW1imgDark,
							title: 'Smart search',
							desc: 'Name the area or type of home you are looking for the search bar. Our app will find you the perfect match.',
						},
						{
							id: 2,
							img: HIW2img,
							imgDark: HIW2imgDark,
							title: 'Choose property',
							desc: 'From the number of options our app will provide, you can select any property that you like to explore.',
						},
						{
							id: 3,
							img: HIW3img,
							imgDark: HIW3imgDark,
							title: 'Book you property',
							desc: 'Find a home or space from our search bar. Enter your specific location, property type and price range.',
						},
					]}
				/>

				<div className="relative py-16">
					<BackgroundSection />
					<SectionGridFeatureProperty />
				</div>

				<SectionOurFeatures type="type2" rightImg={rightImgPng} />

				<SectionDowloadApp />

				<div className="relative py-16">
					<BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox boxCard="box2" />
				</div>

				<SectionSliderNewCategories
					heading="Explore by types of stays"
					subHeading="Explore houses based on 10 types of stays"
					categoryCardType="card5"
					itemPerRow={5}
				/>

				<SectionSubscribe2 />
			</div>
		</main>
	)
}

export default PageHome2
