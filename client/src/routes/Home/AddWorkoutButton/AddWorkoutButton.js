import React from "react"
import styles from "./AddWorkoutButton.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function AddWorkoutButton() {
	const navigate = useNavigate()

	return (
		<motion.div
			whileHover={{
				scale: 1.1,
			}}
			onClick={() => {
				//TODO: morph this button into my-workout container before switching to the other page
				navigate("/my-workouts")
			}}
			className={styles.container}
		>
			<div className={styles.text}>ADD WORKOUT</div>
			<div className={styles.icon}>+</div>
		</motion.div>
	)
}
