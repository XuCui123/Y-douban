module.exports = {
	port: 3000,
	session: {
		secret: 'ygames',
		key: 'ygames',
		maxAge: 2592000000
	},
	mongodb: 'mongodb://localhost:12345/ygames'
}