import React from "react"

export default function SidebarElement(props) {
	const icon = {
		backgroundImage: `url(${props.iconUrl})`,
		width: "20px",
		height: "20px",
		backgroundPosition: "center",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
	}

	const container = {
		cursor: "pointer",
		backgroundColor: props.selected ? "var(--light)" : "var(--purple)",
		display: "flex",
		marginLeft: props.selected ? "1rem" : "",
		flexDirection: "row",
		padding: props.selected ? "0.5rem 0 0.5rem 1rem" : "1rem 0 0 2rem",
		height: "fit-content",
		borderRadius: props.first ? "0 2rem 0 0" : props.selected ? "12rem" : "",
	}

	const element = {
		paddingLeft: "10px",
		fontSize: "22px",
		fontWeight: "bold",
		color: props.selected ? "var(--dark-grey)" : "var(--light)",
	}

	return (
		<div style={container}>
			<div style={icon}></div>
			<div style={element}>{props.name}</div>
		</div>
	)
}
