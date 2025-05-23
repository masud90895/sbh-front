import React from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import T from '@/utils/getT'

const AccountBilling = () => {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">
				{T['accountPage']['Payments & payouts']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="max-w-2xl">
				<span className="block text-xl font-semibold">
					{T['accountPage']['Payout methods']}
				</span>
				<br />
				<span className="block text-neutral-700 dark:text-neutral-300">
					{` When you receive a payment for a reservation, we call that payment
              to you a "payout." Our secure payment system supports several
              payout methods, which can be set up below. Go to FAQ.`}
					<br />
					<br />
					To get paid, you need to set up a payout method Airbnb releases
					payouts about 24 hours after a guest’s scheduled check-in time. The
					time it takes for the funds to appear in your account depends on your
					payout method. Learn more
				</span>
				<div className="pt-10">
					<ButtonPrimary>{T['accountPage']['Add payout method']}</ButtonPrimary>
				</div>
			</div>
		</div>
	)
}

export default AccountBilling
