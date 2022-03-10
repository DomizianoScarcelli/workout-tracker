import "./App.css"
import SidebarElement from "./SidebarElement"

function App() {
	return (
		<>
			<div className="sidebar">
				<div className="top-half-sidebar">
					<div className="profile-icon"></div>
					<div className="welcome-message">Welcome back, Domiziano</div>
				</div>
				<div className="nav-container">
					<SidebarElement name={"Home"} selected={true} iconUrl="/icons/home-dark.svg" />
					<SidebarElement name={"My Workouts"} first={true} iconUrl="/icons/my-workouts.svg" />
					<SidebarElement name={"Analytics"} iconUrl="/icons/analytics.svg" />
					<SidebarElement name={"Settings"} iconUrl="/icons/settings.svg" />
				</div>
				<div className="bottom-half-sidebar"></div>
			</div>
		</>
	)
}

export default App
