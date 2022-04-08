import React from "react"
import styles from "./Workout.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Workout(props) {
	const navigate = useNavigate()

	const [hovering, setHovering] = useState(false)

	const openWorkoutEditor = () => {
		localStorage.setItem("exercises", JSON.stringify(props.exercises))
		navigate("new-workout")
	}

	const deleteSavedWorkout = () => {
		//TODO: Delete the current saved workout from the DB
	}

	return (
		<motion.div
			onClick={openWorkoutEditor}
			whileHover={{
				scale: 1.1,
			}}
			onHoverStart={() => {
				setHovering(true)
			}}
			onHoverEnd={() => {
				setHovering(false)
			}}
			className={styles.container}
		>
			{hovering && (
				<motion.div
					whileHover={{
						scale: 1.8,
					}}
					className={styles.closeButton}
					onClick={deleteSavedWorkout}
				></motion.div>
			)}
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
