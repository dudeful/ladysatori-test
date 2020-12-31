const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const ddb = require('./DDB');

passport.serializeUser((user, done) => {
  if (user.Item.googleID) {
    done(null, user.Item.googleID.S);
  } else if (user.Item.facebookID) {
    done(null, user.Item.facebookID.S);
  } else if (user.Item.twitterID) {
    done(null, user.Item.twitterID.S);
  }
});

passport.deserializeUser((googleID, done) => {
  ddb
    .getUser({ key: { googleID: { S: googleID } }, table: 'users_google' })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.deserializeUser((facebookID, done) => {
  ddb
    .getUser({ key: { facebookID: { S: facebookID } }, table: 'users_facebook' })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.deserializeUser((twitterID, done) => {
  ddb
    .getUser({ key: { twitterID: { S: twitterID } }, table: 'users_twitter' })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/google/redirect',
      callbackURL: 'http://localhost:5000/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      ddb
        .getUser({ key: { googleID: { S: profile.id } }, table: 'users_google' })
        .then((user) => {
          if (user.Item) {
            //User already exists
            return done(null, user);
          } else {
            //User does not exists, therefore create user
            const newUser = {
              table: 'users_google',
              Item: {
                googleID: { S: profile.id },
                username: { S: profile.displayName },
                email: { S: profile._json.email },
                emailVerified: { BOOL: profile._json.email_verified },
                fName: { S: profile._json.given_name },
                lName: { S: profile._json.family_name },
                locale: { S: profile._json.locale },
                picture: { S: profile._json.picture },
                createdAt: { S: new Date(Date.now()).toLocaleString() },
              },
              condition: 'attribute_not_exists(googleID)',
            };

            ddb
              .createUser(newUser)
              .then(() => {
                return done(null, newUser);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      //options for the Facebook Strategy
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      // callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/facebook/redirect',
      callbackURL: 'http://localhost:5000/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user

      ddb
        .getUser({ key: { facebookID: { S: profile.id } }, table: 'users_facebook' })
        .then((user) => {
          if (user.Item) {
            //User already exists
            return done(null, user);
          } else {
            //User does not exists, therefore create user
            const newUser = {
              table: 'users_facebook',
              Item: {
                facebookID: { S: profile._json.id },
                username: { S: profile._json.name },
                email: { S: profile._json.email },
                picture: { S: profile._json.picture.data.url },
                createdAt: { S: new Date(Date.now()).toLocaleString() },
              },
              condition: 'attribute_not_exists(facebookID)',
            };

            ddb
              .createUser(newUser)
              .then(() => {
                return done(null, newUser);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      //options for the Twitter Strategy
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      // callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/twitter/redirect',
      callbackURL: 'http://localhost:5000/auth/twitter/redirect',
    },
    (token, tokenSecret, profile, done) => {
      //Check existing user
      ddb
        .getUser({ key: { twitterID: { S: profile._json.id_str } }, table: 'users_twitter' })
        .then((user) => {
          if (user.Item) {
            //User already exists
            return done(null, user);
          } else {
            //User does not exists, therefore create user
            const newUser = {
              table: 'users_twitter',
              Item: {
                twitterID: { S: profile._json.id_str },
                username: { S: profile._json.name },
                picture: { S: profile._json.profile_image_url },
                createdAt: { S: new Date(Date.now()).toLocaleString() },
              },
              condition: 'attribute_not_exists(twitterID)',
            };

            ddb
              .createUser(newUser)
              .then(() => {
                return done(null, newUser);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
