import React from "react"
import styles from "./NewWorkout.module.css"
import axios from "axios"
import { useRef } from "react"

export default function NewWorkout() {
	const durationRef = useRef(null)

	const addNewSession = async () => {
		const username = "DovivoD"
		const exercises = []
		const duration = durationRef.current.value
		const res = await axios.post("http://localhost:8080/sessions/create", {
			exercises: exercises,
			duration: duration,
			user: username,
		})
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>Monday Workout</div>
			<div className={styles.exercises}>
				<div className={styles.exercise}>
					<div className={styles.dragIcon} />
					<input type="text" value="20" className={styles.repetition} />
					<div className={styles.name}>Squats</div>
				</div>
				<div className={styles.exercise}>
					<div className={styles.dragIcon} />
					<input type="text" value="30" className={styles.repetition} />
					<div className={styles.name}>Push Ups</div>
				</div>
				<div className={styles.exercise + " " + styles.addExercise}>
					<div className={styles.addIcon}>+</div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.exercise}>
						<input type="text" value="20" ref={durationRef} className={styles.repetition} />

						<div className={styles.name}>Minutes</div>
					</div>

					<div className={styles.save}>
						<div>Save</div>
						<div className={styles.saveButton}></div>
					</div>
					<div className={styles.addButton} onClick={addNewSession}>
						Add
					</div>
				</div>
			</div>
		</div>
	)
}
