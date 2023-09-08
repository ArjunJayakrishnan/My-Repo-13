import { useContext, useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { search } from "../redux/inputSlice";
import { getCountryData } from "../api/apiCountries";
import { select } from "../redux/filterSlice";
import { WholeContext } from "./AppLayout";

function InputField() {
	const [searched, setSearched] = useState("");
	const [errorDivShown, setErrorDivShown] = useState(false);
	const dispatch = useDispatch();
	const { theme } = useContext(WholeContext);
	function handleSearched(e) {
		e.preventDefault();
		if (errorDivShown) return;
		dispatch(search(searched));
		dispatch(select(""));
		setSearched("");
	}

	useEffect(
		function () {
			getCountryData(
				searched !== ""
					? searched.charAt(0).toUpperCase() + searched.slice(1).toLowerCase()
					: "Germany"
			)
				.then(() => {
					setErrorDivShown(false);
				})
				.catch(() => {
					setErrorDivShown(true);
				});
		},
		[searched, setErrorDivShown]
	);
	const classNameForm =
		"w-[100%] mt-6 h-11 flex items-center mx-auto rounded gap-2 pl-3";
	const classNameInput =
		"h-[100%] w-[100%] px-2 rounded-e-none rounded-r-sm focus:outline-none border-slate-600 border-l-[0.5px]";
	return (
		<>
			<form
				className={
					theme === "dark"
						? classNameForm + " bg-slate-600"
						: classNameForm + " bg-white shadow-xl backdrop-blur-2xl"
				}
				onSubmit={handleSearched}
			>
				<button>
					<HiSearch color={theme === "dark" ? "white" : "grey"} />
				</button>
				<input
					placeholder="Search for a country..."
					className={
						theme === "dark"
							? classNameInput + " bg-slate-600 caret-white text-white"
							: classNameInput + " bg-white caret-slate-600 text-slate-600"
					}
					value={searched}
					onChange={(e) => setSearched(e.target.value)}
				></input>
			</form>
			{errorDivShown && (
				<div className="text-red-500 self-start">wrong country name ! </div>
			)}
		</>
	);
}

export default InputField;
