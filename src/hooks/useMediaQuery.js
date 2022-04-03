import { useState, useEffect } from "react"

/**
 * Code from: https://samuelkraft.com/blog/responsive-animation-framer-motion
 * @param {*} query
 * @returns
 */
export function useMediaQuery(query) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => {
			setMatches(media.matches)
		}
		media.addListener(listener)
		return () => media.removeListener(listener)
	}, [matches, query])

	return matches
}
