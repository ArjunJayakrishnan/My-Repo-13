import { useContext } from "react";
import { WholeContext } from "./AppLayout";

function EmptyMessage() {
	const { theme } = useContext(WholeContext);
	const className =
		"my-10 gap-5 text-center tablet:text-lg laptop:text-2xl font-semibold self";
	return (
		<div
			className={
				theme === "dark"
					? className + " text-white"
					: className + " text-slate-600"
			}
		>
			TYPE IN SOMETHING OR SELECT YOUR FILTER...
		</div>
	);
}

export default EmptyMessage;
