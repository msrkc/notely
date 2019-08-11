const StringUtil = require('../../utilities/string-util');
const User = require('../../models/user-model');
const { generateJWT } = require('../../sevices/auth-service');

exports.index = (req, res) => {
  const validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  });
  user
    .save()
    .then(user => {
      const token = generateJWT(user);
      return res.status(201).json({ token: token });
    })
    .catch(error => {
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(422).json({ message: 'username is taken' });
      }
      return res.status(500).json();
    });
};

const validateIndex = body => {
  let errors = '';
  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username is required. ';
  }
  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password is required. ';
  }
  if (StringUtil.isEmpty(body.name)) {
    errors += 'Name is required. ';
  }
  if (StringUtil.isEmpty(body.email)) {
    errors += 'Email is required. ';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
};
