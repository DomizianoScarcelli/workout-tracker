import useRenderNavigation from "./useRenderNavigation"
import styles from "./Sidebar.module.css"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu"
import { useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { motion } from "framer-motion"

function Sidebar(props) {
	const [firstHalf, secondHalf] = useRenderNavigation(props.selected)
	const [isActive, setActive] = useState(false)
	const isSmall = useMediaQuery("(max-width: 700px)")

	const navbarVariants = {
		toggle: {
			height: isActive ? "fit-content" : isSmall ? "0px" : "100vw",
			padding: isActive ? "10px" : "0px",
		},
	}

	const navbarContentVariants = {
		toggle: {
			visibility: isActive ? "visible" : isSmall ? "hidden" : "visible",
		},
	}
	return (
		<>
			<HamburgerMenu
				isActive={isActive}
				toggleActive={() => {
					setActive(!isActive)
				}}
			/>
			<motion.div variants={navbarVariants} animate="toggle" className={styles.sidebar}>
				<motion.div variants={navbarContentVariants} animate="toggle" className={styles.topHalfSidebar}>
					<div className={styles.profileIcon}></div>
					<div className={styles.welcomeMessage}>Welcome back, Domiziano</div>
					<motion.div variants={navbarContentVariants} animate="toggle" className={styles.navContainer}>
						{firstHalf.map((element) => element)}
					</motion.div>
				</motion.div>
				<motion.div variants={navbarContentVariants} animate="toggle" className={styles.navContainer}>
					{secondHalf.map((element) => element)}
				</motion.div>
				<div className={styles.bottomHalfSidebar}></div>
			</motion.div>
		</>
	)
}

export default Sidebar
