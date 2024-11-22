import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { token, user } = req.user;   
  res.json({ message: 'Autenticación exitosa', user, token });
});

export default router;
