const Clarifai = require('clarifai');

// You MUST get your own API from clarifai. See README.md file for details.
const app = new Clarifai.App({
	apiKey: 'Your_Own_API_KEY'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => res.json(data))
		.catch((err) => res.status(400).json('Unable to work with API.'));
};

const handleImgEntries = (req, res, db) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1) // increment(column, amount)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImgEntries,
	handleApiCall
};
