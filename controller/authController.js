// A controller to handle all the authentication related routes
// 1. An action to handle the register route.
const registerActionController = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        // Validate the user input for required fields
        const errorsMessage = [];
        if(!name){
            errorsMessage.push("Name is required");
        }
        if(!email){
            errorsMessage.push("Email is required");
        }
        if(!password){
            errorsMessage.push("Password is required");
        }
        if(errorsMessage.length > 0){
            return res.status(400).send({
                message: "Error from registerActionController while registering user",
                success: false,
                error: errorsMessage
            });
        }
        /**
         * Check if the user already exists
         * Check if there is already a user with the same email,
         * If yes, then return and redirect to login page.
         */
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(200).send({
                message: "User already exists, please login",
                success: false,
            });
        }
        /**
         * If the user does not exist, then create a new user.
        */
        const newUser = await User.create({
            name, email, password
        });
        res.status(201).send({
            message: "User created successfully",
            success: true,
            data: newUser
        });



        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error from registerActionController while registering user",
            success: false,
            error: error
        });
        
    }

}



module.exports = {
    registerActionController
};