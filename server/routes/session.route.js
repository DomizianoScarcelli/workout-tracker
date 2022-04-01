const router = require("express").Router()
let Session = require("../models/session.model")
const mongoose = require("mongoose")
const moment = require("moment")
const { getOverallTime, getExerciseIndexIfExists } = require("../utils/SessionsUtils")
const daysBetweenInterval = require("../utils/DateTimeUtils")

/**
 * Gets all the sessions in the DB
 * The sessions can be filtered by id
 */
router.route("/").get((req, res) => {
	if (req.query.id != null) {
		Session.findById(req.query.id)
			.then((session) => res.json(session))
			.catch((err) => res.status(400).json("Error: " + err))
	} else {
		Session.find()
			.then((session) => res.json(session))
			.catch((err) => res.status(400).json("Error: " + err))
	}
})

/**
 * Gets all the session of a certain user
 */
router.route("/:username").get((req, res) => {
	Session.find({ user: req.params.username })
		.then((session) => res.json(session))
		.catch((err) => res.status(400).json("Error: " + err))
})

/**
 * Creates a new session
 * Body requires a "duration" field
 */
router.route("/create").post((req, res) => {
	let exercises = []
	if (exercises != undefined) {
		exercises = req.body.exercises
	}
	const duration = req.body.duration
	const user = req.body.user
	const date = new Date()
	const newSession = new Session({ exercises, duration, user, date })

	newSession
		.save()
		.then(() =>
			res.json(`Session added with the following info:
		exercises: ${exercises},
		duration: ${duration},
		user: ${user},
		date: ${date}`)
		)
		.catch((err) => res.status(400).json("Error: " + err))
})

/**
 * Push a new exercise inside a session
 * Body requires the name of the exercise and the repetition
 */
router.route("/addexercise/:session").post((req, res) => {
	const name = req.body.name
	const id = mongoose.Types.ObjectId(req.params.session)
	const repetition = req.body.repetition
	Session.updateOne(
		{ _id: id },
		{
			$push: {
				exercises: {
					name: name,
					repetition: repetition,
				},
			},
		}
	)
		.then(() => res.json("Exercises added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

/**
 * Gets all the user (specified inside the :username field) sessions of the current week
 */
router.route("/:username/weekly-workouts").get((req, res) => {
	const username = req.params.username
	Session.find({ user: username, date: { $gt: moment().startOf("isoWeek"), $lt: moment().endOf("isoWeek") } })
		.sort("date")
		.then((sessions) => res.json(sessions))
})

/**
 * Gets all the user (specified inside the :username field) sessions of the current month
 */
router.route("/:username/monthly-workouts").get((req, res) => {
	const username = req.params.username
	Session.find({ user: username, date: { $gt: moment().startOf("month"), $lt: moment().endOf("month") } })
		.sort("date")
		.then((sessions) => res.json(sessions))
})

/**
 * Return the total minutes of workout that the user has done in the selected day
 * Query params are formatted as following: "YYYY-MM-DD"
 */
router.route("/:username/workout-time-day").get(async (req, res) => {
	const username = req.params.username
	const day = moment(req.query.day)
	try {
		const sessions = await Session.find({ user: username, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
		res.json(getOverallTime(sessions))
	} catch (err) {
		res.json(err.message)
	}
})

/**
 * Return the total minutes of workout that the user has done in the selected time period
 * Query params are formatted as following: "YYYY-MM-DD"
 * The period inclued both the startTime and the endTime
 */
router.route("/:username/workout-time-period").get(async (req, res) => {
	const username = req.params.username
	const startTime = moment(req.query.startTime)
	const endTime = moment(req.query.endTime)
	const daysBetween = daysBetweenInterval(startTime, endTime)
	//Gets the overall workout time of every day and puts it into an object
	let result = []
	try {
		for (const day of daysBetween) {
			const sessions = await Session.find({ user: username, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
			result.push({ date: day, duration: getOverallTime(sessions) })
		}
		console.log(result)
		res.json(result)
	} catch (err) {
		res.json(err.message)
	}
})

/**
 * TODO: Work in progress
 * Return the 10 most frequent exercises with their relative total repetition that the user
 * did in the inserted time period.
 *
 * Query params are formatted as following: "YYYY-MM-DD"
 * The period inclued both the startTime and the endTime
 *
 *[
		{
			name: "Push Ups",
			repetition: 200,
		},
		{
			name: "Crunches",
			repetition: 140,
		},
		{
			name: "Squats",
			repetition: 120,
		},
	]
 *
 *
 */
router.route("/:username/most-frequent-exercises").get(async (req, res) => {
	const username = req.params.username
	const startTime = moment(req.query.startTime)
	const endTime = moment(req.query.endTime)
	const daysBetween = daysBetweenInterval(startTime, endTime)
	let result = []
	for (let day of daysBetween) {
		const sessions = await Session.find({ user: username, exercises: { $ne: [] }, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
		for (let workout of sessions) {
			if (workout.exercises == undefined) return
			for (let exercise of workout.exercises) {
				if (!getExerciseIndexIfExists(result, exercise.name)) {
					result.push({ name: exercise.name, repetition: exercise.repetition })
				} else {
					result[getExerciseIndexIfExists(result, exercise.name)].repetition += exercise.repetition //Questo coso da errore
				}
			}
		}
	}
	result
		.sort((a, b) => {
			if (a.repetition > b.repetition) return 1
			if (a.repetition < b.repetition) return -1
			return 0
		})
		.reverse()
	res.json(result)
})

module.exports = router
