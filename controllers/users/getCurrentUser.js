const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Nie jesteś zalogowany" });
  }

  const { password, token, ...userData } = req.user;

  res.json(userData);
};

export { getCurrentUser };
