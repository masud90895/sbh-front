import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { Fragment } from 'react'
import Avatar from '@/shared/Avatar'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import Link from 'next/link'
import {
	FavouriteIcon,
	HelpSquareIcon,
	Idea01Icon,
	Logout03Icon,
	Task01Icon,
	UserSharingIcon,
} from '@/components/Icons'
import T from '@/utils/getT'
interface Props {
	className?: string
}

export default function AvatarDropdown({ className = '' }: Props) {
	return (
		<>
			<Popover className={`AvatarDropdown relative flex ${className}`}>
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex h-10 w-10 items-center justify-center self-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 sm:h-12 sm:w-12`}
						>
							<Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" />
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute -end-10 top-full z-10 w-screen max-w-[260px] px-4 sm:end-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
										<div className="flex items-center gap-x-3">
											<Avatar sizeClass="w-12 h-12" />

											<div className="flex-grow">
												<h4 className="font-semibold">Eden Smith</h4>
												<p className="mt-0.5 text-xs">Los Angeles, CA</p>
											</div>
										</div>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 1 --------------------- */}
										<Link
											href={'/account'}
											className="-m-3 flex items-center rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<UserSharingIcon />
											</div>
											<div className="ms-4">
												<p className="text-sm font-medium">
													{T['Header']['AvatarDropDown']['My Account']}
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/author'}
											className="-m-3 flex items-center rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<Task01Icon />
											</div>
											<div className="ms-4">
												<p className="text-sm font-medium">
													{T['Header']['AvatarDropDown']['My bookings']}
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/account-savelists'}
											className="-m-3 flex items-center rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<FavouriteIcon />
											</div>
											<div className="ms-4">
												<p className="text-sm font-medium">
													{T['Header']['AvatarDropDown']['Wishlist']}
												</p>
											</div>
										</Link>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 2 --------------------- */}
										<div className="-m-3 flex items-center justify-between rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
											<div className="flex items-center">
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													<Idea01Icon />
												</div>
												<div className="ms-4">
													<p className="text-sm font-medium">
														{T['Header']['AvatarDropDown']['Dark theme']}
													</p>
												</div>
											</div>
											<SwitchDarkMode2 />
										</div>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/#'}
											className="-m-3 flex items-center rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<HelpSquareIcon />
											</div>
											<div className="ms-4">
												<p className="text-sm font-medium">
													{T['Header']['AvatarDropDown']['Help']}
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/#'}
											className="-m-3 flex items-center rounded-lg p-2 hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<Logout03Icon />
											</div>
											<div className="ms-4">
												<p className="text-sm font-medium">
													{T['Header']['AvatarDropDown']['Logout']}
												</p>
											</div>
										</Link>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		</>
	)
}
