import { Request } from 'express';

declare module 'express-validator' {
  export function validationResult(req: Request): {
    isEmpty(): boolean;
    array(): Array<{ msg: string }>;
  };

  export function body(field: string, message?: string): any;
  export function param(field: string, message?: string): any;
  export function query(field: string, message?: string): any;
  
  // Add other validation chain methods as needed
  export interface ValidationChain {
    (req: Request, res: Response, next: NextFunction): void;
    [key: string]: any;
  }
}
