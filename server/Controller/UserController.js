const User = require('../Models/User');

const getData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username, 
            email,
            password, 
        });

        await newUser.save();
        console.log("User saved",newUser)
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async(req,res)=>{
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (user.password!=password) {
            console.log("incorrect pass");
            return res.status(400).json({ message: 'Invalid Pass' });
        }
        res.status(200).json({message:'some data' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { getData,signup,login};