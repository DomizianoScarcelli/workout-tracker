import React from "react"
import styles from "./Workout.module.css"
import { motion } from "framer-motion"

export default function Workout() {
	//Represent a workout object, should be obtained from a server
	//by making a call to an API that gets the workout's exercises by the workout's id
	const workout = {
		title: "Early Workout",
		exercises: [
			{
				name: "Squats",
				repetition: 25,
			},
			{
				name: "Push-ups",
				repetition: 10,
			},
			{
				name: "Crunches",
				repetition: 50,
			},
		],
		duration: 25,
	}

	return (
		<motion.div
			whileHover={{
				scale: 1.1,
			}}
			className={styles.container}
		>
			<div>
				<div className={styles.name}>{workout.title}</div>
				<div className={styles.exercises}>
					{workout.exercises.map((exercise) => {
						return <div className={styles.exercise}> {`${exercise.repetition} ${exercise.name}`}</div>
					})}
				</div>
			</div>
			<div className={styles.center}></div>
			<div className={styles.right}>
				<div className={styles.duration}>{`${workout.duration} min`}</div>
				<div className={styles.arrow}></div>
			</div>
		</motion.div>
	)
}
