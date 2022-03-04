const { Strategy, ExtractJwt } = require('passport-jwt')

const { config } = require('../../../config/config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const jwtStrategy = new Strategy(options, (jwtPayload, done) => {
  return done(null, jwtPayload)
})

module.exports = jwtStrategy
