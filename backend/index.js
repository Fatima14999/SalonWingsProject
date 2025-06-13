const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cors = require('cors')
const app = express();
const SalonRoutes = require("./src/routes/Salonroutes")
const AdminRoutes = require("./src/routes/Admin")
const BookingRoutes = require("./src/routes/Booking")
const CustomerRoutes = require("./src/routes/Customer")
const ServicesRoutes = require("./src/routes/Service")
const SalonOwnerRoutes = require("./src/routes/SalonOwner")
app.use(cors());
const BookingRoutes = require("./src/routes/Booking")
const CustomerRoutes = require("./src/routes/Customer")
const ServicesRoutes = require("./src/routes/Service")
const SalonOwnerRoutes = require("./src/routes/SalonOwner")
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://fatimaghulammustafa:ESHAL1234noor@salon-db-cluster.nkgziif.mongodb.net/SalonWings", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err.message));
// const SalonSchema = new mongoose.Schema({
//     name: String,
//     location: String,
//     contactno: String,
//     rating: Number,
// });
// const Salon = mongoose.model('Salon', SalonSchema);

app.use('/Salon',SalonRoutes);
app.use('/Admin/',AdminRoutes);
app.use('/Booking',BookingRoutes);
app.use('/Customer',CustomerRoutes);
app.use('/Services',ServicesRoutes);
app.use('/SalonOwner',SalonOwnerRoutes);
app.use('/Admin/',AdminRoutes);
app.use('/Booking',BookingRoutes);
app.use('/Customer',CustomerRoutes);
app.use('/Services',ServicesRoutes);
app.use('/SalonOwner',SalonOwnerRoutes);

// ✅ Optional: Route to add a salon (for testing)
// app.post('/Salon', async (req, res) => {
//     try {
//         const newSalon = new Salon(req.body);
//         const saved = await newSalon.save();
//         res.status(201).json(saved);
//     } catch (err) {
//         res.status(400).json({ error: "Invalid data" });
//     }
// });

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
