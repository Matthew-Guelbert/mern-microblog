import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })
}

// POST /api/auth/signup
export const signupUser = async (req, res) => {
  const { name, username, email, password } = req.body

  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] })

    if (existing) {
      return res.status(400).json({ message: "Username or email already in use" })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      username,
      email,
      passwordHash
    })

    await user.save()

    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

      const isMatch = await bcrypt.compare(password, user.passwordHash)
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = generateToken(user._id)

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message })
  }
}