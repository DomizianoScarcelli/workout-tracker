import { motion } from "framer-motion"
import React from "react"
import styles from "./FrequencyChart.module.css"
import moment from "moment"
import { useState, useEffect } from "react"
import axios from "axios"

export default function FrequencyChart() {
	const [workoutTimeArray, setWorkoutTimeArray] = useState([])
	const [maxWorkoutMinutes, setMaxWorkoutMinutes] = useState(0)

	const getWorkoutMinutes = async (startTime, endTime) => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/workout-time-period?startTime=${startTime}&endTime=${endTime}`)
		for (let workout of res.data) {
			if (workout.duration > maxWorkoutMinutes) setMaxWorkoutMinutes(workout.duration)
		}
		setWorkoutTimeArray(res.data)
	}

	useEffect(() => {
		const startTime = moment().startOf("isoWeek")
		const endTime = moment().endOf("isoWeek")
		getWorkoutMinutes(startTime, endTime)
	}, [])

	const chartHeight = (duration) => {
		const max = Math.floor(maxWorkoutMinutes / 60)
		console.log(max)
		return {
			height: `${(duration / (60 * max)) * 100}%`,
		}
	}

	const isSelected = (date) => {
		return moment().format("ddd DD") === moment(date).format("ddd DD")
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Workouts</div>
			<div className={styles.horizontalContainer}>
				{workoutTimeArray.map(({ date, duration }) => {
					return duration === 0 ? (
						<div className={styles.infoContainer}>
							<div className={styles.day}>{moment(date).format("ddd DD")}</div>
						</div>
					) : (
						<div className={styles.infoContainer}>
							<div className={styles.minutes}>{duration} min</div>
							<motion.div
								className={styles.chart}
								animate={chartHeight(duration)}
								initial={{
									height: 0,
								}}
								transition={{ type: "spring", stiffness: 100 }}
							></motion.div>
							<div className={styles.day + " " + (isSelected(date) ? styles.selected : "")}>{moment(date).format("ddd DD")}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
