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
					<SidebarElement name={"Home"} selected={true} />
					<SidebarElement name={"My Workouts"} first={true} />
					<SidebarElement name={"Analytics"} />
					<SidebarElement name={"Settings"} />
				</div>
				<div className="bottom-half-sidebar"></div>
			</div>
		</>
	)
}

export default App
