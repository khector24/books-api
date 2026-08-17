function validateRegister(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  next();
}

function validateUserId(req, res, next) {
  const userId = Number(req.params.userId);

  if (!Number.isInteger(userId) || userId < 1) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  req.userId = userId;

  next();
}

function validateUserRole(req, res, next) {
  const allowedRoles = ["user", "admin"];

  const { role } = req.body;

  if (role === undefined || !allowedRoles.includes(role)) {
    return res.status(400).json({
      message: "User role required or is not valid.",
    });
  }

  req.userRole = role;

  next();
}

export { validateRegister, validateLogin, validateUserId, validateUserRole };
