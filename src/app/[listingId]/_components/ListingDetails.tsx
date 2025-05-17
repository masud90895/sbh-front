import React from 'react';

const ListingDetails = ({data}:any) => {
	return (
		<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<span>
						{data?.description ?? 'Description'}
					</span>
				</div>
			</div>
	);
};

export default ListingDetails;