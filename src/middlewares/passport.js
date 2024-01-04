import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { userManager } from '../models/UserMongoose.js'
import { githubCallbackUrl, githubClientId, githubClientSecret } from '../config.js'

passport.use('github', new GithubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accesToken, refreshToken, profile, done){
  /* console.log(profile) */
  const user = await userManager.findOne({ email: `${profile.username} (Github)` })
  if(user){
    return done(null, {...user.public(), role: 'user'})
  }
  try{
    let reg
    if(profile.displayName){
      reg = await userManager.create({
        email: `${profile.username} (Github)`,
        password: '.',
        username: profile.displayName
      })
    }
    else{
      reg = await userManager.create({
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
    const userData = await userManager.register(req.body)
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
    const userData = await userManager.authenticate(email, password)
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