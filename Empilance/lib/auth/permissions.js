
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../models/User.js';
import fs from 'fs'

const publicKey = fs.readFileSync(process.env.RSA_PUBLIC_KEY_PATH, 'utf-8');

export default function (passport) {
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey  
};


passport.use('permissions',new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.id).populate('roleId');
        if(user.userType==='admin') return done(null, user.userType); 
        const userPermissions=[...user.roleId.modularPermission,...user.roleId.functionalPermissionToAdd,...user.roleId.functionalPermissionToUpdate,...user.roleId.functionalPermissionToDelete,...user.roleId.otherFunctionalPermission]

        if (!user) return done(null, false);
        return done(null, userPermissions); 
    } catch (error) {
        return done(error, false);
    }
}));
}
