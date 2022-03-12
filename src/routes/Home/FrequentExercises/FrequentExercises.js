import { React, useState } from "react"
import styles from "./FrequentExercises.module.css"

export default function FrequentExercises() {
	const [exercises, setExercises] = useState(["Sit up", "Push up", "Crunch"])

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label}>Frequent Exercises</div>
				{exercises.map((exercise) => (
					<div className={styles.exerciseContainer}>
						{" "}
						<div className={styles.text}>{exercise}</div>
						<div className={styles.number}>300</div>
					</div>
				))}
			</div>
		</>
	)
}
