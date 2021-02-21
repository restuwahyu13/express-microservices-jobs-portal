res.on('finish', () => {
	if (res.statusCode >= 400) {
		consola.info(
			chalk.red(
				'[Logger]:',
				JSON.stringify({
					serviceName: serviceName,
					ipAddress: req.ip || req.headers['x-forwarded-host'] || req.connection.remoteAddress,
					path: req.url,
					method: req.method,
					status: res.statusCode,
					timestamp: dateFormat(new Date()).format('LLLL')
				})
			)
		)
	} else {
		consola.info(
			chalk.green(
				'[Logger]:',
				JSON.stringify({
					serviceName: serviceName,
					ipAddress: req.ip || req.headers['x-forwarded-host'] || req.connection.remoteAddress,
					path: req.url,
					method: req.method,
					status: res.statusCode,
					timestamp: dateFormat(new Date()).format('LLLL')
				})
			)
		)
	}
})
