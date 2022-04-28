import React from "react"
import styles from "./History.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState, useEffect } from "react"
import Workout from "../MyWorkouts/Workout/Workout"
import axios from "axios"
import moment from "moment"
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal"

export default function History() {
	const [history, setHistory] = useState([])
	const [workoutDays, setWorkoutDays] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [workoutToDelete, setWorkoutToDelete] = useState(null)

	const getHistory = async (startDate, endDate) => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/workouts?startDate=${startDate}&endDate=${endDate}`)
		let tempWorkoutDays = []
		for (let workout of res.data) {
			const date = moment(workout.date).format("MMMM DD YYYY")
			if (!tempWorkoutDays.includes(date)) tempWorkoutDays.push(date)
		}
		setWorkoutDays(tempWorkoutDays.reverse())
		setHistory(res.data.reverse())
	}

	const removeWorkoutFromHistory = async (workoutId) => {
		const username = "DovivoD"
		const res = await axios.delete(`http://localhost:8080/sessions/remove-history/${workoutId}?username=${username}`)
		const startDate = "2021-03-30"
		const endDate = "2022-05-20"
		getHistory(startDate, endDate)
	}

	const confirmDelete = () => {
		setModalIsOpen(false)
		removeWorkoutFromHistory(workoutToDelete)
	}

	const discardDelete = () => {
		setModalIsOpen(false)
	}

	const showModal = (workoutId) => {
		setWorkoutToDelete(workoutId)
		setModalIsOpen(true)
	}

	useEffect(() => {
		const startDate = "2021-03-30"
		const endDate = "2022-05-20"
		getHistory(startDate, endDate)
	}, [])

	return (
		<div className={styles.container}>
			{modalIsOpen && <ConfirmationModal onConfirm={confirmDelete} onDiscard={discardDelete} />}
			<Sidebar selected={"history"} />
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<div className={styles.headerIcon}></div>
					<div className={styles.headerTitle}>History</div>
				</div>
				{workoutDays.map((day) => {
					return (
						<>
							<div className={styles.date}>{moment(day).format("MMMM DD YYYY")}</div>
							{history.map(
								(workout) =>
									moment(workout.date).isSame(moment(day), "day") && (
										<>
											<Workout exercises={workout.exercises} name={""} id={workout["_id"]} duration={workout.duration} removeWorkout={() => showModal(workout["_id"])} />
										</>
									)
							)}
						</>
					)
				})}
			</div>
		</div>
	)
}
