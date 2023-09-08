import { Provider } from "react-redux";
import AppLayout from "./components/AppLayout";
import Navbar from "./components/Navbar";
import store from "./redux/store";

function App() {
	return (
		<div className="flex flex-col items-center">
			<Provider store={store}>
				<Navbar />
				<AppLayout />
			</Provider>
		</div>
	);
}

export default App;
