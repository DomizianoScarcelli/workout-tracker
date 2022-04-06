import { React, useState, useContext } from "react"
import styles from "./DaySelector.module.css"
import { motion, AnimateSharedLayout } from "framer-motion"
import { HomeContext } from "../../routes/Home/Home"

export default function DaySelector(props) {
	const { period } = useContext(HomeContext)
	const [statePeriod, setStatePeriod] = period
	const [isVisible, setVisible] = useState(false)
	const days = ["Week", "Month", "Year"]
	const [selectedDay, setSelectedDay] = useState(days[0])
	const [hoveredDay, setHoveredDay] = useState(null)

	const changeSelectedPeriod = (selectedPeriod) => {
		switch (selectedPeriod) {
			case "Week":
				setStatePeriod("week")
				break
			case "Month":
				setStatePeriod("month")
				break
			case "Year":
				setStatePeriod("year")
				break
			default:
				break
		}
		setSelectedDay(selectedPeriod)
	}

	const daySelectorVariants = {
		hidden: {
			height: "0px",
			padding: "0px",
		},
		toggle: {
			height: isVisible ? "fit-content" : "0px",
			padding: isVisible ? "10px" : "0px",
		},
		rotate: {
			rotate: isVisible ? 90 : 0,
		},
	}

	const daySelectorTextVariants = {
		toggle: {
			visibility: isVisible ? "visible" : "hidden",
		},
		switch: {
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	}

	return (
		<div
			className={styles.dayFilterContainer}
			onClick={() => {
				setVisible(!isVisible)
			}}
		>
			<div className={styles.dayFilterTextContainer}>
				<div className={styles.dayFilterText}>{selectedDay}</div>
				<motion.div className={styles.dayFilterIcon} variants={daySelectorVariants} animate="rotate"></motion.div>
			</div>
			<AnimateSharedLayout>
				<motion.div variants={daySelectorVariants} animate="toggle" initial="hidden" className={styles.daySelectorContainer}>
					{isVisible &&
						days.map((day) => (
							<>
								{hoveredDay === day && <motion.div layoutId="background" variants={daySelectorTextVariants} className={styles.daySelectorBackground}></motion.div>}
								<div
									onMouseOver={() => {
										setHoveredDay(day)
									}}
									onMouseLeave={() => {
										setHoveredDay(selectedDay)
									}}
									onClick={() => {
										changeSelectedPeriod(day)
									}}
									className={styles.daySelector}
								>
									<span>{day}</span>
								</div>
							</>
						))}
				</motion.div>
			</AnimateSharedLayout>
		</div>
	)
}
