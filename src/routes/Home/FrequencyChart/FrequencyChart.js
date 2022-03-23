import React, { useState } from "react"
import styles from "./FrequencyChart.module.css"
import moment from "moment"

export default function FrequencyChart() {
	let insertedChart = 0

	//Represent the workouts relative to the selected time period, it emulates an eventual API response
	const workouts = [
		{
			minutes: 45,
			day: "2022-03-21T19:18:04+01:00",
		},
		{
			minutes: 30,
			day: "2022-03-23T19:18:04+01:00",
		},
		{
			minutes: 5,
			day: "2022-03-26T19:18:04+01:00",
		},
	]

	const chartHeight = (workout) => {
		return {
			height: `${(workout.minutes / 60) * 100}%`,
		}
	}

	const getWorkout = (day) => {
		let workout = undefined
		if (workouts[insertedChart] === undefined) {
			return workout
		}
		if (moment(workouts[insertedChart].day).format("ddd DD") === day) {
			workout = workouts[insertedChart]
			insertedChart += 1
		}
		return workout
	}

	const getDaysOfThisWeek = () => {
		let days = []
		let day = moment().startOf("isoWeek")
		for (let i = 0; i < 7; i++) {
			days.push(day.format("ddd DD"))
			day.add(1, "day")
		}
		return days
	}

	const isSelected = (workout) => {
		return moment().format("ddd DD") === moment(workout.day).format("ddd DD")
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
							<div className={styles.minutes}>{workout.minutes} min</div>
							<div className={styles.chart} style={chartHeight(workout)}></div>
							<div className={styles.day + " " + (isSelected(workout) ? styles.selected : "")}>{moment(workout.day).format("ddd DD")}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
