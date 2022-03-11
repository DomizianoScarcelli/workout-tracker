import styles from "./Sidebar.module.css"
import SidebarElement from "./SidebarElement"

function Sidebar() {
	return (
		<>
			<div className={styles.sidebar}>
				<div className={styles.topHalfSidebar}>
					<div className={styles.profileIcon}></div>
					<div className={styles.welcomeMessage}>Welcome back, Domiziano</div>
				</div>
				<div className={styles.navContainer}>
					<SidebarElement name={"Home"} selected={true} iconUrl="/icons/home-dark.svg" />
					<SidebarElement name={"My Workouts"} first={true} iconUrl="/icons/my-workouts.svg" />
					<SidebarElement name={"Analytics"} iconUrl="/icons/analytics.svg" />
					<SidebarElement name={"Settings"} iconUrl="/icons/settings.svg" />
				</div>
				<div className={styles.bottomHalfSidebar}></div>
			</div>
		</>
	)
}

export default Sidebar
