import jwt from 'jsonwebtoken';
import express = require('express');
export default function auth(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verifed = jwt.verify(token, process.env.TOKEN_SECRET ?? '');
    req.user = verifed;
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
}
