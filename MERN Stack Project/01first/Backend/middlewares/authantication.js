const jwt = require("jsonwebtoken");
const adminSchema = require("../model/adminSchema");
const managerSchema = require("../model/managerSchema");
const employeeSchema = require("../model/employeeSchema");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);

    const decode = jwt.verify(finalToken, "node");

    if (await adminSchema.findById(decode.userData._id)) {
      req.user = decode;
      next();
    } else {
      res.status(404).json({ msg: "Admin Not Found" });
    }
  } catch (error) {
    console.error("Not Authorized Admin"+error);
    res.status(500).json({ msg: "Error Authantication", error });
  }
};


const managerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);

    const decode = jwt.verify(finalToken, "node");
    
    if(decode.managerData){
      if (await managerSchema.findById(decode.managerData._id)) {
        req.user = decode;
        next();
      } else {
        res.status(404).json({ msg: "Manager Not Found" });
      }
    } else{
      res.status(401).json({ msg: "You Are Not Manager!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Authantication", error });
  }
};

const employeeAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Token Not Found" });

    const finalToken = token.slice(7);

    const decode = jwt.verify(finalToken, "node");
    console.log(decode);
    
    if (await employeeSchema.findById(decode.employeeData._id)) {
      req.user = decode;
      next();
    } else {
      res.status(404).json({ msg: "Employee Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error Authantication", error });
  }
};

module.exports = { adminAuth, managerAuth, employeeAuth};
