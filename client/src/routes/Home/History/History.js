import React from "react"
import styles from "./History.module.css"
import moment from "moment"
import { getDaysOfThisMonth } from "../../../utils/DateUtils"
import { useState, useEffect } from "react"
import axios from "axios"

export default function History() {
	const days = getDaysOfThisMonth()
	let insertedChart = 0
	const [workouts, setWorkouts] = useState([])

	const getMonthlyWorkouts = async () => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/monthly-workouts`)
		setWorkouts(res.data)
	}

	useEffect(() => {
		getMonthlyWorkouts()
	}, [])

	//Old workout object
	// 	{
	// 		minutes: 5,
	// 		day: "2022-03-05T19:18:04+01:00",
	// 	},
	//

	const getWorkout = (day) => {
		let workout = undefined
		if (workouts[insertedChart] === undefined) {
			return workout
		}
		if (moment(workouts[insertedChart].date).format("MM DD") === moment(day).format("MM DD")) {
			workout = workouts[insertedChart]
			insertedChart += 1
			try {
				while (moment(workouts[insertedChart].date).format("MM DD") === day) {
					workout = workouts[insertedChart]
					insertedChart += 1
				}
			} catch {
				return workout
			}
		}
		return workout
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label}>History</div>
				<div className={styles.week}>
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
						return <div className={styles.weekDay}>{day}</div>
					})}
				</div>
				<div className={styles.dayGrid}>
					{days.map((day, i) => {
						const workout = getWorkout(day)
						return (
							<div className={styles.dayContainer + (workout === undefined ? "" : " " + styles.selected)}>
								<div className={styles.day + " " + (moment(day).isAfter(moment()) ? styles.futureDay : "")}>{moment(day).format("D")}</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
