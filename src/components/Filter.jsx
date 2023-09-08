import { useDispatch } from "react-redux";
import { select } from "../redux/filterSlice";
import { useSelector } from "react-redux";
import { search } from "../redux/inputSlice";
import { useContext } from "react";
import { WholeContext } from "./AppLayout";

function Filter() {
	const { theme } = useContext(WholeContext);

	const dispatch = useDispatch();
	function handleSelect(e) {
		const selectedValue = e.target.value;
		if (selectedValue === "None") {
			dispatch(select(""));
		} else {
			dispatch(select(selectedValue));
			dispatch(search(""));
		}
	}
	const selection = useSelector((state) => {
		return state.filter.region;
	});

	const className =
		"w-[60%] mt-6 h-11 rounded pl-3 focus:outline-none pr-2 tablet:w-[40%] laptop:w-[30%] font-medium self-start";
	return (
		<select
			name="hello"
			className={
				theme === "dark"
					? className + " bg-slate-600 text-white"
					: className + " bg-white text-slate-600 shadow-xl backdrop-blur-2xl"
			}
			value={selection}
			onChange={handleSelect}
		>
			<option value="" defaultValue disabled>
				Filter by region
			</option>
			<option value="None">None</option>
			<option value="Asia">Asia</option>
			<option value="Africa">Africa</option>
			<option value="Americas">Americas</option>
			<option value="Europe">Europe</option>
			<option value="Oceania">Oceania</option>
		</select>
	);
}

export default Filter;
