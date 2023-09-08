import { HiMoon, HiSun } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../redux/modeSlice";

function Navbar() {
	const theme = useSelector((state) => state.mode.theme);
	const dispatch = useDispatch();
	function handleTheme() {
		dispatch(change(theme === "dark" ? "light" : "dark"));
	}
	const className =
		"h-16 flex justify-between items-center w-full px-1.5 mobile:px-2.5 tablet:px-3.5 laptop:px-5 border-b-[1px] border-slate-300";
	return (
		<div
			className={
				theme === "dark"
					? className + " bg-slate-600 text-white"
					: className + " bg-white text-slate-600"
			}
		>
			<h1 className="text-sm font-extrabold mobile:text-lg">
				Where in the world?
			</h1>
			<div className="flex items-center gap-1" onClick={handleTheme}>
				{theme === "dark" ? <HiMoon /> : <HiSun />}
				<p className="text-xs mobile:text-sm">
					{theme === "dark" ? "Light Mode" : "Dark mode"}
				</p>
			</div>
		</div>
	);
}

export default Navbar;
