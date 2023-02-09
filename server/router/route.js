import { Router } from "express";
const router = Router();

/** import all controllers  */
import * as controller from '../controllers/appController.js';
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";


/** POST Methods */
router.post('/register', controller.register); //register user
router.post('/registerMail', registerMail); //send the mail
router.post('/authenticate', controller.verifyUser, (req, res) => res.end()); // authenticate user
router.post('/login', controller.verifyUser, controller.login); // login in app


/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateuser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password





export default router;