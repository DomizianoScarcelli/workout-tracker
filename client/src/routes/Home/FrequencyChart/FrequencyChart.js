import { motion } from "framer-motion"
import React from "react"
import styles from "./FrequencyChart.module.css"
import moment from "moment"
import { getDaysOfThisWeek } from "../../../utils/DateUtils"
import { useState, useEffect } from "react"
import axios from "axios"

export default function FrequencyChart() {
	let insertedChart = 0
	const [workouts, setWorkouts] = useState([])

	const getWeeklyWorkouts = async () => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/weekly-workouts`)
		setWorkouts(res.data)
	}

	useEffect(() => {
		getWeeklyWorkouts()
	}, [])

	// //Represent the workouts relative to the selected time period, it emulates an eventual API response
	// const workouts = [
	// 	{
	// 		id: 1,
	// 		minutes: 45,
	// 		day: "2022-03-28T19:18:04+01:00",
	// 	},
	// 	{
	// 		id: 2,
	// 		minutes: 30,
	// 		day: "2022-03-30T19:18:04+01:00",
	// 	},
	// 	{
	// 		id: 3,
	// 		minutes: 5,
	// 		day: "2022-04-31T19:18:04+01:00",
	// 	},
	// 	{
	// 		id: 3,
	// 		minutes: 5,
	// 		day: "2022-03-26T19:18:04+01:00",
	// 	},
	// 	{
	// 		id: 3,
	// 		minutes: 5,
	// 		day: "2022-03-26T19:18:04+01:00",
	// 	},
	// 	{
	// 		id: 3,
	// 		minutes: 5,
	// 		day: "2022-03-26T19:18:04+01:00",
	// 	},
	// ]

	const chartHeight = (workout) => {
		return {
			height: `${(workout.duration / 60) * 100}%`,
		}
	}

	const getWorkout = (day) => {
		let workout = undefined
		if (workouts[insertedChart] === undefined) {
			return workout
		}
		if (moment(workouts[insertedChart].date).format("ddd DD") === day) {
			workout = workouts[insertedChart]
			insertedChart += 1
		}
		return workout
	}

	const isSelected = (workout) => {
		return moment().format("ddd DD") === moment(workout.date).format("ddd DD")
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Workouts</div>
			<div className={styles.horizontalContainer}>
				{getDaysOfThisWeek().map((day) => {
					const workout = getWorkout(day)
					return workout === undefined ? (
						<div className={styles.infoContainer}>
							<div className={styles.day}>{day}</div>
						</div>
					) : (
						<div className={styles.infoContainer}>
							<div className={styles.minutes}>{workout.duration} min</div>
							<motion.div
								className={styles.chart}
								animate={chartHeight(workout)}
								initial={{
									height: 0,
								}}
								transition={{ type: "spring", stiffness: 100 }}
							></motion.div>
							<div className={styles.day + " " + (isSelected(workout) ? styles.selected : "")}>{moment(workout.date).format("ddd DD")}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
