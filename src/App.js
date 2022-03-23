import Sidebar from "./components/Sidebar/Sidebar"
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home/Home"
import MyWorkouts from "./routes/MyWorkouts/MyWorkouts"

function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="/my-workouts" element={<MyWorkouts />} />
			<Route path="/analytics" element={<Sidebar selected={"analytics"} />} />
			<Route path="/settings" element={<Sidebar selected={"settings"} />} />
		</Routes>
	)
}

export default App
