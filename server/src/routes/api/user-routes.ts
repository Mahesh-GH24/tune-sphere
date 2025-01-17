import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - Create a new user
// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
    const { user_name, email, password, name, dob, gender, share_info } = req.body;
  
    // Validate required fields
    if (!user_name || !email || !password || !name || !dob || !gender || !share_info) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Check for unique username and email
      const existingUser = await User.findOne({ where: { user_name } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }
  
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email is already registered.' });
      }
  
      // Create a new user
      const newUser = await User.create({
        user_name,
        email,
        password, 
        name,
        dob,
        gender,
        share_info,
      });
  
      // Respond with minimal user info
      return res.status(201).json({
        id: newUser.id,
        user_name: newUser.user_name,
        email: newUser.email,
        message: 'User created successfully!',
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
  });
  

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_name, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.user_name = user_name;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };
