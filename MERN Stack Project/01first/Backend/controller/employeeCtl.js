const employeeSchema = require("../model/employeeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middlewares/mailer");

module.exports.login = async (req, res) => {
  try {
    const employee = await employeeSchema.findOne({ email: req.body.email });
    if (!employee) return res.status(401).json({ message: "Invalid Email" });

    const isCompare = await bcrypt.compare(
      req.body.password,
      employee.password
    );
    if (isCompare) {
      const token = jwt.sign({ employeeData: employee }, "node");
      res.status(200).json({ msg: "Login Successfully", token,user : employee });
    } else {
      res.status(200).json({ message: "Wrong Password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Login admin", error });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const employee = await employeeSchema.findById(req.user.employeeData._id);
    res.status(200).json({ Profile: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error fetching admin data", error });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const employee = await employeeSchema.findById(req.user.employeeData._id);
    if (await bcrypt.compare(req.body.oldPassword, employee.password)) {
      employee.password = await bcrypt.hash(req.body.newPassword, 10);
      await employee.save();
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(401).json({ message: "Invalid Old Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Change Password", error });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const employee = await employeeSchema.findOne({ email: req.body.email });
    if (!employee)
      return res.status(404).json({ message: "employee Not Found" });
    const otp = Math.floor(5000 + Math.random() * 8000);
    mailer.sendOtp(employee.email, otp);
    res.cookie("otp", otp);
    res.cookie("adminID", employee.id);
    res.status(200).json({ msg: "OTP Send Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Forgot Password", error });
  }
};

module.exports.otpVerification = async (req, res) => {
  if (req.body.otp === req.cookies.otp) {
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const isChange = await employeeSchema.findByIdAndUpdate(
      req.cookies.adminID,
      { password: req.body.newPassword }
    );
    if (isChange) res.status(200).json({ msg: "Password Change Successfully" });
    else res.status(404).json({ msg: "Password Not Modified" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
};
