export class AbiCoderError extends Error {
  details: string;

  constructor(
    message: string,
    oError: Error,
  ) {
    super(message);
    this.details = oError.message;
  }
}
export class EncodeFailedAbiCoderError extends AbiCoderError {
  constructor(
    oError: Error,
  ) {
    super('Failed to encode parameters', oError);
  }
}
