import SidebarElement from "../components/Sidebar/SidebarElement"

const parseString = (string) => {
	const result = string.replace("-", " ")
	return result.charAt(0).toUpperCase() + result.slice(1)
}
const useRenderNavigation = (selected) => {
	const navArray = ["home", "my-workouts", "analytics", "settings"]
	let firstHalf = []
	let secondHalf = []
	const index = navArray.indexOf(selected)
	for (let i = 0; i < index; i++) {
		const name = parseString(navArray[i])
		if (i === index - 1) {
			firstHalf.push(<SidebarElement name={name} before={true} icon={navArray[i]} />)
		} else {
			firstHalf.push(<SidebarElement name={name} icon={navArray[i]} />)
		}
	}
	for (let i = index; i < navArray.length; i++) {
		const name = parseString(navArray[i])
		if (i === index) {
			secondHalf.push(<SidebarElement name={name} selected={true} icon={navArray[i]} />)
		} else if (i === index + 1) {
			secondHalf.push(<SidebarElement name={name} first={true} icon={navArray[i]} />)
		} else {
			secondHalf.push(<SidebarElement name={name} icon={navArray[i]} />)
		}
	}
	console.log([firstHalf, secondHalf])
	return [firstHalf, secondHalf]
}

export default useRenderNavigation
