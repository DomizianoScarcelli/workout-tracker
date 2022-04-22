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
	const [maxWorkoutMinutes, setMaxWorkoutMinutes] = useState(100)

	const getWorkoutMinutes = async () => {
		const username = "DovivoD"
		const startTime = moment(stateDayOfRef).startOf(statePeriod)
		const endTime = moment(stateDayOfRef).endOf(statePeriod)
		const res = await axios.get(`http://localhost:8080/sessions/${username}/workout-time-period?startTime=${startTime}&endTime=${endTime}&period=${statePeriod}`)
		setWorkoutTimeArray(res.data)
		for (let workout of res.data) {
			if (workout.duration > maxWorkoutMinutes) setMaxWorkoutMinutes(workout.duration)
		}
	}

	const renderPeriodString = (date, period) => {
		if (date instanceof Array) {
			if (period === "month") return `${moment(date[0]).format("DD MMM")} - \n ${moment(date[1]).format("DD MMM")}`
			if (period === "year") return moment(date[0]).format("MMM")
		}
		return moment(date).format("ddd DD")
	}

	useEffect(() => {
		getWorkoutMinutes()
	}, [dayOfRef, period])

	const chartHeight = (duration) => {
		return `${(duration / maxWorkoutMinutes) * 100}%`
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
							<div className={styles.day}>{renderPeriodString(date, statePeriod)}</div>
						</div>
					) : (
						<div className={styles.infoContainer}>
							<div className={styles.minutes}>{duration} min</div>
							<motion.div className={styles.chart} animate={{ height: chartHeight(duration) }} transition={{ type: "spring", stiffness: 100 }}></motion.div>
							<div className={styles.day + " " + (isSelected(date) ? styles.selected : "")}>{renderPeriodString(date, statePeriod)}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
