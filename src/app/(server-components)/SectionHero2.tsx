import React, { FC } from 'react'
import imagePng from '@/images/hero-right-3.png'
import Image from 'next/image'

export interface SectionHero2Props {
	className?: string
	children?: React.ReactNode
}

const SectionHero2: FC<SectionHero2Props> = ({ className = '', children }) => {
	return (
		<div className={`nc-SectionHero2 relative ${className}`}>
			<div className="absolute inset-y-0 end-0 w-5/6 flex-grow xl:w-3/4">
				<Image fill className="object-cover" src={imagePng} alt="hero" />
			</div>
			<div className="relative py-14 lg:py-20">
				<div className="relative inline-flex">
					<div className="absolute inset-y-0 end-20 w-screen bg-primary-500 md:end-52"></div>
					<div className="relative inline-flex max-w-3xl flex-shrink-0 flex-col items-start space-y-8 py-16 text-white sm:space-y-10 sm:py-20 lg:py-24">
						{children ? (
							children
						) : (
							<h2 className="text-4xl font-semibold !leading-[110%] md:text-5xl xl:text-7xl">
								Find Your Best <br /> Smart Real Estate
							</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SectionHero2
