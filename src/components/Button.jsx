import { HiArrowLeft } from "react-icons/hi";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import { WholeContext } from "./AppLayout";

const Button = memo(function Button({ children }) {
	const { onClick, theme } = useContext(WholeContext);
	const className =
		"flex items-center p-1.5 w-20 justify-evenly my-5 shadow-xl border-black backdrop-blur-2xl";
	return (
		<button
			onClick={onClick}
			className={
				theme === "dark"
					? className + " bg-slate-600 text-white border-black"
					: className + " bg-white text-slate-600 font-[600] border-white"
			}
		>
			<HiArrowLeft color={theme === "dark" ? "white" : "grey"} />
			{children}
		</button>
	);
});
Button.propTypes = {
	children: PropTypes.string,
};

export default Button;
