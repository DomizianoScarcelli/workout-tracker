import styles from "./Sidebar.module.css"
import SidebarElement from "./SidebarElement"

function Sidebar(props) {
	const navArray = ["Home", "My Workouts", "Analytics", "Settings"]

	const renderNavigation = () => {
		let firstHalf = []
		let secondHalf = []
		const index = navArray.indexOf(props.selected)
		for (let i = 0; i < index; i++) {
			if (i === index - 1) {
				firstHalf.push(<SidebarElement name={navArray[i]} before={true} icon={navArray[i]} />)
			} else {
				firstHalf.push(<SidebarElement name={navArray[i]} icon={navArray[i]} />)
			}
		}
		for (let i = index; i < navArray.length; i++) {
			if (i === index) {
				secondHalf.push(<SidebarElement name={navArray[i]} selected={true} icon={navArray[i]} />)
			} else if (i === index + 1) {
				secondHalf.push(<SidebarElement name={navArray[i]} first={true} icon={navArray[i]} />)
			} else {
				secondHalf.push(<SidebarElement name={navArray[i]} />)
			}
		}
		console.log([firstHalf, secondHalf])
		return [firstHalf, secondHalf]
	}

	return (
		<>
			<div className={styles.sidebar}>
				<div className={styles.topHalfSidebar}>
					<div className={styles.profileIcon}></div>
					<div className={styles.welcomeMessage}>Welcome back, Domiziano</div>
					<div className={styles.navContainer}>{renderNavigation()[0].map((element) => element)}</div>
				</div>
				<div className={styles.navContainer}>{renderNavigation()[1].map((element) => element)}</div>
				<div className={styles.bottomHalfSidebar}></div>
			</div>
		</>
	)
}

export default Sidebar
