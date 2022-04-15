import React from "react"
import styles from "./NewWorkout.module.css"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import "react-modern-calendar-datepicker/lib/DatePicker.css"
import DatePicker from "react-modern-calendar-datepicker"
import moment from "moment"

export default function NewWorkout() {
	const durationRef = useRef(null)
	const nameRefs = useRef([])
	const repetitionRefs = useRef({})
	const [exercises, setExercises] = useState(localStorage.getItem("exercises") ? JSON.parse(localStorage.getItem("exercises")) : [])
	const [save, setSave] = useState(localStorage.getItem("saved") === "true" ? true : false)
	const [selectedDay, setSelectedDay] = useState(null)

	useEffect(() => {
		if (localStorage.getItem("exercises") !== null) setExercises(JSON.parse(localStorage.getItem("exercises")))
	}, [])

	const deleteSerie = () => {
		//TODO: delete serie from the DB and localStorage
	}

	const updateExerciseName = (index, name) => {
		exercises[index].name = name
		localStorage.setItem("exercises", JSON.stringify([...exercises]))
		setExercises([...exercises])
	}

	const updateExerciseRepetition = (index, repetition, repetitionIndex) => {
		exercises[index].repetition[repetitionIndex] = repetition
		localStorage.setItem("exercises", JSON.stringify([...exercises]))
		setExercises([...exercises])
	}

	const addExerciseToView = () => {
		const newExercises = [...exercises, { name: "", repetition: [""] }]
		localStorage.setItem("exercises", JSON.stringify(newExercises))
		setExercises(newExercises)
	}

	const addSerieToExercise = (index) => {
		const newExercises = [...exercises]
		newExercises[index].repetition.push("")
		localStorage.setItem("exercises", JSON.stringify(newExercises))
		setExercises(newExercises)
	}

	const removeWorkout = (index) => {
		exercises.splice(index, 1)
		const newExercises = [...exercises]
		localStorage.setItem("exercises", JSON.stringify(newExercises))
		setExercises(newExercises)
	}

	const validateData = () => {
		//Validate exercises
		if (exercises === [] || exercises === "") throw new Error("Empty exercises")
		if (durationRef.current.value === "") throw new Error("Empty duration")

		//Return errors if the fields are not properly completed
	}

	const saveWorkout = async (name) => {
		const username = "DovivoD"
		const duration = durationRef.current.value
		const res = await axios.post(`http://localhost:8080/users/${username}/saved-workouts/add`, {
			name: name,
			exercises: exercises,
			duration: duration,
		})
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
		for (let index = 0; index < Object.keys(repetitionRefs.current).length; index++) {
			postExercise.push({
				name: nameRefs.current[index].value,
				repetition: repetitionRefs.current[index],
			})
		}
		await axios.post("http://localhost:8080/sessions/create", {
			exercises: postExercise,
			duration: duration,
			user: username,
		})
		if (save) {
			await saveWorkout("Workout test api")
		}
	}
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Monday Workout</div>
				<DatePicker
					value={selectedDay}
					onChange={setSelectedDay}
					renderInput={({ ref }) => (
						<div ref={ref} className={styles.datePickerContainer}>
							<input readOnly className={styles.datePicker} value={moment(selectedDay).format("DD/MM/YYYY")} />
							<div className={styles.editIcon}></div>
						</div>
					)}
				/>
			</div>
			<div className={styles.exercises}>
				{exercises.map((exercise, index) => {
					return (
						<div className={styles.exercise}>
							<div className={styles.dragIcon} />
							{exercise.repetition.map((serie, repetitionIndex) => {
								return (
									<div className={styles.relativeContainer}>
										<input
											ref={() => (repetitionRefs.current[index] === undefined ? (repetitionRefs.current[index] = exercise.repetition) : repetitionRefs.current[index])}
											type="number"
											placeholder="0"
											value={serie}
											onChange={(e) => updateExerciseRepetition(index, e.target.value, repetitionIndex)}
											className={`${styles.repetition} ${styles.inputForm}`}
										/>
										<div className={styles.closeButton} onClick={deleteSerie}></div>
									</div>
								)
							})}

							<div className={styles.addSerie} onClick={() => addSerieToExercise(index)}>
								<div className={styles.addIcon}>+</div>
							</div>
							<input
								ref={(element) => (nameRefs.current[index] == null ? nameRefs.current.push(element) : nameRefs.current[index])}
								value={exercise.name}
								onChange={() => {
									updateExerciseName(index, nameRefs.current[index].value)
								}}
								type="text"
								placeholder="Push up"
								className={`${styles.nameEdit} ${styles.inputForm}`}
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
