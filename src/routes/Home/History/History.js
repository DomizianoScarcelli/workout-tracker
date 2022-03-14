import React from "react"
import styles from "./History.module.css"

export default function History() {
	const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4]

	return (
		<>
			<div className={styles.container}>
				<div className={styles.label}>History</div>
				<div className={styles.week}>
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
						return <div className={styles.weekDay}>{day}</div>
					})}
				</div>
				<div className={styles.dayGrid}>
					{days.map((day, i) => {
						return (
							<div className={styles.dayContainer}>
								<div className={styles.day + " " + (i > 20 ? styles.futureDay : "")}>{day}</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
