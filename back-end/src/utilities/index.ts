import { join } from "path";

export interface IErrorResponse {
  timeStamp: string;
  success: boolean;
  code: number;
  errors: {
    error: string;
    message: string;
    detail?: string;
  }[];
}

export function joinPath(...paths: string[]) {
  return join(__dirname, "..", "..", ...paths);
}
