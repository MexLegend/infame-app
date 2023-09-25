
export type AuthError = "NotExist" | "WrongCredentials" | "NotConfirmed" | "PasswordMismatch" | "ExistsAlready";

export type EmailType = "ConfirmNewsLetter" | "NewsLetterConfirmed" | "NewsLetterUnsubscribed" | "ConfirmEmail" | "AccountRecovery";

export type VerifyError = "RequestExpired" | "AccountVerified" | "CodeUsed" | "TokenUsed" | "InvalidCode" | "InvalidToken" | "InvalidEmail" | "ServerError";
