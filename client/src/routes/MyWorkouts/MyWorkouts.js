import React from "react"
import styles from "./MyWorkouts.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Workout from "./Workout/Workout"

export default function MyWorkouts() {
	return (
		<div className={styles.container}>
			<Sidebar selected={"my-workouts"} />
			<div className={styles.myWorkoutsContainer}>
				<div className={styles.header}>
					<div className={styles.headerIcon}></div>
					<div className={styles.headerTitle}>My Workouts</div>
				</div>
				<div className={styles.newWorkout}>
					<div className={styles.newWorkoutIcon}></div>
					<div className={styles.newWorkoutTitle}>Create new workout</div>
				</div>
				<Workout />
				<Workout />
			</div>
		</div>
	)
}
