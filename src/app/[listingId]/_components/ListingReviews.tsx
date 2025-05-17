import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import ButtonCircle from "@/shared/ButtonCircle";
import Input from "@/shared/Input";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import CommentListing from '@/components/CommentListing'
import ButtonSecondary from "@/shared/ButtonSecondary";

const ListingReviews = () => {
	return (
		<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="gap-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute end-2 top-1/2 -translate-y-1/2"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
	);
};

export default ListingReviews;