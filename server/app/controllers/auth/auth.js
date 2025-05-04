import { User } from "../../models/User.js";
import { Trainer } from '../../models/Trainer.js';
import bcryptjs from "bcryptjs";
import { generateVerificationCode, generateTokenAndSetCookie } from "../../utils/token.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../../mailtrap/email.js";
import config from "../../config/config.js";
import { uploadToCloudinary } from '../../config/cloudinary.js';
import fs from 'fs';

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
	  const { file } = req;
	  let profilePictureUrl = "";
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
  
	  const userExists = await User.findOne({ email });
	  if (userExists) {
		return res.status(400).json({ success: false, message: "User already exists." });
	  }
  
	  if (file) {
		profilePictureUrl = await uploadToCloudinary(file.path, "image");
		fs.unlinkSync(file.path);
	  }
  
	  const hashedPassword = await bcryptjs.hash(password, 10);
	  const { verificationToken, verificationTokenExpiresAt } = generateVerificationCode();
  
	  const user = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		fitnessGoal,
		experienceLevel,
		height,
		weight,
		age,
		profilePicture: profilePictureUrl,
		verificationToken,
		verificationTokenExpiresAt
	  });
  
	  await sendVerificationEmail(email, verificationToken);
	  generateTokenAndSetCookie(res, user._id);
  
	  return res.status(201).json({
		success: true,
		message: "User registered successfully. Please verify your email.",
		user: {
		  _id: user._id,
		  email: user.email,
		  firstName: user.firstName,
		  lastName: user.lastName,
		  profilePicture: user.profilePicture,
		  isVerified: user.isVerified,
		},
	  });
	} catch (error) {
	  console.error("Signup Error:", error);
	  res.status(500).json({ success: false, message: `Error: ${error.message}` });
	}
  };
  


export const resendVerificationEmail = async (req, res) => {
	const { email } = req.body;
  
	try {
	  // Check if user or trainer exists with that email
	  let account = await User.findOne({ email });
	  let accountType = "User";
  
	  if (!account) {
		account = await Trainer.findOne({ email });
		accountType = "Trainer";
	  }
  
	  if (!account) {
		return res.status(404).json({
		  success: false,
		  message: "Account not found with that email",
		});
	  }
  
	  if (account.isVerified) {
		return res.status(400).json({
		  success: false,
		  message: "Account is already verified",
		});
	  }
  
	  // Generate new verification token
	  const { verificationToken, verificationTokenExpiresAt } = generateVerificationCode();
	  account.verificationToken = verificationToken;
	  account.verificationTokenExpiresAt = verificationTokenExpiresAt;
	  await account.save();
  
	  await sendVerificationEmail(account.email, verificationToken);
  
	  res.status(200).json({
		success: true,
		message: `Verification email resent to ${email}`,
	  });
	} catch (error) {
	  console.error("Error in resendVerificationEmail:", error);
	  res.status(500).json({
		success: false,
		message: "Server error",
	  });
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



export const updateProfile = async (req, res) => {
	try {
	  const { file } = req;
	  const updates = { ...req.body };
  
	  if (file) {
		updates.profilePicture = await uploadToCloudinary(file.path, "image");
		fs.unlinkSync(file.path);
	  }
  
	  const user = await User.findByIdAndUpdate(req.userId, updates, {
		new: true
	  }).select("-password");
  
	  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
	  res.status(200).json({
		success: true,
		message: "User profile updated",
		user
	  });
	} catch (error) {
	  console.error("Profile update error:", error);
	  res.status(500).json({ success: false, message: error.message });
	}
  };
  
  
  // DELETE /api/auth/delete-account
  export const deleteAccount = async (req, res) => {
	try {
	  const user = await User.findByIdAndDelete(req.userId);
	  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
	  res.clearCookie("token");
	  res.status(200).json({ success: true, message: "Account deleted" });
	} catch (error) {
	  res.status(500).json({ success: false, message: error.message });
	}
  };

// PATCH /api/auth/change-password
export const updatePassword = async (req, res) => {
	try {
	  const { currentPassword, newPassword } = req.body;
  
	  if (!currentPassword || !newPassword) {
		return res.status(400).json({ success: false, message: "Both current and new passwords are required" });
	  }
  
	  const user = await User.findById(req.userId);
	  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
	  const isMatch = await bcryptjs.compare(currentPassword, user.password);
	  if (!isMatch) {
		return res.status(401).json({ success: false, message: "Incorrect current password" });
	  }
  
	  const hashed = await bcryptjs.hash(newPassword, 10);
	  user.password = hashed;
	  await user.save();
  
	  res.status(200).json({ success: true, message: "Password updated successfully" });
	} catch (err) {
	  console.error("Error updating password:", err);
	  res.status(500).json({ success: false, message: "Something went wrong" });
	}
  };
  