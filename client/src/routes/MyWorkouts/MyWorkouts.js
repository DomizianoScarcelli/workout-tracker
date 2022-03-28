import React from "react"
import styles from "./MyWorkouts.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import Workout from "./Workout/Workout"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"

export default function MyWorkouts() {
	const navigate = useNavigate()
	const query = useQuery()

	//Represent a list of workouts, should be obtained from a server
	const workouts = [
		{
			id: 1,
			minutes: 45,
			day: "2022-04-28T19:18:04+01:00",
		},
		{
			id: 2,
			minutes: 30,
			day: "2022-04-30T19:18:04+01:00",
		},
		{
			id: 3,
			minutes: 5,
			day: "2022-04-31T19:18:04+01:00",
		},
		{
			id: 3,
			minutes: 5,
			day: "2022-03-26T19:18:04+01:00",
		},
		{
			id: 3,
			minutes: 5,
			day: "2022-03-26T19:18:04+01:00",
		},
		{
			id: 3,
			minutes: 5,
			day: "2022-03-26T19:18:04+01:00",
		},
	]

	return (
		<div className={styles.container}>
			<Sidebar selected={"my-workouts"} />
			<motion.div animate={{ scale: 1 }} initial={query.get("button") ? { scale: 1.1 } : ""} className={styles.innerContainer}>
				<div className={styles.header}>
					<div className={styles.headerIcon}></div>
					<div className={styles.headerTitle}>My Workouts</div>
				</div>
				<motion.div
					whileHover={{
						scale: 1.1,
					}}
					className={styles.newWorkout}
					onClick={() => {
						navigate("new-workout")
					}}
				>
					<div className={styles.newWorkoutIcon}></div>
					<div className={styles.newWorkoutTitle}>Create new workout</div>
				</motion.div>
				{workouts.map((workout) => (
					<Workout id={workout.id} />
				))}
			</motion.div>
		</div>
	)
}
