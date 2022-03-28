import React from "react"
import DaySelector from "../../components/DaySelector/DaySelector"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"
import AddWorkoutButton from "./AddWorkoutButton/AddWorkoutButton"
import FrequentExercises from "./FrequentExercises/FrequentExercises"
import History from "./History/History"
import FrequencyChart from "./FrequencyChart/FrequencyChart"
import { useState } from "react"

export default function Home() {
	const [addWorkoutAnimation, setAddWorkoutAnimation] = useState(false)

	return (
		<div className={styles.container}>
			<Sidebar selected={"home"} />
			<div className={styles.flexCol}>
				{!addWorkoutAnimation && <DaySelector addWorkoutAnimation={addWorkoutAnimation} />}

				<div className={styles.flexRow}>
					<AddWorkoutButton
						addWorkoutAnimation={addWorkoutAnimation}
						onClick={() => {
							setAddWorkoutAnimation(!addWorkoutAnimation)
						}}
					/>
					<FrequentExercises />
					<History />
				</div>
				<div className={styles.flexRow}>
					<FrequencyChart />
				</div>
			</div>
		</div>
	)
}
