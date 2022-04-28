import React from "react"
import styles from "./WorkoutAddedModal.module.css"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

Modal.setAppElement("#root")

export default function WorkoutAddedModal(props) {
	const navigate = useNavigate()

	function closeModal() {
		props.setModalIsOpen(false)
	}

	function navigateToHistory() {
		navigate("/history")
	}

	function navigateToMyWorkouts() {
		navigate("/my-workouts")
	}

	return (
		<div>
			<Modal isOpen={true} onRequestClose={closeModal} className={styles.container} onAfterClose={navigateToMyWorkouts} contentLabel="Workout Added">
				<div className={styles.closeButton} onClick={closeModal}></div>
				<div className={styles.title}>The workout has been added in the</div>
				<div className={styles.innerContainer}>
					<motion.div
						whileHover={{
							scale: 1.1,
						}}
						className={styles.folder}
					>
						<div className={styles.title} onClick={navigateToHistory}>
							History
						</div>
					</motion.div>
					{props.save && (
						<>
							<div className={styles.title}>and</div>
							<motion.div
								whileHover={{
									scale: 1.1,
								}}
								className={styles.folder}
							>
								<div className={styles.title} onClick={navigateToMyWorkouts}>
									My Workouts
								</div>
							</motion.div>
						</>
					)}
				</div>
			</Modal>
		</div>
	)
}
