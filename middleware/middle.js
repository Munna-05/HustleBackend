import jwt from 'jsonwebtoken'

export const  auth = async (req, res, next) => {
  try {
    let decodeData;
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    if (token) {
      decodeData = jwt.verify(token);
      req.id = decodeData?.id;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

