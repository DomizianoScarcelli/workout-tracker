import React from "react"
import styles from "./NewWorkout.module.css"
import axios from "axios"
import { useRef, useState } from "react"

export default function NewWorkout() {
	const durationRef = useRef(null)
	const [exercises, setExercises] = useState([])

	const addExerciseToView = () => {
		setExercises([...exercises, { name: "Name", repetition: 0 }])
	}

	const validateData = () => {
		//Validate exercises
		if (exercises === [] || exercises === "") throw new Error("Empty exercises")
		if (durationRef.current.value === "") throw new Error("Empty duration")

		//Return errors if the fields are not properly completed
	}

	const addNewSession = async () => {
		try {
			validateData()
		} catch (err) {
			switch (err.message) {
				case "Empty exercises":
					console.error("Validation error: Empty exercises")
					//do something
					break
				case "Empty duration":
					console.error("Validation error: Empty exercises")
					break
				//do something
				default:
					console.error("Other error: " + err.message)
					break
			}
			return
		}
		const username = "DovivoD"
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
				{exercises.map((exercise) => {
					return (
						<div className={styles.exercise}>
							<div className={styles.dragIcon} />
							<input type="number" placeholder="20" className={styles.repetition} />
							<div className={styles.name}>{exercise.name}</div>
						</div>
					)
				})}
				<div className={styles.exercise + " " + styles.addExercise} onClick={addExerciseToView}>
					<div className={styles.addIcon}>+</div>
				</div>
			</div>

			<div className={styles.bottom}>
				<div className={styles.exercise}>
					<input type="number" placeholder="20" ref={durationRef} className={styles.repetition} />

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
	)
}
