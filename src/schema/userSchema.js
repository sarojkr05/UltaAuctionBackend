import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [3, "First name must be atleast 3 character long"],
        lowercase: true,
        trim: true, // if the user gives extra spaces then it will automatically remove it
        maxlength: [15, "First name should be less than or equal to 15 characters"]
    },

    lastName: {
        type: String,
        minlength: [3, "First name must be atleast 3 character long"],
        lowercase: true,
        trim: true, // if the user gives extra spaces then it will automatically remove it
        maxlength: [15, "First name should be less than or equal to 15 characters"]
    },

    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [12, "Phone number should be atmost 10 digits long"],
        minlength: [10, "Phone number should be atleast 12 digits long"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number should be provided"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provoided"],
        unique: [true, "Email is already in use"],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Please fill a valid password"]
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    address: {
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function () {
    // here u can modify your user before it is ssaved in mongodb
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

export const User = mongoose.model("User", userSchema); // User Collection