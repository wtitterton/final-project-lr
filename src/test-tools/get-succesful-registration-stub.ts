export function GetSuccessfulRegistrationStub() {
  return {
    success: true,
    result: {
      email: "user-email@email.com",
      token: "user-token",
      message: "Success: Limited to one test account per trainee!",
    },
  };
}
