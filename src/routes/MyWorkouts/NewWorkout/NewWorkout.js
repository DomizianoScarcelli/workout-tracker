import React from "react"
import styles from "./NewWorkout.module.css"
import axios from "axios"
import { useRef, useState, useEffect } from "react"

export default function NewWorkout() {
	const durationRef = useRef(null)
	const nameRefs = useRef([])
	const repetitionRefs = useRef([])
	const [exercises, setExercises] = useState(localStorage.getItem("exercises") ? JSON.parse(localStorage.getItem("exercises")) : [])
	const [save, setSave] = useState(localStorage.getItem("saved") === "true" ? true : false)

	useEffect(() => {
		if (localStorage.getItem("exercises") !== null) setExercises(JSON.parse(localStorage.getItem("exercises")))
	}, [])

	const updateExerciseName = (index, name) => {
		exercises[index].name = name
		localStorage.setItem("exercises", JSON.stringify([...exercises]))
		setExercises([...exercises])
	}

	const updateExerciseRepetition = (index, repetition) => {
		exercises[index].repetition = repetition
		localStorage.setItem("exercises", JSON.stringify([...exercises]))
		setExercises([...exercises])
	}

	const addExerciseToView = () => {
		const newExercises = [...exercises, { name: "", repetition: 0 }]
		localStorage.setItem("exercises", JSON.stringify(newExercises))
		setExercises(newExercises)
	}

	const removeWorkout = (index) => {
		exercises.splice(index, 1)
		const newExercises = [...exercises]
		localStorage.setItem("exercises", JSON.stringify(newExercises))
		console.log(JSON.stringify(newExercises))
		setExercises(newExercises)
	}

	const validateData = () => {
		//Validate exercises
		if (exercises === [] || exercises === "") throw new Error("Empty exercises")
		if (durationRef.current.value === "") throw new Error("Empty duration")

		//Return errors if the fields are not properly completed
	}

	const saveWorkout = async () => {
		const username = "DovivoD"
		const duration = durationRef.current.value
		const name = "Workout test api"
		const res = await axios.post(`http://localhost:8080/users/${username}/saved-workouts/add`, {
			name: name,
			exercises: exercises,
			duration: duration,
		})
		console.log(res.data)
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
		let postExercise = []
		for (let index = 0; index < repetitionRefs.current.length; index++) {
			postExercise.push({
				name: nameRefs.current[index].value,
				repetition: repetitionRefs.current[index].value,
			})
		}
		await axios.post("http://localhost:8080/sessions/create", {
			exercises: postExercise,
			duration: duration,
			user: username,
		})
		if (save) {
			await saveWorkout()
		}
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>Monday Workout</div>
			<div className={styles.exercises}>
				{exercises.map((exercise, index) => {
					return (
						<div className={styles.exercise}>
							<div className={styles.dragIcon} />
							<input
								ref={(element) => (repetitionRefs.current[index] == null ? repetitionRefs.current.push(element) : repetitionRefs.current[index])}
								type="number"
								value={exercise.repetition}
								onChange={() => updateExerciseRepetition(index, repetitionRefs.current[index].value)}
								className={styles.repetition}
							/>
							<input
								ref={(element) => (nameRefs.current[index] == null ? nameRefs.current.push(element) : nameRefs.current[index])}
								value={exercise.name}
								onChange={() => {
									updateExerciseName(index, nameRefs.current[index].value)
								}}
								type="text"
								placeholder="Push up"
								className={styles.nameEdit}
							/>

							<div className={styles.removeButton} onClick={() => removeWorkout(index)}></div>
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
					<div
						className={styles.saveButton + " " + (save ? styles.checked : "")}
						onClick={() => {
							localStorage.setItem("saved", !save)
							setSave(!save)
						}}
					></div>
				</div>
				<div className={styles.addButton} onClick={addNewSession}>
					Add
				</div>
			</div>
		</div>
	)
}
