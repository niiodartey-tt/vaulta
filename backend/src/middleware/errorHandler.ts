import type { Request, Response, NextFunction } from "express"

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorHandler(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    })
  }

  console.error("[v0] Unhandled error:", err)

  res.status(500).json({
    error: "Internal server error",
    statusCode: 500,
  })
}
