'use client'

import React, { FC, Fragment, useState } from 'react'
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ButtonPrimary from '@/shared/ButtonPrimary'
import GuestsInput from '@/app/(client-components)/(HeroSearchForm2Mobile)/GuestsInput'
import T from '@/utils/getT'

interface ModalSelectGuestsProps {
	renderChildren?: (p: { openModal: () => void }) => React.ReactNode
}

const ModalSelectGuests: FC<ModalSelectGuestsProps> = ({ renderChildren }) => {
	const [showModal, setShowModal] = useState(false)

	// FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
	//
	function closeModal() {
		setShowModal(false)
	}

	function openModal() {
		setShowModal(true)
	}

	const renderButtonOpenModal = () => {
		return renderChildren ? (
			renderChildren({ openModal })
		) : (
			<button onClick={openModal}>{T['common']['Select Date']}</button>
		)
	}

	return (
		<>
			{renderButtonOpenModal()}
			<Transition appear show={showModal} as={Fragment}>
				<Dialog
					as="div"
					className="HeroSearchFormMobile__Dialog relative z-50"
					onClose={closeModal}
				>
					<div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
						<div className="flex h-full">
							<TransitionChild
								as={Fragment}
								enter="ease-out transition-transform"
								enterFrom="opacity-0 translate-y-52"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in transition-transform"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-52"
							>
								<DialogPanel className="relative flex h-full flex-1 flex-col justify-between overflow-hidden">
									<>
										<div className="absolute start-4 top-4">
											<button
												className="focus:outline-none focus:ring-0"
												onClick={closeModal}
											>
												<XMarkIcon className="h-5 w-5 text-black dark:text-white" />
											</button>
										</div>

										<div className="flex flex-1 flex-col overflow-hidden p-1 pt-12">
											<div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-neutral-800">
												<div className="flex flex-1 animate-[myblur_0.4s_ease-in-out] flex-col overflow-auto transition-opacity">
													<div className="relative z-10 flex flex-1 overflow-hidden">
														<GuestsInput />
													</div>
												</div>
											</div>
										</div>
										<div className="flex justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
											<button
												type="button"
												className="flex-shrink-0 font-semibold underline"
											>
												{T['common']['Clear']}
											</button>
											<ButtonPrimary
												sizeClass="px-6 py-3 !rounded-xl"
												onClick={() => {
													closeModal()
												}}
											>
												{T['common']['Save']}
											</ButtonPrimary>
										</div>
									</>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ModalSelectGuests
