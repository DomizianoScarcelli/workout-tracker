const router = require("express").Router()
let User = require("../models/user.model")

router.route("/").get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json("Error: " + err))
})

//Returns the info of the user that is registered with the username passed as parameter
router.route("/info/:username").get((req, res) => {
	const username = req.params.username
	User.find({ username: username })
		.then((user) => res.json(user))
		.catch((err) => res.status(400).json("Error: " + err))
})

router.route("/add").post((req, res) => {
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email
	const newUser = new User({ username, password, email })

	newUser
		.save()
		.then(() =>
			res.json(`User added with the following info: 
		username: ${username}
		passowrd: ${password}
		email: ${email}`)
		)
		.catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
