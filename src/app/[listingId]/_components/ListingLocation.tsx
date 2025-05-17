import React from 'react';

const ListingLocation = ({
	latitude,
	longitude,
	address
}:{
	latitude: number,
	longitude: number,
	address: string
}) => {
	const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;
	return (
		<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{address}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src={mapSrc}
						></iframe>
					</div>
				</div>
			</div>
	);
};

export default ListingLocation;