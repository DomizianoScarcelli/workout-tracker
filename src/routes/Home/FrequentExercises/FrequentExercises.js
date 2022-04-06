import { React, useState, useEffect } from "react"
import styles from "./FrequentExercises.module.css"
import axios from "axios"
import moment from "moment"

export default function FrequentExercises() {
	const [exercises, setExercises] = useState([])

	const getUserMostFrequentExercises = async (startTime, endTime) => {
		const username = "DovivoD"
		const res = await axios.get(`http://localhost:8080/sessions/${username}/most-frequent-exercises?startTime=${startTime}&endTime=${endTime}`)
		setExercises(res.data.slice(0, 4))
	}

	useEffect(() => {
		const startTime = moment().startOf("isoWeek")
		const endTime = moment().endOf("isoWeek")
		getUserMostFrequentExercises(startTime, endTime)
	}, [])

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label}>Frequent Exercises</div>
				{exercises.map(
					({ name, repetition }) =>
						repetition !== 0 && (
							<div className={styles.exerciseContainer}>
								<div className={styles.text}>{name}</div>
								<div className={styles.number}>{repetition}</div>
							</div>
						)
				)}
			</div>
		</>
	)
}
