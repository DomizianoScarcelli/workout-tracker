import useRenderNavigation from "./useRenderNavigation"
import styles from "./Sidebar.module.css"

function Sidebar(props) {
	const [firstHalf, secondHalf] = useRenderNavigation(props.selected)

	return (
		<>
			<div className={styles.toggle}></div>
			<div className={styles.sidebar}>
				<div className={styles.topHalfSidebar}>
					<div className={styles.profileIcon}></div>
					<div className={styles.welcomeMessage}>Welcome back, Domiziano</div>
					<div className={styles.navContainer}>{firstHalf.map((element) => element)}</div>
				</div>
				<div className={styles.navContainer}>{secondHalf.map((element) => element)}</div>
				<div className={styles.bottomHalfSidebar}></div>
			</div>
		</>
	)
}

export default Sidebar
