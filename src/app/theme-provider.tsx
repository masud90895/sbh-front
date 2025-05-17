'use client'

import store from '@/redux/app/store'
import { APIProvider } from '@vis.gl/react-google-maps'
import { Provider } from 'react-redux'

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Provider store={store}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
				{children}
			</APIProvider>
		</Provider>
	)
}
