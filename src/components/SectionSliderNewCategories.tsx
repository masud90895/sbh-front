'use client'

import React, { FC, useRef } from 'react'
import { TaxonomyType } from '@/data/types'
import CardCategory3 from '@/components/CardCategory3'
import CardCategory4 from '@/components/CardCategory4'
import CardCategory5 from '@/components/CardCategory5'
import Heading from '@/shared/Heading'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'
import useSnapSlider from '@/hooks/useSnapSlider'

export interface SectionSliderNewCategoriesProps {
	className?: string
	itemClassName?: string
	heading?: string
	subHeading?: string
	categories?: TaxonomyType[]
	categoryCardType?: 'card3' | 'card4' | 'card5'
	itemPerRow?: 4 | 5
	sliderStyle?: 'style1' | 'style2'
}

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Nature House',
		taxonomy: 'category',
		count: 17288,
		thumbnail:
			'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Wooden house',
		taxonomy: 'category',
		count: 2118,
		thumbnail:
			'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Houseboat',
		taxonomy: 'category',
		count: 36612,
		thumbnail:
			'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Farm House',
		taxonomy: 'category',
		count: 18188,
		thumbnail:
			'https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Dome House',
		taxonomy: 'category',
		count: 22288,
		thumbnail:
			'https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Dome House',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/14534337/pexels-photo-14534337.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Wooden house',
		taxonomy: 'category',
		count: 2118,
		thumbnail:
			'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '8',
		href: '/listing-stay-map',
		name: 'Wooden Dome',
		taxonomy: 'category',
		count: 515,
		thumbnail:
			'https://images.pexels.com/photos/9039238/pexels-photo-9039238.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
	},
]

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
	heading = 'Suggestions for discovery',
	subHeading = 'Popular places to recommends for you',
	className = '',
	itemClassName = 'w-[17rem] lg:w-[25%] xl:w-[20%]',
	categories = DEMO_CATS,
	categoryCardType = 'card3',
	sliderStyle = 'style1',
}) => {
	const sliderRef = useRef<HTMLDivElement>(null)
	const { scrollToNextSlide, scrollToPrevSlide, isAtEnd, isAtStart } =
		useSnapSlider({ sliderRef: sliderRef as React.RefObject<HTMLDivElement> })

	const renderCard = (item: TaxonomyType) => {
		switch (categoryCardType) {
			case 'card3':
				return <CardCategory3 taxonomy={item} />
			case 'card4':
				return <CardCategory4 taxonomy={item} />
			case 'card5':
				return <CardCategory5 taxonomy={item} />
			default:
				return <CardCategory3 taxonomy={item} />
		}
	}

	return (
		<div className={`nc-SectionSliderNewCategories ${className}`}>
			<Heading desc={subHeading} isCenter={sliderStyle === 'style2'}>
				{heading}
			</Heading>

			<div className="relative flow-root">
				<div
					ref={sliderRef}
					className="hiddenScrollbar relative -mx-2 flex snap-x snap-mandatory overflow-x-auto lg:-mx-3.5"
				>
					{categories.map((item, indx) => (
						<div
							className={`mySnapItem shrink-0 snap-start px-2 lg:px-3.5 ${itemClassName}`}
							key={indx}
						>
							{renderCard(item)}
						</div>
					))}
				</div>

				<PrevBtn
					style={{ visibility: isAtStart ? 'hidden' : 'visible' }}
					onClick={scrollToPrevSlide}
					className="absolute -start-3 top-[40%] z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-start-6 xl:h-12 xl:w-12"
				/>

				<NextBtn
					style={{ visibility: isAtEnd ? 'hidden' : 'visible' }}
					onClick={scrollToNextSlide}
					className="absolute -end-3 top-[40%] z-[1] h-9 w-9 -translate-y-1/2 text-lg xl:-end-6 xl:h-12 xl:w-12"
				/>
			</div>
		</div>
	)
}

export default SectionSliderNewCategories
