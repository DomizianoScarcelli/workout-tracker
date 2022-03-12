import React from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<Sidebar selected={"home"} />
			<div className={styles.dayFilterContainer}>
				<div className={styles.dayFilterTextContainer}>
					<div className={styles.dayFilterText}>This Week</div>
					<div className={styles.dayFilterIcon}></div>
				</div>
				<div className={styles.daySelectorContainer}>
					<div className={styles.daySelector}>
						<span>Today</span>
					</div>
					<div className={styles.daySelector}>
						<span>This week</span>
					</div>
					<div className={styles.daySelector}>
						<span>This month</span>
					</div>
					<div className={styles.daySelector}>
						<span>This year</span>
					</div>
					<div className={styles.daySelector}>
						<span>Custom</span>
					</div>
				</div>
			</div>
		</div>
	)
}
