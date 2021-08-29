export function getErrorMessageByCode(code, { email = "" }) {
  switch (code) {
    case "auth/email-already-in-use":
      return `Another account is using ${email}.`;
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/user-not-found":
      return "The username you entered doesn't belong to an account. Please check your username and try again.";
    case "auth/wrong-password":
      return "Sorry, your password was incorrect. Please double-check your password.";
    default:
      return "Unknown error.";
  }
}
