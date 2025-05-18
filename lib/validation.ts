// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Name validation (no numbers)
export function validateName(name: string): boolean {
  const nameRegex = /^[^0-9]*$/
  return nameRegex.test(name)
}

// Phone validation (only numbers)
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\d+$/
  return phoneRegex.test(phone)
}

// Password validation (min 8 characters)
export function validatePassword(password: string): boolean {
  return password.length >= 8
}

// Password match validation
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}
