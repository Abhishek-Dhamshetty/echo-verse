const express = require('express');
const authApp = express.Router();
const User = require('../models/userAuthorModel'); // Import User model

// ✅ Check User Role API
authApp.get("/check-role/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = authApp;
