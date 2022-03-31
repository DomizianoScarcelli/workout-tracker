/**
 * Calculates the overall time (duration) of a list of a Session objects
 *
 * @param {*} sessions the Session object on which the overall time has to be calculated
 * @returns
 */
module.exports = getOverallTime = (sessions) => {
	duration = 0
	sessions.forEach((session) => {
		duration += session.duration
	})
	return duration
}
