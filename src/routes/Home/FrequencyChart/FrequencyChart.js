import { motion } from "framer-motion"
import React from "react"
import styles from "./FrequencyChart.module.css"
import moment from "moment"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { HomeContext } from "../Home"

export default function FrequencyChart() {
	const { dayOfRef, period } = useContext(HomeContext)
	const [stateDayOfRef, setStateDayOfRef] = dayOfRef
	const [statePeriod, setStatePeriod] = period
	const [workoutTimeArray, setWorkoutTimeArray] = useState([])
	const [maxWorkoutMinutes, setMaxWorkoutMinutes] = useState(0)

	const getWorkoutMinutes = async () => {
		const username = "DovivoD"
		const startTime = moment(stateDayOfRef).startOf(statePeriod)
		const endTime = moment(stateDayOfRef).endOf(statePeriod)
		const res = await axios.get(`http://localhost:8080/sessions/${username}/workout-time-period?startTime=${startTime}&endTime=${endTime}`)
		setWorkoutTimeArray(res.data)
		for (let workout of res.data) {
			if (workout.duration > maxWorkoutMinutes) setMaxWorkoutMinutes(workout.duration)
		}
	}

	useEffect(() => {
		getWorkoutMinutes()
	}, [dayOfRef, period])

	const chartHeight = (duration) => {
		const max = Math.floor(maxWorkoutMinutes / 60)
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
