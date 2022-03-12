import React from "react"
import styles from "./SidebarElement.module.css"

export default function SidebarElement(props) {
	const classNames = require("classnames")

	const iconImage = {
		backgroundImage: `url(${props.iconUrl})`,
	}

	return (
		<div className={classNames(styles.container, { [styles.after]: props.first }, { [styles.selected]: props.selected }, { [styles.before]: props.before })}>
			<div style={iconImage} className={styles.icon}></div>
			<div className={classNames(styles.element, { [styles.selectedElement]: props.selected })}>{props.name}</div>
		</div>
	)
}
