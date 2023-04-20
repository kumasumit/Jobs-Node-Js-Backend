// A controller to handle all the authentication related routes
// 1. An action to handle the register route.
const registerActionController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validate the user input for required fields
    const errorsMessage = [];
    if (!name) {
      errorsMessage.push("Name is required");
    }
    if (!email) {
      errorsMessage.push("Email is required");
    }
    if (!password) {
      errorsMessage.push("Password is required");
    }
    if (errorsMessage.length > 0) {
      return res.status(400).send({
        message: "Error from registerActionController while registering user",
        success: false,
        error: errorsMessage,
      });
    }
    /**
     * Check if the user already exists
     * Check if there is already a user with the same email,
     * If yes, then return and redirect to login page.
     */
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        message: "User already exists, please login",
        success: false,
      });
    }
    /**
     * If the user does not exist, then create a new user.
     */
    const newUser = await User.create({
      name,
      email,
      password,
    });
    // After the user is created, we need to create a token for the user.
    const token = newUser.createSignedJwtToken();
    // before sending the response, we need to remove the password from the response.
    newUser.password = undefined;
    res.status(201).send({
      message: "User created successfully",
      success: true,
      data: newUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error from registerActionController while registering user",
      success: false,
      error: error,
    });
  }
};

// 2. An action to handle the login route.
const loginActionController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the user input for required fields
    const errorsMessage = [];
    if (!email) {
      errorsMessage.push("Email is required");
    }
    if (!password) {
      errorsMessage.push("Password is required");
    }
    if (errorsMessage.length > 0) {
      console.log(errorsMessage);
      return res.status(400).send({
        message: "Error from loginActionController while logging a user",
        success: false,
        error: errorsMessage,
      });
    }
    /**
     * Find whether any user exists with the given email
     */
    const foundExistingUser = User.findOne({ email: email });
    if (!foundExistingUser) {
      return res.status(400).send({
        message: `User with ${email} does not exist, please register`,
        success: false,
      });
    }
    // Now we check for the password, if the password entered is the correct password or not
    const isPasswordsMatched = await foundExistingUser.comparePassword(
      password
    );
    // If the password does not match, then return an error
    if (!isPasswordsMatched) {
      return res.status(400).send({
        message: "Invalid credentials, please try again",
        success: false,
      });
    }
    // If the password matches, then create a token for the user
    const token = foundExistingUser.createSignedJwtToken();
    // Before sending the response, we make password as undefined so that the password is not sent in response
    foundExistingUser.password = undefined;
    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      data: foundExistingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error from loginActionController while logging a user",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  registerActionController,
  loginActionController,
};
