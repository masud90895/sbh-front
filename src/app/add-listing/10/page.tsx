import StayCard from '@/components/StayCard'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Route } from '@/routers/types'
import T from '@/utils/getT'

const PageAddListing10 = () => {
	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page10']['pageTitle']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page10']['pageDescription']}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div>
				<h3 className="text-lg font-semibold">
					{T['addListings']['page10']['This is your listing']}
				</h3>
				<div className="max-w-xs">
					<StayCard
						className="mt-8"
						data={{ ...DEMO_STAY_LISTINGS[0], reviewStart: 0 }}
					/>
				</div>
				<div className="mt-8 flex items-center gap-x-3">
					<ButtonSecondary href={'/add-listing/1' as Route}>
						<PencilSquareIcon className="h-5 w-5" />
						<span className="ms-3">{T['addListings']['page10']['Edit']}</span>
					</ButtonSecondary>

					<ButtonPrimary>
						<EyeIcon className="h-5 w-5" />
						<span className="ms-3">
							{T['addListings']['page10']['Preview']}
						</span>
					</ButtonPrimary>
				</div>
			</div>
			{/*  */}
		</>
	)
}

export default PageAddListing10
