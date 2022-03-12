import React from "react"
import DaySelector from "../../components/DaySelector/DaySelector"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<Sidebar selected={"home"} />
			<DaySelector />
		</div>
	)
}
