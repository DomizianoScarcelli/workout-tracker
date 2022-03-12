import { React, useState } from "react"
import styles from "./DaySelector.module.css"
import { isBrowser, motion } from "framer-motion"

export default function DaySelector() {
	const [isVisible, setVisible] = useState(false)

	const daySelectorVariants = {
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
	}
	return (
		<div
			className={styles.dayFilterContainer}
			onClick={() => {
				setVisible(!isVisible)
			}}
		>
			<div className={styles.dayFilterTextContainer}>
				<div className={styles.dayFilterText}>This Week</div>
				<motion.div className={styles.dayFilterIcon} variants={daySelectorVariants} animate="rotate"></motion.div>
			</div>
			<motion.div variants={daySelectorVariants} animate="toggle" className={styles.daySelectorContainer}>
				<motion.div variants={daySelectorTextVariants} className={styles.daySelector}>
					<span>Today</span>
				</motion.div>
				<motion.div variants={daySelectorTextVariants} className={styles.daySelector}>
					<span>This week</span>
				</motion.div>
				<motion.div variants={daySelectorTextVariants} className={styles.daySelector}>
					<span>This month</span>
				</motion.div>
				<motion.div variants={daySelectorTextVariants} className={styles.daySelector}>
					<span>This year</span>
				</motion.div>
				<motion.div variants={daySelectorTextVariants} className={styles.daySelector}>
					<span>Custom</span>
				</motion.div>
			</motion.div>
		</div>
	)
}
