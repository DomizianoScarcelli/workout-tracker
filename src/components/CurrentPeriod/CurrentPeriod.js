import React from "react"
import styles from "./CurrentPeriod.module.css"
import moment from "moment"
import { useState } from "react"

const CurrentPeriod = (props) => {
	const [dayOfRef, setDayOfRef] = useState(moment().format())

	const formatCurrentPeriod = () => {
		const startDate = moment(dayOfRef).startOf(props.period)
		const endDate = moment(dayOfRef).endOf(props.period)
		console.log(startDate, endDate)
		return startDate.format("DD/MM/YYYY") + " - " + endDate.format("DD/MM/YYYY")
	}

	const goToPreviousPeriod = () => {
		switch (props.period) {
			case "isoWeek":
				setDayOfRef(moment(dayOfRef).subtract(7, "day"))
				break
			case "month":
				setDayOfRef(moment(dayOfRef).subtract(1, "month"))
				break
			case "year":
				setDayOfRef(moment(dayOfRef).subtract(1, "year"))
				break
			default:
				break
		}
	}
	const goToNextPeriod = () => {
		switch (props.period) {
			case "isoWeek":
				setDayOfRef(moment(dayOfRef).add(7, "day"))
				break
			case "month":
				setDayOfRef(moment(dayOfRef).add(1, "month"))
				break
			case "year":
				setDayOfRef(moment(dayOfRef).add(1, "year"))
				break
			default:
				break
		}
	}
	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<div className={styles.side} onClick={goToPreviousPeriod}>
					<div className={`${styles.arrow} ${styles.before}`}></div>
				</div>

				<div className={styles.period}>{formatCurrentPeriod()}</div>
				<div className={styles.side} onClick={goToNextPeriod}>
					<div className={`${styles.arrow}`}></div>
				</div>
			</div>
		</div>
	)
}

export default CurrentPeriod
