import ListingStayDetailPage from "./_components/ListingStayDetailPage";

const listingDetails = async (id: string) => {
	try {
		const getListingData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings/${id}`, {
			cache: 'no-store',
		});
		const listingData = await getListingData.json();
		return listingData;
	} catch {
		return {};
	}
}

const ListingStayDetails = async ({params}: {
	params: {
		listingId: string
	}
}) => {
	const data = await listingDetails(params?.listingId);

	return (
		<ListingStayDetailPage data={data} />
	);
};

export default ListingStayDetails;