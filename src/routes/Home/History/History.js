import React from "react"
import styles from "./History.module.css"
import moment from "moment"
import { getDaysOfThisMonth } from "../../../utils/DateUtils"

export default function History() {
	const days = getDaysOfThisMonth()
	let insertedChart = 0

	//Represent the workouts relative to the current month, it emulates an eventual API response (It has to be ordered)
	const workouts = [
		{
			minutes: 5,
			day: "2022-03-05T19:18:04+01:00",
		},
		{
			minutes: 45,
			day: "2022-03-12T19:18:04+01:00",
		},
		{
			minutes: 30,
			day: "2022-03-17T19:18:04+01:00",
		},
		{
			minutes: 5,
			day: "2022-03-20T19:18:04+01:00",
		},
		{
			minutes: 5,
			day: "2022-03-22T19:18:04+01:00",
		},
		{
			minutes: 5,
			day: "2022-03-23T19:18:04+01:00",
		},
	]

	const getWorkout = (day) => {
		// console.log("Day: " + moment(day).format("MM DD") + " \n " + "Workout Day: " + moment(workouts[insertedChart].day).format("MM DD"))
		let workout = undefined
		if (workouts[insertedChart] === undefined) {
			return workout
		}
		if (moment(workouts[insertedChart].day).format("MM DD") === moment(day).format("MM DD")) {
			workout = workouts[insertedChart]
			insertedChart += 1
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
