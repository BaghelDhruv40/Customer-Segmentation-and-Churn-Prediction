import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";
import LandingPage from "./pages/LandingPage";
import Segmentation from "./pages/Segmentation";
function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/segmentation" element={<Segmentation />} />
			</Routes>
		</Router>
	);
}

export default App;
