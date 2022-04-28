import React from "react"
import styles from "./ConfirmationModal.module.css"
import Modal from "react-modal"
import { motion } from "framer-motion"

Modal.setAppElement("#root")

export default function ConfirmationModal(props) {
	function closeModal() {
		props.setModalIsOpen(false)
	}

	function confirmAndClose() {
		props.onConfirm()
		closeModal()
	}

	function discardAndClose() {
		props.onDiscard()
		closeModal()
	}

	return (
		<div>
			<Modal isOpen={true} onRequestClose={closeModal} shouldCloseOnOverlayClick={false} className={styles.container} contentLabel="Confirm delete?">
				<div className={styles.title}>Do you want to delete this workout?</div>
				<div className={styles.innerContainer}>
					<motion.div
						whileHover={{
							scale: 1.1,
						}}
						className={styles.folder}
					>
						<div className={`${styles.title}`} onClick={confirmAndClose}>
							Yes
						</div>
					</motion.div>
					<motion.div
						whileHover={{
							scale: 1.1,
						}}
						className={styles.folder}
					>
						<div className={`${styles.title}`} onClick={discardAndClose}>
							No
						</div>
					</motion.div>
				</div>
			</Modal>
		</div>
	)
}
