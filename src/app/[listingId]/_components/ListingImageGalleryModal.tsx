import LikeSaveBtns from '@/components/LikeSaveBtns';
import Modal from '@/components/listing-image-gallery/components/Modal';
import { ListingGalleryImage } from '@/components/listing-image-gallery/utils/types';
import { useLastViewedPhoto } from '@/components/listing-image-gallery/utils/useLastViewedPhoto';
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useRef } from 'react';

export const getNewParam = ({
	paramName = 'photoId',
	value,
}: {
	paramName?: string
	value: string | number
}) => {
	let params = new URLSearchParams(document.location.search)
	params.set(paramName, String(value))
	return params.toString()
}

const ListingImageGalleryModal = ({
	isShowModal,
	handleClose,
	images,
}: {
	isShowModal: boolean,
	handleClose: () => void,
	images: ListingGalleryImage[],
}) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const thisPathname = usePathname()
	const photoId = searchParams?.get('photoId')
	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

	const lastViewedPhotoRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		// This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
		if (lastViewedPhoto && !photoId) {
			lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
			setLastViewedPhoto(null)
		}
	}, [photoId, lastViewedPhoto, setLastViewedPhoto])


	return (
		<Transition appear show={isShowModal} as={Fragment}>
				<Dialog as="div" className="relative z-40" onClose={handleClose}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-white" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 xl:px-10">
							<button
								className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-0"
								onClick={handleClose}
							>
								<ArrowLeftIcon className="h-6 w-6 rtl:rotate-180" />
							</button>
							<LikeSaveBtns />
						</div>

						<div className="flex min-h-full items-center justify-center pt-0 text-center sm:p-4">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-5"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-5"
							>
								<DialogPanel className="mx-auto w-full max-w-screen-lg transform p-4 pt-0 text-left transition-all">
									<div>
										{photoId && (
											<Suspense>
												<Modal
													images={images}
													onClose={() => {
														// @ts-ignore
														setLastViewedPhoto(photoId)
														let params = new URLSearchParams(document.location.search)
														params.delete('photoId')
														router.push(`${thisPathname}/?${params.toString()}` as Route)
													}}
												/>
											</Suspense>
										)}

										<div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
											{images?.map(({ id, url }) => (
												<div
													key={id}
													onClick={() => {
														const newPathname = getNewParam({ value: id })
														router.push(`${thisPathname}/?${newPathname}` as Route)
													}}
													ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
													className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg focus:outline-none"
												>
													<Image
														alt="chisfis listing gallery "
														className="rounded-lg brightness-90 transition will-change-auto focus:outline-none group-hover:brightness-110"
														style={{
															transform: 'translate3d(0, 0, 0)',
														}}
														src={url}
														width={720}
														height={480}
														sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px"
													/>
												</div>
											))}
										</div>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
	);
};

export default ListingImageGalleryModal;