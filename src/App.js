import Sidebar from "./components/Sidebar/Sidebar"
import { Routes, Route } from "react-router-dom"

function App() {
	return (
		<Routes>
			<Route index element={<Sidebar selected={"home"} />} />
			<Route path="/home" element={<Sidebar selected={"home"} />} />
			<Route path="/my-workouts" element={<Sidebar selected={"my-workouts"} />} />
			<Route path="/analytics" element={<Sidebar selected={"analytics"} />} />
			<Route path="/settings" element={<Sidebar selected={"settings"} />} />
		</Routes>
	)
}

export default App
