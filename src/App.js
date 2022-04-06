import Sidebar from "./components/Sidebar/Sidebar"
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home/Home"
import MyWorkouts from "./routes/MyWorkouts/MyWorkouts"
// import { useEffect, useState, createContext } from "react"
// import axios from "axios"

function App() {
	// const UserContext = createContext(null)
	// const [userId, setUserId] = useState()

	// const getMyId = async (username) => {
	// 	const response = await axios.get(`http://localhost:8080/users/info/${username}`)
	// 	const id = response.data[0]._id
	// 	setUserId(id)
	// 	console.log(id)
	// }

	// useEffect(() => {
	// 	getMyId("DovivoD")
	// }, [])

	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="my-workouts" element={<MyWorkouts />}>
				<Route path="new-workout" />
			</Route>
			<Route path="/analytics" element={<Sidebar selected={"analytics"} />} />
			<Route path="/history" element={<Sidebar selected={"history"} />} />
			<Route path="/settings" element={<Sidebar selected={"settings"} />} />
		</Routes>
	)
}

export default App
