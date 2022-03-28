import React from "react"
import styles from "./AddWorkoutButton.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function AddWorkoutButton(props) {
	const navigate = useNavigate()

	const morphVariants = {
		addWorkoutClick: {
			backgroundColor: "white",
			width: "100%",
			height: "100vw",
		},
	}

	return (
		<motion.div
			whileHover={{
				scale: 1.1,
			}}
			variants={morphVariants}
			animate={props.addWorkoutAnimation ? "addWorkoutClick" : ""}
			onClick={() => {
				props.onClick()
				setTimeout(() => {
					navigate("/my-workouts?button=true")
				}, 150)
			}}
			className={styles.container}
		>
			<div className={styles.text}>ADD WORKOUT</div>
			<div className={styles.icon}>+</div>
		</motion.div>
	)
}
