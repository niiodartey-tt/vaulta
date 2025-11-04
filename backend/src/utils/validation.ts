export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password && password.length >= 6
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+233|0)[0-9]{9}$/
  return phoneRegex.test(phone)
}

export function validateAmount(amount: any): boolean {
  const num = Number.parseFloat(amount)
  return !isNaN(num) && num > 0
}

export function validateIdNumber(idNumber: string): boolean {
  return idNumber && idNumber.length >= 5
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateSignup(email: string, password: string, name: string): ValidationResult {
  const errors: string[] = []

  if (!validateEmail(email)) {
    errors.push("Invalid email address")
  }

  if (!validatePassword(password)) {
    errors.push("Password must be at least 6 characters")
  }

  if (!name || name.length < 2) {
    errors.push("Name must be at least 2 characters")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function validateKYC(data: any): ValidationResult {
  const errors: string[] = []

  if (!data.firstName || data.firstName.length < 2) {
    errors.push("First name is required")
  }

  if (!data.lastName || data.lastName.length < 2) {
    errors.push("Last name is required")
  }

  if (!data.idNumber) {
    errors.push("ID number is required")
  }

  if (!data.address || data.address.length < 5) {
    errors.push("Valid address is required")
  }

  if (!data.city || data.city.length < 2) {
    errors.push("City is required")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
