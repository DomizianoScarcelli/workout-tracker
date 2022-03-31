import React from "react"
import DaySelector from "../../components/DaySelector/DaySelector"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"
import AddWorkoutButton from "./AddWorkoutButton/AddWorkoutButton"
import FrequentExercises from "./FrequentExercises/FrequentExercises"
import History from "./History/History"
import FrequencyChart from "./FrequencyChart/FrequencyChart"
import { useState, createContext } from "react"

export const HomeContext = createContext()

export default function Home() {
	const [addWorkoutAnimation, setAddWorkoutAnimation] = useState(false)

	return (
		<HomeContext.Provider value={addWorkoutAnimation}>
			<div className={styles.container}>
				<Sidebar selected={"home"} />
				<div className={styles.flexCol}>
					{!addWorkoutAnimation && <DaySelector addWorkoutAnimation={addWorkoutAnimation} />}

					<div className={styles.flexRow}>
						<AddWorkoutButton
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
		</HomeContext.Provider>
	)
}
