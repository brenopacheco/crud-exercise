import { ZodError } from 'zod'

export class ValidationError extends Error {
  errors: {
    [K: string | number | symbol]: string[] | undefined
  }
  constructor(error: ZodError) {
    super('Data has invalid members')
    this.name = 'ValidationError'
    this.errors = error.flatten().fieldErrors
  }
}

export class MissingEntityError extends Error {
  constructor(name: string) {
    super(`${name} was not found`)
    this.name = 'MissingEntityError'
  }
}
