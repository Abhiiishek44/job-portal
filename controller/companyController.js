const Company = require('../models/company');

// Register Company
const registerCompany = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        if (!name || !email || !password || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const company = await Company.create({
            name,
            email,
            password,
            location,
        });

        res.status(201).json({ message: "Company registered successfully", company });
    } catch (err) {
        res.status(500).json({ message: "Error occurred during company registration", error: err.message });
    }
};

// Get Companies by logged-in user (if applicable)
const getCompany = async (req, res) => {
    try {
        const userId = req.id; // from token/middleware
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Company by ID
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Company
const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Export all functions (CommonJS)
module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
};
