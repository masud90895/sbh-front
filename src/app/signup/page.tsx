'use client'

import React, { FC, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Link from 'next/link'
import T from '@/utils/getT'
import { useRegisterMutation } from '@/redux/feature/Auth'
import { useRouter } from 'next/navigation'

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	})
	const [register, { isLoading }] = useRegisterMutation()
	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const result = await register(formData).unwrap()
			console.log('Registration result:', result)
			if (result.status === 'success' || result.status === 'info') {
				// Store email in localStorage for verify page
				localStorage.setItem('verifyEmail', formData.email)
				router.push('/verify')
			}
		} catch (error:any) {
			console.error('Registration failed:', error)
			alert(error?.data?.message || 'Registration failed')
		}
	}

	return (
		<div className={`nc-PageSignUp`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					{T['login']['Signup']}
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Name
							</span>
							<Input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="John Doe"
								className="mt-1"
								required
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								{T['login']['Email address']}
							</span>
							<Input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="example@example.com"
								className="mt-1"
								required
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Phone
							</span>
							<Input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="+1234567890"
								className="mt-1"
								required
							/>
						</label>
						<ButtonPrimary type="submit" disabled={isLoading}>
							{isLoading ? 'Sending OTP...' : T['common']['Continue']}
						</ButtonPrimary>
					</form>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						{T['login']['Already have an account?']} {` `}
						<Link href="/login" className="font-semibold underline">
							{T['login']['Sign in']}
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageSignUp
