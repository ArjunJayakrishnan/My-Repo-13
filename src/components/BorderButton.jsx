import PropTypes from "prop-types";
import { useSelector } from "react-redux";

BorderButton.propTypes = {
	children: PropTypes.string,
	theme: PropTypes.string,
};

function BorderButton({ children }) {
	const theme = useSelector((state) => state.mode.theme);
	const className = "w-19 px-2 py-1 shadow-xl backdrop-blur-2xl";
	return (
		<button
			onClick={(e) => e.preventDefault()}
			className={
				theme === "dark"
					? className + " bg-slate-600 text-white border-black"
					: className + " bg-white text-slate-600 font-[600] border-white"
			}
		>
			{children}
		</button>
	);
}

export default BorderButton;
