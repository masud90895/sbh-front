import { NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Book Now',
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Top Properties',
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Locations',
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Experience',
	},
	{
		id: ncNanoId(),
		href: '/',
		name: 'Attractions',
	}
]
