export const portPassword = (req, res, next) => {
      const password = req.headers['x-access-password']
      if (password === process.env.PORT_PASSWORD) {
            next()
      } else {
            res.status(403).send('Portga kirish paroli xato!')
      }
}
