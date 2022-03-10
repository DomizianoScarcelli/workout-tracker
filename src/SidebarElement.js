import React from "react"
import "./SidebarElement.css"

export default function SidebarElement(props) {
	return (
		<>
			{props.selected ? (
				<div className="container__selected">
					<div className="icon dark"></div>
					<div className="element__selected"> {props.name}</div>
				</div>
			) : (
				<div className={props.first ? "container first" : "container"}>
					<div className="icon"></div>
					<div className="element"> {props.name}</div>
				</div>
			)}
		</>
	)
}
