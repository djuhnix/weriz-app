export enum Config {
  API_BASE_URL = 'http://localhost:8080',
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number:
  PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{8,30}$"
}
