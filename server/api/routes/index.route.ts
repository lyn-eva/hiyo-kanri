import { Express } from 'express'

const version = '/api/v1'

module.exports = (app: Express) => {
	// app.use(version + '/item', require('./item.route'))
	// app.use(version + '/user', require('./user.route'))
	// app.use(version + '/auth', require('./auth.route'))
	app.use(version + '/', require('./expense.route'))
}
