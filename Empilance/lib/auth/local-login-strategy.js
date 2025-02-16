import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/User.js";
import CryptoJS from "crypto-js";
import logger from "../../config/logger.js";

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function (passport) {
  // Configure the local strategy for login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          //Decrypting username
          console.log(
            CryptoJS.AES.encrypt(
              username,
              process.env.SESSION_SECRET
            ).toString(),
            16,
            CryptoJS.AES.encrypt(
              password,
              process.env.SESSION_SECRET
            ).toString()
          );
          let decryptUsername = CryptoJS.AES.decrypt(
            username,
            process.env.BASIC_AUTH_SECRET
          ).toString(CryptoJS.enc.Utf8);
          const user = await User.findOne({ username: decryptUsername });
          if (!user) {
            logger.error("User not found");
            return done(null, false, { message: "No user found" });
          }

          const now = new Date();

          // Check if account is locked
          if (user.lockoutUntil && now < user.lockoutUntil) {
            logger.error(
              `User with username ${decryptUsername} account temporary blocked.`
            );
            throw `Account is temporary locked. Try again after ${user.lockoutUntil.toLocaleTimeString()}.`;
          }

          //Decrypting password
          const decryptedPassword = await user.decryptInput(password);

          const isMatch = await user.comparePassword(decryptedPassword);

          if (!isMatch) {
            user.failedLoginAttempts += 1;
            user.lastFailedLogin = now;

            // Check if we need to lock the account
            if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
              user.lockoutUntil = new Date(now.getTime() + LOCKOUT_DURATION);
              user.failedLoginAttempts = 0; // Reset failed attempts after setting lockout
            }

            await user.save();
            const message = user.lockoutUntil
              ? `Account is temporary locked. Try again after ${user.lockoutUntil.toLocaleTimeString()}.`
              : `Invalid credentials. Remaining ${
                  3 - user.failedLoginAttempts
                } more Attempt`;

            logger.error(`User with username ${decryptUsername} logged failed`);
            return done(null, false, { message: message });
          }
          user.failedLoginAttempts = 0;
          if (user.status === "new") user.status = "active";
          await user.save();
          logger.info(
            `User with username ${decryptUsername} logged in successfully.`
          );
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}
