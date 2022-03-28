import React from "react"
import styles from "./AddWorkoutButton.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { useContext } from "react"
import { HomeContext } from "../Home"

export default function AddWorkoutButton(props) {
	const addWorkoutAnimation = useContext(HomeContext)
	const navigate = useNavigate()
	const isSingleColumn = useMediaQuery("(max-width: 1050px)")
	// const isMultipleColumn = useMediaQuery("(min-width: 1050px)")

	const morphVariants = isSingleColumn
		? {
				//Variant when the AddWorkoutButton is in a single column
				addWorkoutClick: {
					backgroundColor: "white",
					width: "100%",
					height: "100vh",
				},
		  }
		: {
				//Variant when the AddWorkoutButton is in a grid
				addWorkoutClick: {
					backgroundColor: "white",
					width: "500px",
					height: "1000px",
					maxWidth: "2000px",
					maxHeight: "2000px",
				},
		  }

	return (
		<motion.div
			whileHover={{
				scale: 1.1,
			}}
			variants={morphVariants}
			animate={addWorkoutAnimation ? "addWorkoutClick" : ""}
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
