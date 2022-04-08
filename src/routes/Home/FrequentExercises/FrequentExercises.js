import { React, useState, useEffect, useContext } from "react"
import styles from "./FrequentExercises.module.css"
import axios from "axios"
import moment from "moment"
import { motion } from "framer-motion"
import { HomeContext } from "../Home"

export default function FrequentExercises() {
	const [isLoaded, setLoaded] = useState(false)
	const [exercises, setExercises] = useState([])
	const { dayOfRef, period } = useContext(HomeContext)
	const [stateDayOfRef, setStateDayOfRef] = dayOfRef
	const [statePeriod, setStatePeriod] = period

	const getUserMostFrequentExercises = async () => {
		setLoaded(false)
		const username = "DovivoD"
		const startTime = moment(stateDayOfRef).startOf(statePeriod)
		const endTime = moment(stateDayOfRef).endOf(statePeriod)
		const res = await axios.get(`http://localhost:8080/sessions/${username}/most-frequent-exercises?startTime=${startTime}&endTime=${endTime}`)
		setExercises(res.data.slice(0, 4))
		setLoaded(true)
	}

	useEffect(() => {
		getUserMostFrequentExercises()
	}, [dayOfRef, period])

	return (
		<>
			<motion.div initial={{ height: 0 }} animate={isLoaded ? { height: "fit-content" } : {}} transition={{ type: "spring", stiffness: 100 }} className={styles.container}>
				<div className={styles.label}>Frequent Exercises</div>
				{exercises.map(
					({ name, repetition }) =>
						repetition !== 0 && (
							<motion.div
								initial={{
									width: 0,
								}}
								animate={{
									width: "95%",
								}}
								transition={{ type: "spring", stiffness: 100 }}
								className={styles.exerciseContainer}
							>
								<div className={styles.text}>{name}</div>
								<div className={styles.number}>{repetition}</div>
							</motion.div>
						)
				)}
			</motion.div>
		</>
	)
}
