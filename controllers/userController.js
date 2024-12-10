const { db } = require('../config/db');
const { v4: uuidv4 } = require('uuid');


exports.getUser = async (req, res) => {
  const { userId } = req.params; // Menggunakan userId dari params
  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        error: {
          details: "The user not found in database. Try creating an account.",
        },
      });
    }

    const userData = userDoc.data();

    return res.status(200).json({
      status: 200,
      message: "Received data successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch user",
      error: {
        details: error.message,
      },
    });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params; // Menggunakan userId dari params
  const updates = req.body;

  try {
    const userRef = db.collection('users').doc(userId);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        error: {
          details: "The user not found in database. Try creating an account.",
        },
      });
    }

    const updatedAt = new Date().toISOString();
    await userRef.update({ ...updates, updatedAt });

    const updatedDoc = await userRef.get();

    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: updatedDoc.data(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to update user",
      error: {
        details: error.message,
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params; // Menggunakan userId dari params

  try {
    const userRef = db.collection('users').doc(userId);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        error: {
          details: "The user not found in database. Try creating an account.",
        },
      });
    }

    await userRef.delete();

    return res.status(200).json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to delete user",
      error: {
        details: error.message,
      },
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 400,
      message: "Missing required field",
      error: {
        details: "Please provide an email."
      }
    });
  }

  try {
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        error: {
          details: "No user found with the provided email."
        }
      });
    }

    const userDoc = querySnapshot.docs[0];
    const resetToken = uuidv4().replace(/-/g, '').slice(0, 16); // Generate reset token
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // Token expires in 15 minutes

    await userDoc.ref.update({ resetToken, resetTokenExpires });

    return res.status(200).json({
      status: 200,
      message: "Password reset token generated successfully",
      data: {
        resetToken,
        expiresAt: resetTokenExpires
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to generate reset token",
      error: {
        details: error.message
      }
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  if (!email || !resetToken || !newPassword) {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields",
      error: {
        details: "Please provide email, resetToken, and newPassword."
      }
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      status: 400,
      message: "Password too short",
      error: {
        details: "Password must be at least 8 characters long."
      }
    });
  }

  try {
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        error: {
          details: "No user found with the provided email."
        }
      });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (
      userData.resetToken !== resetToken ||
      new Date() > new Date(userData.resetTokenExpires)
    ) {
      return res.status(400).json({
        status: 400,
        message: "Invalid or expired reset token",
        error: {
          details: "The reset token is either incorrect or has expired."
        }
      });
    }

    await userDoc.ref.update({
      password: newPassword,
      resetToken: null,
      resetTokenExpires: null,
      updatedAt: new Date().toISOString()
    });

    return res.status(200).json({
      status: 200,
      message: "Password reset successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to reset password",
      error: {
        details: error.message
      }
    });
  }
};

exports.savePlantHistory = async (req, res) => {
  const { userId, className, plantName, analysisResult, confidence } = req.body;

  if (!userId || !className || !plantName || !analysisResult || !confidence) {
      return res.status(400).json({
          status: 400,
          message: "Missing required fields",
          error: {
              details: "Please provide userId, className, plantName, analysisResult, and confidence."
          }
      });
  }

  try {
  
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
          return res.status(404).json({
              status: 404,
              message: "User not found",
              error: {
                  details: `The provided userId '${userId}' does not exist in Firestore.`
              }
          });
      }

      const historyId = uuidv4().replace(/-/g, '').slice(0, 16);
      const timestamp = new Date().toISOString();

      const historyRef = db.collection('histories').doc(historyId);
      const historyData = {
          userId,
          className,
          plantName,
          analysisResult,
          confidence,
          timestamp
      };
      await historyRef.set(historyData);

      return res.status(201).json({
          status: 201,
          message: "Plant history saved successfully",
          data: historyData
      });
  } catch (error) {
      return res.status(500).json({
          status: 500,
          message: "Internal server error",
          error: {
              details: error.message
          }
      });
  }
};

exports.getPlantHistory = async (req, res) => {
  const { userId } = req.params;

  try {
      const historyQuerySnapshot = await db.collection('histories').where('userId', '==', userId).get();

      if (historyQuerySnapshot.empty) {
          return res.status(404).json({
              status: 404,
              message: "No plant history found for this user"
          });
      }

      const histories = historyQuerySnapshot.docs.map(doc => doc.data());

      return res.status(200).json({
          status: 200,
          message: "Plant history retrieved successfully",
          data: histories
      });
  } catch (error) {
      return res.status(500).json({
          status: 500,
          message: "Internal server error",
          error: {
              details: error.message
          }
      });
  }
};
