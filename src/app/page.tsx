
import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionVideos from '@/components/SectionVideos'
import ListingCard from '@/shared/ListingCard'
import HeaderFilter from '@/components/HeaderFilter'

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'New Yourk',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Singapore',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Paris',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'London',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Tokyo',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Maldives',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Italy',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
]

const listingList = async () => {
	try {
		const getListingData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`, {
			cache: 'no-store',
		});
		const listingData = await getListingData.json();
		return listingData?.data;
	} catch {
		return [];
	}
}

async function PageHome() {
	const data = await listingList();

	console.log(data,"Listing Data")


	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />
			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pb-16 lg:pt-16" />
				{/* SECTION 1 */}
				<SectionSliderNewCategories categories={DEMO_CATS} />
				<div className="nc-SectionGridFeaturePlaces relative">
					<div className="">
						<HeaderFilter
							subHeading={'Popular places to stay that Chisfis recommends for you'}
							heading={'Featured places to stay'}
						/>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
						{
							data?.map((item: any) => {
								return (
									<ListingCard key={item} item={item} />
								)
							})
						}

					</div>
				</div>
				<SectionVideos />
			</div>
		</main>
	)
}

export default PageHome
