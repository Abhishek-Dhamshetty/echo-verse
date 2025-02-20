const express = require('express');
const adminApp = express.Router();
const admin=require('../models/adminModel')
const { verifyAdmin } = require('./verifyAdmin');  // Ensure only Admin can access
const User = require('../models/userAuthorModel'); // Import User model


adminApp.post("/admin-login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, role: "admin" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
// ✅ Admin API Base Route
adminApp.get("/", (req, res) => {
    res.send({ message: "Welcome to Admin API" });
});

// ✅ Get all users & authors (Only Admin can access)
adminApp.get("/users", verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}, 'name email role isBlocked'); // Fetch specific fields
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}); 

// ✅ Toggle user block/unblock status
adminApp.put("/toggle-block/:userId", verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.isBlocked = !user.isBlocked;  // Toggle block status
        await user.save();

        res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user status' });
    }
});

module.exports = adminApp;
