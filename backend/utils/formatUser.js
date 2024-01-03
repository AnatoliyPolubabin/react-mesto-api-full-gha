module.exports.formatUser = (user) => ({
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  email: user.email,
  _id: user._id,
});
