import React, { FC } from 'react'
import Logo from '@/shared/Logo'
import Navigation from '@/shared/Navigation/Navigation'
import SearchDropdown from './SearchDropdown'
import ButtonPrimary from '@/shared/ButtonPrimary'
import MenuBar from '@/shared/MenuBar'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import Link from 'next/link'
// cookie.js
import Cookies from 'js-cookie'

export interface MainNav1Props {
	className?: string
}

const MainNav1: FC<MainNav1Props> = ({ className = '' }) => {
	const handleLogout = () => {
		Cookies.remove('sbh-token')
		localStorage.removeItem('verifyEmail')
		window.location.href = '/login'
	}
	const isLogin = () => {
		const token = Cookies.get('sbh-token')
		return token !== undefined && token !== null
	}

	
	return (
		<div className={`nc-MainNav1 relative z-10 ${className}`}>
			<div className="relative flex h-20 justify-between px-4 lg:container">
				<div className="hidden flex-1 justify-start gap-x-4 sm:gap-x-10 md:flex">
					<Logo className="w-24 self-center" />
					<Navigation />
				</div>
				<div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden gap-x-0.5 xl:flex">
						<ul className='nc-Navigation relative hidden lg:flex lg:flex-wrap lg:gap-x-1'>
							<li className='menu-item flex items-center'>
								<Link
									rel="noopener noreferrer"
									className="inline-flex items-center rounded-full px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 xl:px-5 xl:text-base"
									href={'/register'}
								>
									Became a Member
								</Link>
							</li>
							<li className='menu-item flex items-center'>
								<Link
									rel="noopener noreferrer"
									className="inline-flex items-center rounded-full px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 xl:px-5 xl:text-base"
									href={'/register'}
								>
									Member Login
								</Link>
							</li>
						</ul>

						{
							isLogin() ? (
								<ButtonPrimary className="self-center" onClick={handleLogout}>
									Logout
								</ButtonPrimary>
							) : (
								<ButtonPrimary className="self-center" href="/login">
									More
								</ButtonPrimary>
							)
						}

{/* 
						<ButtonPrimary className="self-center" href="/login">
							More
						</ButtonPrimary> */}
					</div>

					<div className="flex items-center xl:hidden">
						<MenuBar />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav1
