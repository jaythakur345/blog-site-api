const router = require('express').Router();
const Users = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

// GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(400).json(error);
    }

});

// UPDATE USER
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            )
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        const user = await Users.findById(req.params.id);
        if (user) {
            try {
                await Post.deleteMany({ username: user.username });
                await Users.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted....")
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(400).json("User not found");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
})


module.exports = router;