import jwt from 'jsonwebtoken'

export const decode_token = (token) => {
      try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY)
      } catch (error) {
            return null
      }
}