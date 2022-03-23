import moment from "moment"

const getDaysOfThisWeek = () => {
	let days = []
	let day = moment().startOf("isoWeek")
	for (let i = 0; i < 7; i++) {
		days.push(day.format("ddd DD"))
		day.add(1, "day")
	}
	return days
}

const getDaysOfThisMonth = () => {
	let days = []
	let day = moment().startOf("month")
	for (let i = 0; i < 35; i++) {
		days.push(day.format())
		day.add(1, "day")
	}
	return days
}

export { getDaysOfThisWeek, getDaysOfThisMonth }
