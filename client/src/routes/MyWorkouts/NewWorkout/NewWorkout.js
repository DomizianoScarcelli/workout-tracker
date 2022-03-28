import React from "react"
import styles from "./NewWorkout.module.css"

export default function NewWorkout() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Monday Workout</div>
			<div className={styles.exercises}>
				<div className={styles.exercise}>
					<div className={styles.dragIcon} />
					<div className={styles.repetition}>20</div>
					<div className={styles.name}>Squats</div>
				</div>
				<div className={styles.exercise}>
					<div className={styles.dragIcon} />
					<div className={styles.repetition}>30</div>
					<div className={styles.name}>Push Ups</div>
				</div>
				<div className={styles.exercise + " " + styles.addExercise}>
					<div className={styles.addIcon}>+</div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.exercise}>
						<div className={styles.repetition}>20</div>
						<div className={styles.name}>Minutes</div>
					</div>

					<div className={styles.save}>
						<div>Save</div>
						<div className={styles.saveButton}></div>
					</div>
					<div className={styles.addButton}>Add</div>
				</div>
			</div>
		</div>
	)
}
