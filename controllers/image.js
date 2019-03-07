const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7752ae14f5854893b8167c037ca5e045'
});

const handleApiCall = (req,res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req,res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => {
	  	res.status(400).json('cant increase count')
	  })
}

module.exports = {
	handleImage,
	handleApiCall
}