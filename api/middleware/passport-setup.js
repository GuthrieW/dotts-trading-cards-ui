const Passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy();
const User = require('./../models/User');

console.log(Passport);

Passport.serializeUser((user, done) => {
	done(null, user.id);
});

Passport.deserializeUser((id, done) => {
	User.findById((id) => {
		done(error, user);
	});
});

Passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:8080/signin/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			console.log('Passport callback function fired');
			console.log(profile);
		}
	)
);

console.log(Passport);

module.exports = Passport;

// Passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: 'http://localhost:8080/signin/callback',
// 			// callbackURL: process.env.SERVER_URL + '/login/callback',
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			// use profile.id to check if the user is registered in the users in our DB
// 			User.findOrCreate({ googleId: profile.id }, (error, user) => {
// 				return done(error, user);
// 			});
// 		}
// 	)
// );
