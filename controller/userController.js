import User from "../models/userModel.js";

const updateUserActionController = async (req, res) => {
  try {
    const { name, email, location, lastName } = req.body;
    if (!name || !email || !location || !lastName) {
      return res.status(400).send({
        message: "Please provide all the required fields",
        success: false,
      });
    }
    // Here we are using the id in user._id to find the user and update the user.
    const foundUser = await User.findById({ _id: req.user.userId });
    // if we find the user, then we need to update the user.
    if (foundUser) {
      foundUser.name = name;
      foundUser.email = email;
      foundUser.location = location;
      foundUser.lastName = lastName;
      const updatedUser = await foundUser.save();
      const token = await updatedUser.createSignedJwtToken();
      res.status(200).send({
        message: "User updated successfully",
        success: true,
        data: updatedUser,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error from updateUserActionController while updating user",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  updateUserActionController,
};
