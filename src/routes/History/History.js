import React from "react"
import styles from "./History.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState, useEffect } from "react"
import Workout from "../MyWorkouts/Workout/Workout"
import axios from "axios"

export default function History() {
	const [history, setHistory] = useState([])

	const getHistory = async (startDate, endDate) => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/workouts?startDate=${startDate}&endDate=${endDate}`)
		setHistory(res.data)
	}

	const removeWorkoutFromHistory = async (workoutId) => {
		const username = "DovivoD"
		const res = await axios.delete(`http://localhost:8080/sessions/remove-history/${workoutId}?username=${username}`)
		const startDate = "2021-03-30"
		const endDate = "2022-04-20"
		getHistory(startDate, endDate)
	}

	useEffect(() => {
		const startDate = "2021-03-30"
		const endDate = "2022-04-20"
		getHistory(startDate, endDate)
	}, [])

	return (
		<div className={styles.container}>
			<Sidebar selected={"history"} />
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<div className={styles.headerIcon}></div>
					<div className={styles.headerTitle}>History</div>
				</div>
				{history.map((workout) => (
					<Workout exercises={workout.exercises} name={""} id={workout["_id"]} duration={workout.duration} removeWorkout={() => removeWorkoutFromHistory(workout["_id"])} />
				))}
			</div>
		</div>
	)
}
