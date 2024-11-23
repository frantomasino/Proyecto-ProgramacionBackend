import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Busca al usuario en la base de datos
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Verifica la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Genera el token
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
  );

  return res.status(200).json({ message: 'Login exitoso', token });
};    