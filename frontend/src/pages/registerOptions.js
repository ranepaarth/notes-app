const registerOptions = {
  userName: {
    required: "Username is required.",
    pattern: {
      value: /[a-z0-9]{4,10}/g,
      message:
        "Username can be a alphanumeric. (testUser/ testuser02/testuser)",
    },
    maxLength: {
      value: 10,
      message: "Username must have at most 10 characters",
    },
  },
  email: {
    required: "Email required.",
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g,
      message: "example01@example.com",
    },
  },
  password: {
    required:
      "Password required",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$%&]{8,}$/,
      message:
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, one special character (@$%&) and no empty spaces.",
    },
    minLength: {
      value: 8,
      message:
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number one special character (@$%&) and no empty spaces.",
    },
  },
};

export default registerOptions;
