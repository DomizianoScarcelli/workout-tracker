import React from "react"
import styles from "./Workout.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function Workout(props) {
	const navigate = useNavigate()

	const openWorkoutEditor = () => {
		localStorage.setItem("exercises", JSON.stringify(props.exercises))
		navigate("new-workout")
	}

	return (
		<motion.div
			onClick={openWorkoutEditor}
			whileHover={{
				scale: 1.1,
			}}
			className={styles.container}
		>
			<div>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.exercises}>
					{props.exercises.map((exercise) => {
						return <div className={styles.exercise}> {`${exercise.repetition} ${exercise.name}`}</div>
					})}
				</div>
			</div>
			<div className={styles.center}></div>
			<div className={styles.right}>
				<div className={styles.duration}>{`${props.duration} min`}</div>
				<div className={styles.arrow}></div>
			</div>
		</motion.div>
	)
}
