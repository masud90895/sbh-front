import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ListingImageGalleryModal from './ListingImageGalleryModal';
import { useLastViewedPhoto } from '@/components/listing-image-gallery/utils/useLastViewedPhoto';

type IImageGallery = {
	id: number
	caption: string
	bookingEngineCaption: any
	airbnbCaption: string
	vrboCaption: any
	url: string
	sortOrder: number
}

const ListingImageGallery = ({imageGallery}: {
	imageGallery: IImageGallery[]
}) => {
	const searchParams = useSearchParams()
	const photoId = searchParams?.get('photoId')
	const modal = searchParams?.get('modal')
	const isShowModal = modal === 'PHOTO_TOUR_SCROLLABLE'
	const router = useRouter()
	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

	const lastViewedPhotoRef = useRef<HTMLDivElement>(null)
	const thisPathname = usePathname()
	useEffect(() => {
		// This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
		if (lastViewedPhoto && !photoId) {
			lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
			setLastViewedPhoto(null)
		}
	}, [photoId, lastViewedPhoto, setLastViewedPhoto])

	const handleClose = () => {
		let params = new URLSearchParams(document.location.search)
		params.delete('modal')
		router.push(`${thisPathname}/?${params.toString()}` as Route)
	}
	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}
	return (
		<>
			<div className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={imageGallery?.[0]?.url}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{imageGallery?.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
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
									src={item?.url || ''}
									alt=""
									sizes="400px"
									priority={true}
								/>
							</div>

							{/* OVERLAY */}
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
							Show all photos ({imageGallery?.length ?? '0'})
						</span>
					</button>
				</div>
			</div>
			<ListingImageGalleryModal
				isShowModal={isShowModal}
				handleClose={handleClose}
				images={imageGallery?.map((item) => {
					return {
						id: item?.sortOrder,
						url: item?.url,
					}
				})}
			/>
		</>
	);
};

export default ListingImageGallery;