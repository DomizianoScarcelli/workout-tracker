import React from "react"
import styles from "./MyWorkouts.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"

export default function MyWorkouts() {
	return (
		<div className={styles.container}>
			<Sidebar selected={"my-workouts"} />
			<div>Daje roma daje</div>
		</div>
	)
}
