
const userSchema = require('../Tables/userReg');
const multer = require('multer');
const path = require('path');
const { use } = require('../Routes/userRouter');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

exports.addUser = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        try {
            // Ensure fields with default values are not overwritten by empty strings
            const userData = {
                ...req.body,
                image: req.file ? req.file.path : req.body.image
            };

            const user = new userSchema(userData);
            await user.save();

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                return res.status(400).json({ error: `${field} already exists` });
            }

            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ mes: "Invalid email ID" });
        }


        if (user.password !== password) {
            return res.status(404).json({ mes: "Invalid password" });
        }


        return res.status(200).json({ mes: "Login successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

exports.getall = async (req, res) => {
    try {
        const user = await userSchema.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
};

exports.getSingle = async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ mes: "invalide user id" });

        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error)
    }
};

exports.delete=async (req,res)=>{
    try {
        const user=await userSchema.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({mes:"invalide user id"});
        }
        return res.status(200).json(user.firstName,'deleted sucessfully');
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.update=async (req,res)=>{
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        try {
            const { id } = req.params;
            const userData = {
                ...req.body,
                image: req.file ? req.file.path : undefined
            };

            // Find user by ID and update
            const user = await userSchema.findByIdAndUpdate(id, userData, { new: true, runValidators: true });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                return res.status(400).json({ error: `${field} already exists` });
            }

            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}