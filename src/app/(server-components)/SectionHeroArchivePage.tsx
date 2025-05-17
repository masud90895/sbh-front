import React, { FC, ReactNode } from 'react'
import imagePng from '@/images/hero-right2.png'
import HeroSearchForm from '../(client-components)/(HeroSearchForm)/HeroSearchForm'
import Image, { StaticImageData } from 'next/image'
import { HomeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export interface SectionHeroArchivePageProps {
	className?: string
	listingType?: ReactNode
	rightImage?: StaticImageData,
	searchParamsCity: string | null,
	data: any[],
	defaultValue?: {
		city?: string,
		availabilityDateStart?: string,
		availabilityDateEnd?: string,
		guestAdults?: number,
	}
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
	className = '',
	listingType,
	searchParamsCity,
	rightImage = imagePng,
	data,
	defaultValue,
}) => {

	


	return (
		<div
			className={`nc-SectionHeroArchivePage relative flex flex-col ${className}`}
			data-nc-id="SectionHeroArchivePage"
		>
			<div className="flex flex-col lg:flex-row lg:items-center">
				<div className="flex flex-shrink-0 flex-col items-start space-y-6 pb-14 lg:me-10 lg:w-1/2 lg:space-y-10 lg:pb-64 xl:me-0 xl:pb-80 xl:pe-14">
					<h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl capitalize">
					{searchParamsCity ?? 'Downtown Dubai'}
					</h2>
					<div className="flex items-center text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
						<MapPinIcon className="h-5 w-5" />
						<span className="ms-2.5 capitalize">{searchParamsCity ?? 'Downtown Dubai'} </span>
						<span className="mx-5"></span>
						{listingType ? (
							listingType
						) : (
							<>
								<HomeIcon className="h-5 w-5" />
								<span className="ms-2.5">{data?.length ?? 0} properties</span>
							</>
						)}
					</div>
				</div>
				<div className="flex-grow">
					<Image
						className="w-full"
						src={rightImage}
						alt="hero"
						priority
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
					/>
				</div>
			</div>
			<div className="hidden w-full lg:flow-root">
				<div className="z-10 w-full lg:-mt-40 xl:-mt-56">
					<HeroSearchForm defaultValue={defaultValue} />
				</div>
			</div>
		</div>
	)
}

export default SectionHeroArchivePage
