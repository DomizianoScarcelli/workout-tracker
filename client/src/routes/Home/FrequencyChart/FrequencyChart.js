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

	const chartHeight = (workout) => {
		return {
			height: `${(workout.duration / 60) * 100}%`,
		}
	}

	const getWorkout = (day) => {
		let workout = undefined
		let duration = 0
		console.log(day, insertedChart)
		if (workouts[insertedChart] === undefined) {
			return { workout, duration }
		}
		if (moment(workouts[insertedChart].date).format("ddd DD") === day) {
			workout = workouts[insertedChart]
			duration += workout.duration
			insertedChart += 1
			try {
				while (moment(workouts[insertedChart].date).format("ddd DD") === day) {
					workout = workouts[insertedChart]
					duration += workouts[insertedChart].duration
					insertedChart += 1
				}
			} catch {
				return { workout, duration }
			}
		}
		console.log(duration)
		return { workout, duration }
	}

	const isSelected = (workout) => {
		return moment().format("ddd DD") === moment(workout.date).format("ddd DD")
	}

	return (
		<div className={styles.container}>
			{console.log("rendered")}
			<div className={styles.label}>Workouts</div>
			<div className={styles.horizontalContainer}>
				{getDaysOfThisWeek().map((day) => {
					const { workout, duration } = getWorkout(day)
					return workout === undefined ? (
						<div className={styles.infoContainer}>
							<div className={styles.day}>{day}</div>
						</div>
					) : (
						<div className={styles.infoContainer}>
							<div className={styles.minutes}>{duration} min</div>
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
