import React from "react"
import DaySelector from "../../components/DaySelector/DaySelector"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"
import AddWorkoutButton from "./AddWorkoutButton/AddWorkoutButton"

export default function Home() {
	return (
		<div className={styles.container}>
			<Sidebar selected={"home"} />
			<div className={styles.flexCol}>
				<DaySelector />
				<div className={styles.flexRow}>
					<AddWorkoutButton />
				</div>
			</div>
		</div>
	)
}
