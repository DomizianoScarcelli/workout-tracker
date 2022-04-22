import React from "react"
import styles from "./Workout.module.css"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Workout(props) {
	const [hovering, setHovering] = useState(false)

	return (
		<motion.div
			onClick={props.onClick}
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
					onClick={(e) => {
						e.stopPropagation()
						props.removeWorkout()
					}}
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
				{props.arrow && <div className={styles.arrow}></div>}
			</div>
		</motion.div>
	)
}
