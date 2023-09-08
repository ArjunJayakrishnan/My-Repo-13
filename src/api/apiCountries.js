export async function getAllCountryData() {
	try {
		const res = await fetch(`https://restcountries.com/v3.1/all`);
		if (!res.ok) throw new Error("something wrong bruv in all");
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getCountryData(countryName = "India") {
	const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
	if (!res.ok) {
		throw new Error("something wrong bruv in getCountryData");
	}

	const data = await res.json();
	return {
		flag: data[0].flags.svg,
		name: data[0].name.common,
		population: data[0].population,
		region: data[0].region,
		capital: data[0].capital[0],
		nativeName: data[0].name.common,
		subRegion: data[0].subregion,
		tld: data[0].tld[0],
	};
}

export async function getRegionDataFromJson(region) {
	const randomNumber = Math.random() * 10;
	const res = await fetch(`/data.json`);
	if (!res.ok)
		throw new Error("something wrong bruv from getRegionDataFromJson");
	const data = await res.json();
	const sameRegionArray = data
		.filter((el) => {
			return el.region === region;
		})
		.slice(randomNumber, randomNumber + 10);
	return { array: sameRegionArray };
}

export async function getCountryDataFromJson(countryName) {
	try {
		const res = await fetch(`/data.json`);
		if (!res.ok)
			throw new Error("something wrong bruv in getCountryDataFromJson");
		const data = await res.json();
		const languagesOfCountry = data
			.find((el) => {
				return el.name === countryName;
			})
			.languages.map((el) => {
				return el.name;
			});
		const bordersOfCountry = data
			.find((el) => {
				return el.name === countryName;
			})
			.borders.map((el) => {
				return el;
			});
		return { languages: languagesOfCountry, borders: bordersOfCountry };
	} catch {
		(error) => console.log(error);
	}
}
