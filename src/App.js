import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
	return (
		<Router>
			<Routes>
				<Route index element={<Sidebar selected={"Home"} />} />
				<Route path="/my-workouts" element={<Sidebar selected={"My Workouts"} />} />
				<Route path="/analytics" element={<Sidebar selected={"Analytics"} />} />
				<Route path="/settings" element={<Sidebar selected={"Settings"} />} />
			</Routes>
		</Router>
	)
}

export default App
