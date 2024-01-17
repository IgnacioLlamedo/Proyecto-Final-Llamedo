import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { User } from '../models/UserMongoose.js'
import config from '../config.js'

const githubClientId = config.ghClId
const githubClientSecret = config.ghClSec
const githubCallbackUrl = config.ghCBUrl

passport.use('github', new GithubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accesToken, refreshToken, profile, done){
  /* console.log(profile) */
  const user = await User.findOne({ email: `${profile.username} (Github)` })
  if(user){
    return done(null, {...user.public(), role: 'user'})
  }
  try{
    let reg
    if(profile.displayName){
      reg = await User.create({
        email: `${profile.username} (Github)`,
        password: '.',
        username: profile.displayName
      })
    }
    else{
      reg = await User.create({
        email: `${profile.username} (Github)`,
        password: '.',
        username: 'Username Not Found'
      })
    }
    done(null, {...reg.public(), role: 'user'})
  }
  catch(error){
    done(error)
  }
}))

passport.use('register', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
}, async(req, username, password, done) => {
  try{
    const userData = await User.register(req.body)
    done(null, userData)
  }
  catch(error){
    done(error)
  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try{
    const userData = await User.authenticate(email, password)
    done(null, userData)
  }
  catch(error){
    done(error)
  }
}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function authentication(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}