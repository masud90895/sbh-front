import { Bathtub02Icon, BedSingle01Icon, MeetingRoomIcon } from "@/components/Icons";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import { MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

const ListingInfo = ({data}: any) => {
	return (
		<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge name={data?.bookingcomPropertyRoomName ?? 'Apartment'} />
					<LikeSaveBtns />
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					{data?.name ?? 'Listing Name'}
				</h2>

				{/* 3 */}
				<div className="flex items-center gap-x-4">
					<StartRating point={data?.averageReviewRating ?? '4.9'} />
					<span>·</span>
					<div className="flex items-center">
						<MapPinIcon className="h-5 w-5" />
						<span className="ms-1"> {data?.street ?? 'Address'}</span>
					</div>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between gap-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:gap-x-12">
					<div className="flex items-center gap-x-3">
						<UsersIcon className="h-6 w-6" />
						<span className="">
							{data?.guestsIncluded ?? '0'} <span className="hidden sm:inline-block">guests</span>
						</span>
					</div>
					<div className="flex items-center gap-x-3">
						<BedSingle01Icon className="h-6 w-6" />
						<span>
							{data?.bedsNumber ?? '0'} <span className="hidden sm:inline-block">beds</span>
						</span>
					</div>
					<div className="flex items-center gap-x-3">
						<Bathtub02Icon className="h-6 w-6" />
						<span>
							{data?.bathroomsNumber ?? '0'} <span className="hidden sm:inline-block">baths</span>
						</span>
					</div>
					<div className="flex items-center gap-x-3">
						<MeetingRoomIcon className="h-6 w-6" />
						<span>
							{data?.bedroomsNumber ?? '0'} <span className="hidden sm:inline-block">bedrooms</span>
						</span>
					</div>
				</div>
			</div>
	);
};

export default ListingInfo;