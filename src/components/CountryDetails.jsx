import { getCountryData, getCountryDataFromJson } from "../api/apiCountries";
import { memo, useContext, useEffect, useState } from "react";
import BorderButton from "./BorderButton";
import { WholeContext } from "./AppLayout";

const CountryDetails = memo(function CountryDetails() {
	const { searched, theme } = useContext(WholeContext);

	const [searchedCountryDetails, setSearchedCountryDetails] = useState({});

	const [searchedCountryDetailsFromJson, setSearchedCountryDetailsFromJson] =
		useState({});

	useEffect(
		function () {
			getCountryData(
				searched.charAt(0).toUpperCase() + searched.slice(1).toLowerCase()
			).then((res) => {
				setSearchedCountryDetails(res);
			});
		},
		[searched]
	);

	useEffect(
		function () {
			getCountryDataFromJson(
				searched.charAt(0).toUpperCase() + searched.slice(1).toLowerCase()
			).then((res) => {
				setSearchedCountryDetailsFromJson(res);
			});
		},
		[searched]
	);
	const className =
		"flex flex-col w-[300px] items-center mx-auto my-10 tablet:flex-row tablet:gap-22 tablet:my-0 tablet:w-[90%] tablet:justify-around";

	return (
		<div
			className={
				theme === "dark"
					? className + " text-white"
					: className + " text-slate-600 shadow-xl backdrop-blur-2xl"
			}
		>
			<img
				src={searchedCountryDetails?.flag}
				className="w-[90%] tablet:w-[50%]"
			/>
			<div className="px-5 py-7 tablet:flex tablet:flex-col">
				<h3 className="mb-3 text-2xl font-extrabold">
					{searchedCountryDetails?.name}
				</h3>
				<div className="[&>p]:mb-1 w-[100%] mb-5 font-semibold text-lg">
					<p>
						Native Name:{" "}
						<span className="font-thin">
							{searchedCountryDetails?.nativeName}
						</span>
					</p>
					<p>
						Popolution:{" "}
						<span className="font-thin">
							{searchedCountryDetails?.population > 1000000
								? (searchedCountryDetails.population / 1000000).toFixed(1) + "M"
								: searchedCountryDetails.population}
						</span>
					</p>
					<p>
						Region:{" "}
						<span className="font-thin">{searchedCountryDetails?.region}</span>
					</p>
					<p>
						Sub-region:{" "}
						<span className="font-thin">
							{searchedCountryDetails?.subRegion}
						</span>
					</p>
					<p>
						Capital:{" "}
						<span className="font-thin">{searchedCountryDetails?.capital}</span>
					</p>
				</div>
				<div className="[&>p]:mb-1 w-[100%] mb-5 font-semibold">
					<p>
						Top level domain:{" "}
						<span className="font-thin">{searchedCountryDetails?.tld}</span>
					</p>
					<p>
						Languages:{" "}
						<span className="font-thin">
							{searchedCountryDetailsFromJson?.languages ? (
								searchedCountryDetailsFromJson.languages.join(", ")
							) : (
								<span>Not available 😔</span>
							)}
						</span>
					</p>
				</div>
				<p className="mb-2 font-semibold">Border-Countries:</p>
				{searchedCountryDetailsFromJson?.borders !== undefined ? (
					<div className="w-[100%] flex flex-wrap gap-1 items-center ">
						{searchedCountryDetailsFromJson?.borders.map((el, i) => {
							return <BorderButton key={i}>{el}</BorderButton>;
						})}
					</div>
				) : (
					<p>Not available 😔</p>
				)}
			</div>
		</div>
	);
});

export default CountryDetails;
