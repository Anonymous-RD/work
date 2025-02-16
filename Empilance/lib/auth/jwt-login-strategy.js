import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import fs from "fs";
import User from "../../models/User.js";
const publicKey = fs.readFileSync(process.env.RSA_PUBLIC_KEY_PATH, "utf-8");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
};

export default function (passport) {
  passport.use(
    "jwt",
    new JWTStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id).populate("roleId");
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        let userPermissions;
        if (user.userType === "admin") userPermissions = "admin";
        else if (user.roleId === null) userPermissions = null;
        else
          userPermissions = {
            modularPermissions: [...user.roleId.modularPermission],
            functionalPermissions: [
              ...user.roleId.functionalPermissionToAdd,
              ...user.roleId.functionalPermissionToUpdate,
              ...user.roleId.functionalPermissionToDelete,
              ...user.roleId.otherFunctionalPermission,
            ],
          };

        const returnData = {
          jwtInfo: {
            jwtId: jwt_payload.id,
            permission: userPermissions,
          },
        };

        return done(null, returnData);
      } catch (err) {
        return done(err);
      }
    })
  );
}
