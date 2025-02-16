import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/User.js'; // Adjust the path as needed

export default function (passport) {
    // Configure the local strategy for signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return done(null, false, { message: 'User already exists' });
            }

            // Extract profile data from the request body
            const { firstName, lastName, email, contactInfo } = req.body.profile || {};
            console.log(password)

            // Create a new user with the provided details
            const newUser = new User({
                username,
                password,
                profile: {
                    firstName,
                    lastName,
                    email,
                    contactInfo: {
                        phone: {
                            countryCode: contactInfo?.phone?.countryCode || '',
                            number: contactInfo?.phone?.number || '',
                        },
                        address: {
                            street: contactInfo?.address?.street || '',
                            city: contactInfo?.address?.city || '',
                            state: contactInfo?.address?.state || '',
                            zip: contactInfo?.address?.zip || '',
                        },
                    },
                }
            });

            // Save the new user to the database
            await newUser.save();

            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }));
}
