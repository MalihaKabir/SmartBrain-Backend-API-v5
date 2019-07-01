const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect form submission');
	}
	db
		.select('email', 'hash')
		.from('login')
		.where('email', '=', email)
		.then((data) => {
			const isValid = bcrypt.compareSync(password, data[0].hash); // true

			if (isValid) {
				return db
					.select('*')
					.from('users')
					.where('email', '=', email)
					.then((user) => {
						res.json(user[0]);
					})
					.catch((err) => res.status(400).json('Unable to signin'));
			} else {
				res.status(400).json('Incorrect email or password.');
			}
		})
		.catch((err) =>
			res.status(400).json('Signing in failed. Wrong credentials. Please register before signing in.')
		);
};

module.exports = {
	handleSignin
};
