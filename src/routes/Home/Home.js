import React from "react"
import DaySelector from "../../components/DaySelector/DaySelector"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"
import AddWorkoutButton from "./AddWorkoutButton/AddWorkoutButton"
import FrequentExercises from "./FrequentExercises/FrequentExercises"
import History from "./History/History"
import FrequencyChart from "./FrequencyChart/FrequencyChart"
import { useState, createContext } from "react"
import CurrentPeriod from "../../components/CurrentPeriod/CurrentPeriod"
import moment from "moment"

export const HomeContext = createContext()

export default function Home() {
	const [addWorkoutAnimation, setAddWorkoutAnimation] = useState(false)
	const [dayOfRef, setDayOfRef] = useState(moment().format())
	const [period, setPeriod] = useState("isoWeek")

	return (
		<HomeContext.Provider value={{ addWorkoutAnimation: addWorkoutAnimation, dayOfRef: [dayOfRef, setDayOfRef], period: [period, setPeriod] }}>
			<div className={styles.container}>
				<Sidebar selected={"home"} />
				<div className={styles.flexCol}>
					{!addWorkoutAnimation && (
						<div className={styles.period}>
							<DaySelector addWorkoutAnimation={addWorkoutAnimation} />
							<CurrentPeriod />
						</div>
					)}

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
