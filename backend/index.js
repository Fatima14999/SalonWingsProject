const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://fatimaghulammustafa:ESHAL1234noor@salon-db-cluster.nkgziif.mongodb.net/SalonWings", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// Simple test route
app.get('/', (req, res) => {
    res.send('SalonWings API is running');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
