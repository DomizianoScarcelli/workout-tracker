import React from "react"
import styles from "./FrequencyChart.module.css"

export default function FrequencyChart() {
	const workouts = [
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
		{
			minutes: 45,
			day: "Tue 1",
		},
	]

	return (
		<div className={styles.container}>
			<div className={styles.label}>Workouts</div>
			<div className={styles.horizontalContainer}>
				{workouts.map((workout, i) => {
					return (
						<div className={styles.infoContainer}>
							<div className={styles.minutes}>{workout.minutes} min</div>
							<div className={styles.chart}></div>
							<div className={styles.day + " " + (i === 3 ? styles.selected : "")}>{workout.day}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
