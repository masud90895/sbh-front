import { Poppins } from 'next/font/google'
import SiteHeader from './(client-components)/(Header)/SiteHeader'
import ClientCommons from './ClientCommons'
import '@/app/globals.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import FooterNav from '@/components/FooterNav'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import Footer2 from '@/components/Footer2'

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'First class luxury holiday homes in Dubai',
	description: 'The homepage showcases premium short-term rental properties in Dubai, emphasizing luxury accommodations with Burj Khalifa views, multiple bedrooms, and amenities like swimming pools and air conditioning.',
	keywords: 'First class luxury holiday homes in Dubai',
	icons: {
		icon: '/favicon.ico',
	}
}

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: any
}) {
	return (
		<html lang="en" className={poppins.className}>
			<ThemeProvider>
				<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
					<div>
						<SiteHeader />
						{children}
						<FooterNav />
						<Footer2 />
					</div>

					<ClientCommons />
				</body>
			</ThemeProvider>
		</html>
	)
}
