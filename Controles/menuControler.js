const menuSchema = require("../Tables/menus")
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({ storage: storage }).single('image');

// Add menu item with file upload
exports.addmenu = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        try {
            // Ensure the image path is stored in the database
            const menuData = {
                ...req.body,
                image: req.file ? req.file.path : req.body.image
            };

            const menu = new menuSchema(menuData);
            await menu.save();

            return res.status(200).json(menu);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

exports.getSinglemenu = async (req, res) => {
    try {
        const menu = await menuSchema.findById(req.params.id);
        console.log(menu);
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        return res.status(200).json(menu);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const updates = req.body;
        console.log(updates);
        // If an image is uploaded, set the image path in the updates
        if (req.file) {
            updates.image = req.file.path;
        }

        const updatedMenu = await menuSchema.findByIdAndUpdate(menuId, updates, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators on update
        });

        if (!updatedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        return res.status(200).json(updatedMenu);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.menuFindbySellerId = async (req, res) => {
    try {
        const seller = req.body.sellerId;


        const sellerdetails = await menuSchema.find({ sellerId: seller });
        // console.log(sellerdetails);

        if (sellerdetails.length == 0) {
            return res.status(404).json({ mes: "invalide seller id" });
        }
        return res.status(200).json(sellerdetails);


    } catch (error) {
        console.log(error);
    }
}