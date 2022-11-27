import pkg from "passport-jwt";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
import * as dotenv from "dotenv";

dotenv.config();

import UserSchema from "../models/UserSchema.js";

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            UserSchema.findById(jwt_payload._id, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err, false);
                }
                if (user) {
                    console.log(user);
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        })
    );
};