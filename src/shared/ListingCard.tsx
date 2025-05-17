'use client'
import BtnLikeIcon from "@/components/BtnLikeIcon";
import GallerySlider from "@/components/GallerySlider";
import StartRating from "@/components/StartRating";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ListingCard = ({
	item
}: any) => {

	

	return (
		<div className="">
									{/* <img className='object-cover rounded-lg w-full' src={item?.listingImages[0]?.url} alt="" /> */}
									<div className="relative w-full">
							<GallerySlider
								uniqueID={`StayCard_${item?.id}`}
								ratioClass="aspect-w-4 aspect-h-3 "
								galleryImgs={item?.images}
							/>
							<BtnLikeIcon className="absolute end-3 top-3 z-[1]" />
						</div>
									<Link href={`/${item.id}`}>
					<div className="mt-3 space-y-3">
					<div className="space-y-2">
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							{item?.roomType === 'entire_home' ? 'Entire Home' : 'Private Room'} · {item?.bedsNumber} beds
						</span>
						<div className="flex items-center gap-x-2">
							<h2
								className={`font-semibold capitalize text-neutral-900 dark:text-white text-base`}
							>
								<span className="line-clamp-1">{item?.name}</span>
							</h2>
						</div>
						<div className="flex items-center gap-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
								<div className=""><MapPinIcon className="h-4 w-4" aria-hidden="true" /></div>
							<span>{item?.street}</span>
						</div>
					</div>
					<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
			<div className="flex items-center justify-between">
				<span className="text-base font-semibold">
				AED {item?.price}
					{` `}
						<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span>
				</span>
				<StartRating point={item?.averageReviewRating} />
				
			</div>
					</div>
					
				</Link>
								</div>
	);
};

export default ListingCard;