const jwt = require('jsonwebtoken');
const jwtSecretString = "my secret random string";

const authenticate = (req,res,next) => {
  const authHeader = req.headers['authorization'];
	const token = authHeader? authHeader.split(' ')[1] : null;
	if(token === null){
		return res.status(401).json({err : 'unAuthorized'});
	}
	
	jwt.verify(token, jwtSecretString, (err,user) => {
		if(err) return res.status(401).json({err : 'Forbidden'});
		req.user = user;
		next();
	});
};


module.exports =  {
	authenticate, jwtSecretString
};