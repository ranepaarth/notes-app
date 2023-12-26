const registerOptions = {
  userName: {
    required: "Username is required",
    pattern: {
      value: /[a-z0-9]/g,
      message: "Invalid Username",
    },
    minLength: {
      value: "4",
      message: "Username must have at least 4 characters",
    },
    maxLength: {
      value: 10,
      message: "Username must have at most 10 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g,
      message: "Invalid Email format",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$%&]{8,}$/,
      message:
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$%&).",
    },
    minLength: {
      value: 8,
      message:
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$%&).",
    },
  },
};

export default registerOptions;
