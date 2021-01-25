const login = async (req, res) => {
  const { email, password } = req.body;
  return console.log({email, password})
}

module.exports = {
  login,
}