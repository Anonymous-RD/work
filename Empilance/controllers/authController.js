import mongoose from 'mongoose';
import User from '../models/User.js';
// import msalClient from '../config/msalConfig.js';
// import config from '../config/config.js';
// import logger from '../config/logger.js';

export const forgotPassword = async (req, res, next) => {
    var data = req.body;
    const user = await User.findOne({
        email: data.email
    });

    if (!user) {
        return res.status(409).json({ message: 'User Not Found' });
    }

    data.password = Math.random().toString(36).slice(-8);

    // await email.sendEmail('email_change_password.html', {
    //     email: user.email,
    //     username: user.username,
    //     password: data.password,
    //     subject: 'Your New Password',
    //     name: user.firstName + ' ' + user.lastName,
    //     redirect_url: getLoginByUserType(data.type)
    // }).then(resolve => {
    //     return resolve;
    // }).catch(err => {
    //     throw err;
    // });

    // Update password and history
    // await user.updatePassword(data.password);
    return {};
}

export const resetPassword = async (req, res, next) => {
    var data = req.body;

    if (
        !data.oldPassword ||
        !data.password ||
        !data.passwordConfirm
    )
        return res.status(409).json({ message: 'Missing required fields.' });

    const user = await User.findById(data.jwtInfo.jwtId)

    data.oldPassword = await user.decryptInput(data.oldPassword);
    data.password = await user.decryptInput(data.password);
    data.passwordConfirm = await user.decryptInput(data.passwordConfirm);

    if (data.password !== data.passwordConfirm)
        return res.status(409).json({ message: 'Password does not match the Confirm Password.' });

    if (user && await user.comparePassword(data.oldPassword)) {
        // Check if the new password is in history
        const isInHistory = await user.isPasswordInHistory(data.password);
        if (isInHistory) {
            return res.status(409).json({ message: 'Cannot reuse old passwords.' });
        }

        // Update password and history
        await user.updatePassword(data.password);
        return res.status(200).json({ message: 'Password reset successfully.' });
    } else {
        return res.status(409).json({ message: 'Wrong old password.' })
    }

    // await email.sendEmail('email_change_password.html', {
    //     email: user.email,
    //     username: user.username,
    //     password: data.password,
    //     subject: 'Your New Password',
    //     name: user.firstName + ' ' + user.lastName,
    //     redirect_url: getLoginByUserType(data.type)
    // }).then(resolve => {
    //     return resolve;
    // }).catch(err => {
    //     throw err;
    // });
}

// // Azure SSO login logic
// export const azureLogin = (req, res, next) => {
//     passport.authenticate('azuread-openidconnect', (err, user, info) => {
//         if (err) {
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         if (!user) {
//             return res.status(401).json({ message: "SSO login failed" });
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: "Internal server error" });
//             }
//             return res.status(200).json({ message: "SSO login successful", user });
//         });
//     })(req, res, next);
// };

// // Azure SSO callback logic
// export const azureCallback = (req, res, next) => {
//     passport.authenticate('azuread-openidconnect', (err, user, info) => {
//         if (err) {
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         if (!user) {
//             return res.status(401).json({ message: "SSO login failed" });
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: "Internal server error" });
//             }
//             return res.status(200).json({ message: "SSO login successful", user });
//         });
//     })(req, res, next);
// };


// // Logout logic
// export const logout = (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ message: "Internal server error" });
//         }
//         res.status(200).json({ message: "Logout successful" });
//     });
// };


// export const azureLogin = (req, res) => {
//   const authUrl = msalClient.getAuthCodeUrl({
//     scopes: ['openid', 'profile', 'User.Read'],
//     redirectUri: config.azureAD.redirectURI
//   });

//   authUrl.then(url => {
//     res.redirect(url);
//   }).catch(error => {
//     logger.error('Auth URL Error:', error);
//     res.status(500).send('Authentication error');
//   });
// };

// export const azureCallback = (req, res) => {
//   const tokenRequest = {
//     code: req.query.code,
//     scopes: ['openid', 'profile', 'User.Read'],
//     redirectUri: config.azureAD.redirectURI
//   };

//   msalClient.acquireTokenByCode(tokenRequest).then(response => {
//     req.session.user = response.account;
//     logger.info(`User ${response.account.username} authenticated`);
//     res.redirect('/');
//   }).catch(error => {
//     logger.error('Token Acquisition Error:', error);
//     res.status(500).send('Authentication error');
//   });
// };