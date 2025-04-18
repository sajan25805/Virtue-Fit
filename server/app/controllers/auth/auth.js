import { User } from "../../models/User.js";
import { Trainer } from '../../models/Trainer.js';
import bcryptjs from "bcryptjs";
import { generateVerificationCode, generateTokenAndSetCookie } from "../../utils/token.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../../mailtrap/email.js";
import config from "../../config/config.js";

/**
 *
 */


export const checkAuth = async(req,res) => {

	try {

		const user = await User.findById(req.userId);

		if(!user) {
			return res.status(400).json({
				success:false,
				message:"User not Found"
			})
		}

		return res.status(200).json({
			success:true,
			user:{
				...user._doc,
				password: undefined
			}
		})
	}
	catch(error) {
		console.log("Error in Check Auth Function", error)
		res.status(400).json({
			sucess:false,
			message:error.message
		})

	}
}

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      fitnessGoal,
      experienceLevel,
      height,
      weight,
      age,
    } = req.body;


    // User Already Exists
    const userAlreadyExists = await User.findOne({
      email
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User Already exists.",
      });
    }

    const hashedPassword =await bcryptjs.hash(password,10);

    const { verificationToken, verificationTokenExpiresAt }= generateVerificationCode();

    

    const user =  await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        fitnessGoal,
        experienceLevel,
        height,
        weight,
        age,
        verificationToken,
        verificationTokenExpiresAt
      })

      generateTokenAndSetCookie(res, user._id)

      sendVerificationEmail(user.email, verificationToken);


    return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user: {
          ...user._doc,
          password: undefined,
        }
    })
  } catch (error) {

	console.log(error);
    res.status(400).json({
        success: false,
        message: `Error: ${error.message}`
    })
  }
};




export const verifyEmail = async (req, res) => {
	const { code } = req.body;

	try {
		let account = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		let accountType = "User";

		// If not found in User, check Trainer
		if (!account) {
			account = await Trainer.findOne({
				verificationToken: code,
				verificationTokenExpiresAt: { $gt: Date.now() },
			});
			accountType = "Trainer";
		}

		if (!account) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired verification code",
			});
		}

		account.isVerified = true;
		account.verificationToken = undefined;
		account.verificationTokenExpiresAt = undefined;
		await account.save();

		// Get name dynamically based on model
		const fullName =
			accountType === "Trainer"
				? account.name
				: `${account.firstName} ${account.lastName}`;

		await sendWelcomeEmail(account.email, fullName);

		res.status(200).json({
			success: true,
			message: `${accountType} email verified successfully`,
			accountType,
			user: {
				...account._doc,
				password: undefined, // Exclude password from response
			},
		});
	} catch (error) {
		console.error("Error in verifyEmail:", error);
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message || error,
		});
	}
};




export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};



export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};


export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${config.client_url}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
