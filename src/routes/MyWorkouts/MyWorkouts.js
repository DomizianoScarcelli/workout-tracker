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
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal"

export default function MyWorkouts() {
	const navigate = useNavigate()
	const query = useQuery()
	const [workouts, setWorkouts] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [workoutToDelete, setWorkoutToDelete] = useState(null)

	const deleteSavedWorkout = async (workoutId) => {
		const username = "DovivoD"
		await axios.delete(`http://localhost:8080/users/delete/${workoutId}?username=${username}`)
		getUserSavedWorkouts()
	}

	const getUserSavedWorkouts = async () => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/users/info/${username}`)
		setWorkouts(res.data[0].savedWorkouts)
	}

	const confirmDelete = () => {
		setModalIsOpen(false)
		deleteSavedWorkout(workoutToDelete)
	}

	const discardDelete = () => {
		setModalIsOpen(false)
	}

	const showModal = (workoutId) => {
		setWorkoutToDelete(workoutId)
		setModalIsOpen(true)
	}

	const openWorkoutEditor = (workout) => {
		localStorage.setItem(
			"workoutInfo",
			JSON.stringify({
				workoutName: workout.name,
				exercises: workout.exercises,
				minutes: workout.duration,
				save: false,
			})
		)
		navigate("new-workout")
	}

	useEffect(() => {
		getUserSavedWorkouts()
	}, [])

	return (
		<div className={styles.container}>
			{modalIsOpen && <ConfirmationModal onConfirm={confirmDelete} onDiscard={discardDelete} />}

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
								<Workout
									onClick={() => openWorkoutEditor(workout)}
									arrow={true}
									exercises={workout.exercises}
									name={workout.name}
									id={workout["_id"]}
									duration={workout.duration}
									removeWorkout={() => showModal(workout["_id"])}
								/>
							))}
						</motion.div>
					}
				/>
				<Route path="new-workout" element={<NewWorkout />} />
			</Routes>
		</div>
	)
}
