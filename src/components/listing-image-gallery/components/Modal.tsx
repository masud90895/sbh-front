'use client'

import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import useKeypress from 'react-use-keypress'
import { getNewParam } from '../ListingImageGallery'
import type { ListingGalleryImage } from '../utils/types'
import SharedModal from './SharedModal'
import { Route } from 'next'

export default function Modal({
	images,
	onClose,
}: {
	images: ListingGalleryImage[]
	onClose?: () => void
}) {

	let overlayRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const router = useRouter()
	const thisPathname = usePathname()
	const photoId = searchParams?.get('photoId')
	let index = Number(photoId)

	const [direction, setDirection] = useState(1)
	const [curIndex, setCurIndex] = useState(index)

	function handleClose() {
		onClose && onClose()
	}

	function changePhotoId(newVal: number) {
		if (newVal > index) {
			setDirection(document.dir === 'rtl' ? -1 : 1)
		} else {
			setDirection(document.dir === 'rtl' ? 1 : -1)
		}

		setCurIndex(newVal)
		router.push(`${thisPathname}/?${getNewParam({ value: newVal })}` as Route)
	}

	useKeypress('ArrowRight', () => {
		if (document.dir === 'rtl') {
			if (index > 1) {
				changePhotoId(index - 1)
			}
		} else {
			if (index + 1 < images.length) {
				changePhotoId(index + 1)
			}
		}
	})

	useKeypress('ArrowLeft', () => {
		if (document.dir === 'rtl') {
			if (index + 1 < images.length) {
				changePhotoId(index + 1)
			}
		} else if (index > 1) {
			changePhotoId(index - 1)
		}
	})

	return (
		<>
			<Dialog
				static
				open={true}
				onClose={handleClose}
				initialFocus={overlayRef}
				className="fixed inset-0 z-50 flex items-center justify-center"
			>
				<motion.div
					ref={overlayRef}
					key="backdrop"
					className="fixed inset-0 z-30 bg-black"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				/>
				<SharedModal
					index={curIndex}
					direction={direction}
					images={images}
					changePhotoId={changePhotoId}
					closeModal={handleClose}
					currentPhoto={images?.find((img) => img.id === curIndex)}
					navigation={true}
				/>
			</Dialog>
		</>
	)
}
