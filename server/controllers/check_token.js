export const check_token = async (req, res) => {
      const { firstName, lastName, email, status, username, bio, img, dob } = req.user;

      return res.status(200).json({
            status: 200,
            info: { firstName, lastName, email, status, username, bio, img, dob }
      });
};
