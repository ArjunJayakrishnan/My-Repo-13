import { useDispatch, useSelector } from "react-redux";
import {
	Suspense,
	createContext,
	lazy,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
const Filter = lazy(() => import("./Filter"));
const Button = lazy(() => import("./Button"));
const InputField = lazy(() => import("./InputField"));
const CountryCard = lazy(() => import("./CountryCard"));
const CountryDetails = lazy(() => import("./CountryDetails"));
const EmptyMessage = lazy(() => import("./EmptyMessage"));
import { getRegionDataFromJson } from "../api/apiCountries";
import { select } from "../redux/filterSlice";
import { search } from "../redux/inputSlice";
import Loader from "./Loader";

export const WholeContext = createContext();
const AppLayout = memo(function AppLayout() {
	const [cardsPageShown, setCardsPageShown] = useState(true);
	const [cardsShown, setCardsShown] = useState([]);
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.mode.theme);
	const selected = useSelector((state) => {
		return state.filter.region;
	});

	const searched = useSelector((state) => {
		return state.input.country;
	});

	const handleClick = useCallback(
		function handleClick(e) {
			e.preventDefault();
			dispatch(search(""));
			dispatch(select(""));
			setCardsPageShown(true);
		},
		[dispatch]
	);
	useEffect(
		function () {
			if (cardsPageShown) {
				{
					getRegionDataFromJson(selected).then((res) => {
						setCardsShown(res.array);
					});
				}
			}
		},
		[selected, cardsPageShown]
	);
	const className = "flex flex-col items-center w-[100%] text-sm min-h-screen";
	const value = useMemo(() => {
		return {
			selected,
			theme,
			searched,
			setCardsPageShown,
			onClick: handleClick,
		};
	}, [handleClick, searched, selected, theme]);
	return (
		<WholeContext.Provider value={value}>
			<Suspense fallback={<Loader />}>
				<div
					className={
						theme === "dark"
							? className + " bg-[#334155]"
							: className + " bg-white"
					}
				>
					{cardsPageShown && (
						<div className="w-[90%] flex flex-col items-center">
							<InputField />
							<Filter />
							{searched === "" && cardsShown.length === 0 && <EmptyMessage />}
							<div className="flex flex-wrap gap-2 w-[100%] mx-auto">
								{searched !== "" && cardsShown.length === 0 && <CountryCard />}
								{cardsShown.length !== 0 &&
									cardsShown.map((el, i) => {
										return <CountryCard key={i} selected={el.name} />;
									})}
							</div>
						</div>
					)}

					{!cardsPageShown && (
						<div className="w-[90%] flex flex-col gap-5">
							<Button>Back</Button>
							<CountryDetails />
						</div>
					)}
				</div>
			</Suspense>
		</WholeContext.Provider>
	);
});

export default AppLayout;
