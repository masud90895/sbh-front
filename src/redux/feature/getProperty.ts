import { api } from "../api/api";


export type IPropertyResponse = {
				data: {
					closedOnArrival:string,
					closedOnDeparture:string,
					date:string,
					id:number,
					isAvailable:number,
					isProcessed:number,
					maximumStay:number,
					minimumStay:number,
					price:number,
					status:"available" | "reserved" | "blocked"
				}[]
			}

const getPropertySlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getProperty: builder.query({
			query: (query) => {
				const params = new URLSearchParams(query).toString();
				return {
					url: `/listings?${params}`,
					method: "GET",
				};
			},
			providesTags: ["property"],
		}),
		// property single calendar
		getPropertySingleCalendar: builder.query<
			IPropertyResponse,
			string
		>({
			query: (id) => ({
				url: `/listings/${id}/calendar`,
				method: "GET",
			}),
			providesTags: ["property"],
		}),
	}),
})

export const { 
	useGetPropertyQuery,
	useGetPropertySingleCalendarQuery
	
} = getPropertySlice;