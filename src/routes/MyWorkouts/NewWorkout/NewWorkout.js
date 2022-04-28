import React from "react"
import styles from "./NewWorkout.module.css"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import "react-modern-calendar-datepicker/lib/DatePicker.css"
import DatePicker from "react-modern-calendar-datepicker"
import moment from "moment"
import { motion } from "framer-motion"
import WorkoutAddedModal from "../../../components/WorkoutAddedModal/WorkoutAddedModal"

export default function NewWorkout() {
	const durationRef = useRef(null)
	const nameRefs = useRef([])
	const repetitionRefs = useRef({})
	const [exercises, setExercises] = useState(localStorage.getItem("workoutInfo") ? JSON.parse(localStorage.getItem("workoutInfo")).exercises : [])
	const [save, setSave] = useState(localStorage.getItem("workoutInfo") ? JSON.parse(localStorage.getItem("workoutInfo")).save : false)
	const [selectedDay, setSelectedDay] = useState(null)
	const [duration, setDuration] = useState(localStorage.getItem("workoutInfo") ? JSON.parse(localStorage.getItem("workoutInfo")).minutes : "")
	const workoutNameRef = useRef(null)
	const [workoutName, setWorkoutName] = useState(localStorage.getItem("workoutInfo") ? JSON.parse(localStorage.getItem("workoutInfo")).workoutName : "")
	const [modalIsOpen, setModalIsOpen] = useState(false)

	useEffect(() => {
		if (localStorage.getItem("workoutInfo") !== null) setExercises(getInfoFromLocalStorage().exercises)
	}, [])

	const deleteSerie = (workoutIndex, repetitionIndex) => {
		const newExercises = [...exercises]
		newExercises[workoutIndex].repetition.splice(repetitionIndex, 1)
		updateLocalStorage(exercises, durationRef.current.value, save)
	}

	const getInfoFromLocalStorage = () => {
		return JSON.parse(localStorage.getItem("workoutInfo"))
	}

	const updateLocalStorage = (exercises, minutes, save) => {
		localStorage.setItem(
			"workoutInfo",
			JSON.stringify({
				workoutName: workoutName,
				exercises: exercises,
				minutes: minutes,
				save: save,
			})
		)
		setExercises(exercises)
		setDuration(minutes)
		setSave(save)
	}

	const updateExerciseName = (index, name) => {
		console.log(durationRef.current.value)
		exercises[index].name = name
		updateLocalStorage([...exercises], durationRef.current.value, save)
	}

	const updateExerciseRepetition = (index, repetition, repetitionIndex) => {
		exercises[index].repetition[repetitionIndex] = repetition
		updateLocalStorage([...exercises], durationRef.current.value, save)
	}

	const addExerciseToView = () => {
		const newExercises = [...exercises, { name: "", repetition: [""] }]
		updateLocalStorage(newExercises, durationRef.current.value, save)
	}

	const addSerieToExercise = (index) => {
		const newExercises = [...exercises]
		newExercises[index].repetition.push("")
		updateLocalStorage(newExercises, durationRef.current.value, save)
	}

	const removeWorkout = (index) => {
		exercises.splice(index, 1)
		const newExercises = [...exercises]
		updateLocalStorage(newExercises, durationRef.current.value, save)
	}

	const updateWorkoutName = (name) => {
		localStorage.setItem(
			"workoutInfo",
			JSON.stringify({
				workoutName: name,
				exercises: exercises,
				minutes: duration,
				save: save,
			})
		)
		setWorkoutName(name)
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
		const res = await axios.post(`http://localhost:8080/users/${username}/saved-workouts/add`, {
			name: workoutName,
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
			date: selectedDay === null ? moment().toDate() : moment(selectedDay).subtract(1, "month").toDate(),
		})
		if (save) {
			await saveWorkout()
		}
		setModalIsOpen(true)
	}
	return (
		<div className={styles.container}>
			{modalIsOpen && <WorkoutAddedModal setModalIsOpen={setModalIsOpen} save={save} />}
			<div className={styles.header}>
				<input
					className={`${styles.title} ${styles.inputForm}`}
					ref={workoutNameRef}
					value={workoutName}
					onChange={() => {
						updateWorkoutName(workoutNameRef.current.value)
					}}
				/>
				<DatePicker
					value={selectedDay}
					onChange={setSelectedDay}
					renderInput={({ ref }) => (
						<div ref={ref} className={styles.datePickerContainer}>
							<input
								readOnly
								className={styles.datePicker}
								value={selectedDay === null ? moment().format("DD/MM/YYYY") : moment(selectedDay).subtract(1, "month").format("DD/MM/YYYY")}
							/>
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
										<motion.div
											whileHover={{
												scale: 1.8,
											}}
											className={styles.closeButton}
											onClick={(event) => {
												event.stopPropagation()
												deleteSerie(index, repetitionIndex)
											}}
										></motion.div>
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
					<input
						type="number"
						placeholder="20"
						ref={durationRef}
						className={`${styles.repetition} ${styles.inputForm}`}
						onChange={() => {
							updateLocalStorage(exercises, durationRef.current.value, save)
						}}
						value={duration}
					/>

					<div className={styles.name}>Minutes</div>
				</div>

				<div className={styles.save}>
					<div>Save</div>
					<div
						className={styles.saveButton + " " + (save ? styles.checked : "")}
						onClick={() => {
							setSave(!save)
							updateLocalStorage(exercises, duration, !save)
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
