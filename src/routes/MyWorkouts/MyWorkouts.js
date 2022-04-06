import React from "react"
import styles from "./MyWorkouts.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Workout from "./Workout/Workout"
import { motion } from "framer-motion"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"
import NewWorkout from "./NewWorkout/NewWorkout"
import axios from "axios"
import { useEffect, useState } from "react"

export default function MyWorkouts() {
	const navigate = useNavigate()
	const query = useQuery()
	const [workouts, setWorkouts] = useState([])

	const getUserSavedWorkouts = async () => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/users/info/${username}`)
		setWorkouts(res.data[0].savedWorkouts)
	}

	useEffect(() => {
		getUserSavedWorkouts()
	}, [])

	return (
		<div className={styles.container}>
			<Sidebar selected={"my-workouts"} />
			<Routes>
				<Route
					path="/"
					element={
						<motion.div animate={{ scale: 1 }} initial={query.get("button") ? { scale: 1.1 } : ""} className={styles.innerContainer}>
							<div className={styles.header}>
								<div className={styles.headerIcon}></div>
								<div className={styles.headerTitle}>My Workouts</div>
							</div>
							<motion.div
								whileHover={{
									scale: 1.1,
								}}
								className={styles.newWorkout}
								onClick={() => {
									navigate("new-workout")
								}}
							>
								<div className={styles.newWorkoutIcon}></div>
								<div className={styles.newWorkoutTitle}>Create new workout</div>
							</motion.div>
							{workouts.map((workout) => (
								<Workout exercises={workout.exercises} name={workout.name} duration={workout.duration} />
							))}
						</motion.div>
					}
				/>
				<Route path="new-workout" element={<NewWorkout />} />
			</Routes>
		</div>
	)
}
