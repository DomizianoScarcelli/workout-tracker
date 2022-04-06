import React from "react"
import styles from "./Workout.module.css"
import { motion } from "framer-motion"

export default function Workout(props) {
	return (
		<motion.div
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
