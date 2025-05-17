'use client'

import React, { FC, useEffect, useState, ReactNode } from 'react'
import Heading from '@/shared/Heading'
import Nav from '@/shared/Nav'
import NavItem from '@/shared/NavItem'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import T from '@/utils/getT'

export interface HeaderFilterProps {
	heading?: string
	subHeading?: string
}

const HeaderFilter: FC<HeaderFilterProps> = ({
	subHeading,
	heading
}) => {
	return (
		<div className="relative mb-8 flex flex-col">
			<div className="flex items-center justify-between">
				<Heading desc={subHeading}>{heading}</Heading>
				<span className="hidden flex-shrink-0 sm:block">
					<ButtonSecondary href="/listing-stay" className="!leading-none">
						<div className="flex items-center justify-center">
							<span>View all</span>
							<ArrowRightIcon className="ms-3 h-5 w-5 rtl:rotate-180" />
						</div>
					</ButtonSecondary>
				</span>
			</div>
		</div>
	)
}

export default HeaderFilter
