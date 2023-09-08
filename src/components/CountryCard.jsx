import { getCountryData } from "../api/apiCountries";
import { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/inputSlice";
import PropTypes from "prop-types";
import { WholeContext } from "./AppLayout";

const CountryCard = memo(function CountryCard({ selected }) {
	const { setCardsPageShown, theme } = useContext(WholeContext);
	const [searchedCountryInfo, setSearchedCountryInfo] = useState({});
	const dispatch = useDispatch();
	const searched = useSelector((state) => {
		return state.input.country;
	});

	useEffect(
		function () {
			getCountryData(
				searched !== ""
					? searched.charAt(0).toUpperCase() + searched.slice(1).toLowerCase()
					: selected
			)
				.then((res) => {
					setSearchedCountryInfo(res);
				})
				.catch(() => {
					return;
				});
		},
		[searched, selected]
	);
	const className = "flex flex-col w-[250px] mx-auto my-10 gap-5 font-semibold";

	return (
		<div
			className={
				theme === "dark"
					? className + " bg-slate-600 text-white"
					: className + " bg-white text-slate-600 shadow-xl backdrop-blur-2xl"
			}
			onClick={() => {
				setCardsPageShown(false);
				if (selected === undefined) dispatch(search(searched));
				else dispatch(search(selected));
			}}
		>
			<img
				src={searchedCountryInfo.flag}
				className="border-slate-600 border-b-[1.5px]"
			/>
			<div className="px-5 pb-7">
				<h3 className="mb-3 text-lg font-extrabold">
					{searchedCountryInfo.name}
				</h3>
				<p>
					Popolution:{" "}
					{searchedCountryInfo.population > 1000000
						? (searchedCountryInfo.population / 1000000).toFixed(1) + "M"
						: searchedCountryInfo.population}
				</p>
				<p>Region: {searchedCountryInfo.region}</p>
				<p>Capital: {searchedCountryInfo.capital}</p>
			</div>
		</div>
	);
});

CountryCard.propTypes = {
	selected: PropTypes.string,
	setCardsPageShown: PropTypes.func,
};

export default CountryCard;
