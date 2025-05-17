'use client'

import React, { FC, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Link from 'next/link'
import T from '@/utils/getT'
import { useLoginMutation } from '@/redux/feature/Auth'
import { useRouter } from 'next/navigation'

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
	const [email, setEmail] = useState('')
	const [login, { isLoading }] = useLoginMutation()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Email:', email)
		try {
			const result :any= await login({ email }).unwrap()
			console.log('Login result:', result)
			if (result.status === 'success') {
				// Store email in localStorage for verify page
				localStorage.setItem('verifyEmail', email)
				router.push('/verify')
			}else if (result.status === 'info') {
				// Handle info status
				alert(result.data?.message || 'Info: ' + result.message)
			}else{
				// Handle other statuses
				alert(result.data?.message || 'An error occurred')
			}
		} catch (error:any) {
			console.error('Login failed:', error)
			alert(error?.data?.message || 'Login failed')
		}
	}

	return (
		<div className="nc-PageLogin">
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					{T['login']['Login']}
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								{T['login']['Email address']}
							</span>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="example@example.com"
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
						{T['login']['New user?']} {` `}
						<Link href="/signup" className="font-semibold underline">
							{T['login']['Create an account']}
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageLogin
