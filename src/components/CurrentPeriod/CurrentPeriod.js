import React from "react"
import styles from "./CurrentPeriod.module.css"
import moment from "moment"
import { useContext } from "react"
import { HomeContext } from "../../routes/Home/Home"

const CurrentPeriod = (props) => {
	const { dayOfRef, period } = useContext(HomeContext)
	const [day, setDay] = dayOfRef
	const [statePeriod, setStatePeriod] = period

	const formatCurrentPeriod = () => {
		const startDate = moment(day).startOf(statePeriod)
		const endDate = moment(day).endOf(statePeriod)
		return startDate.format("DD/MM/YYYY") + " - " + endDate.format("DD/MM/YYYY")
	}

	const goToPreviousPeriod = () => {
		switch (statePeriod) {
			case "isoWeek":
				setDay(moment(day).subtract(7, "day"))
				break
			case "month":
				setDay(moment(day).subtract(1, "month"))
				break
			case "year":
				setDay(moment(day).subtract(1, "year"))
				break
			default:
				break
		}
	}
	const goToNextPeriod = () => {
		switch (statePeriod) {
			case "isoWeek":
				setDay(moment(day).add(7, "day"))
				break
			case "month":
				setDay(moment(day).add(1, "month"))
				break
			case "year":
				setDay(moment(day).add(1, "year"))
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
