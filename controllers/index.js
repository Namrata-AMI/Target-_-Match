const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Company = require('../models/company');
const bcrypt = require("bcryptjs");

const Jwt_secret = process.env.JWT_SECRET;



const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, Jwt_secret, { expiresIn: '1h' });
};


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {

    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = generateToken(user);
  res.status(200).json({ message: 'Login successful', token });
};


const getCompanies = (req, res) => {
  Company.find()
    .then(companies => {
      console.log(companies);
      res.json(companies);
    })
    .catch(err => {
      console.error('Error fetching companies', err); 
      res.status(500).json({ message: 'Error fetching companies' });
    });
};



const updateCompanyStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  Company.findByIdAndUpdate(id, { accountStatus: status }, { new: true })
    .then(updatedCompany => res.json({ message: 'Company status updated', updatedCompany }))
    .catch(err => res.status(500).json({ message: 'Error updating company status' }));

};



module.exports = { login, getCompanies, updateCompanyStatus };
