'use client'

import React, { FC, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useVerifyMutation } from '@/redux/feature/Auth'
import { useRouter } from 'next/navigation'
import T from '@/utils/getT'
// cookie.js
import Cookies from 'js-cookie'



const PageVerify = () => {
    const [otp, setOtp] = useState('')
    const [verify, { isLoading }] = useVerifyMutation()
    const router = useRouter()
    const email = typeof window !== 'undefined' ? localStorage.getItem('verifyEmail') : null
    if (!email) {
        router.push('/login')
        return null
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6)
        setOtp(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length !== 6) {
            alert('Please enter a valid 6-digit OTP')
            return
        }
        try {
            const result:any = await verify({ email, otp: parseInt(otp) }).unwrap()
            console.log("result from verify", result)
            if (result.status === 'success') {
                Cookies.set('sbh-token', result.data.access_token, { expires: 7 }) // Set cookie with 7 days expiration
                localStorage.removeItem('verifyEmail')
                // router.push('/')
                window.location.href = '/'
            } else if (result.status === 'info') {
                alert(result.message || 'Info: ' + result.data?.message)
            } else {
                alert(result.data?.message || 'An error occurred')
            }
        } catch (error: any) {
            console.error('Verification failed:', error)
            alert(error?.data?.message || 'Verification failed')
        }
    }

    return (
        <div className="nc-PageVerify">
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
                    Verify OTP
                </h2>
                <div className="mx-auto max-w-md space-y-6">
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                        <label className="block">
                            <span className="text-neutral-800 dark:text-neutral-200">
                                Enter 6-digit OTP
                            </span>
                            <Input
                                type="text"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter 6-digit OTP"
                                className="mt-1"
                                maxLength={6}
                                pattern="\d{6}"
                                inputMode="numeric"
                                required
                            />
                        </label>
                        <ButtonPrimary type="submit" disabled={isLoading || otp.length !== 6}>
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </ButtonPrimary>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PageVerify