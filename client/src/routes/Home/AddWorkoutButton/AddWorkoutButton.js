import React from "react"
import styles from "./AddWorkoutButton.module.css"
import { motion } from "framer-motion"

export default function AddWorkoutButton() {
	return (
		<motion.div
			whileHover={{
				scale: 1.1,
			}}
			className={styles.container}
		>
			<div className={styles.text}>ADD WORKOUT</div>
			<div className={styles.icon}>+</div>
		</motion.div>
	)
}
