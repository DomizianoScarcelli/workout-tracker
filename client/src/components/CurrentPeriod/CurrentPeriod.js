import React from "react"
import styles from "./CurrentPeriod.module.css"

const CurrentPeriod = () => {
	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<div className={styles.side}>
					<div className={`${styles.arrow} ${styles.before}`}></div>
				</div>

				<div className={styles.period}>04/04/2022 - 10/04/2022</div>
				<div className={styles.side}>
					<div className={`${styles.arrow}`}></div>
				</div>
			</div>
		</div>
	)
}

export default CurrentPeriod
