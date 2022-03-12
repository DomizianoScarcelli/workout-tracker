import React from "react"
import styles from "./SidebarElement.module.css"
import { useNavigate } from "react-router-dom"

export default function SidebarElement(props) {
	const classNames = require("classnames")
	const navigate = useNavigate()

	const iconImage = {
		backgroundImage: `url(/icons/${props.icon}${props.selected ? "-dark" : ""}.svg)`,
	}

	return (
		<div
			className={classNames(styles.container, { [styles.after]: props.first }, { [styles.selected]: props.selected }, { [styles.before]: props.before })}
			onClick={() => {
				navigate("/" + props.icon, { replace: true })
			}}
		>
			<div style={iconImage} className={styles.icon}></div>
			<div className={classNames(styles.element, { [styles.selectedElement]: props.selected })}>{props.name}</div>
		</div>
	)
}
