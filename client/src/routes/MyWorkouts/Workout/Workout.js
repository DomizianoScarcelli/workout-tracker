import React from "react"
import styles from "./Workout.module.css"

export default function Workout() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.name}>Early Workout</div>
				<div className={styles.exercises}>
					<div className={styles.exercise}>25 Squats</div>
					<div className={styles.exercise}>10 Push-ups</div>
					<div className={styles.exercise}>50 Crunches</div>
				</div>
			</div>
			<div className={styles.center}></div>
			<div className={styles.right}>
				<div className={styles.duration}>25 min</div>
				<div className={styles.arrow}></div>
			</div>
		</div>
	)
}
