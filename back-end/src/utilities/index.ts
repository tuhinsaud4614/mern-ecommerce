export interface IErrorResponse {
  timeStamp: string;
  success: boolean;
  errors: {
    code: number;
    error: string;
    message: string;
    detail?: string;
  }[];
}
