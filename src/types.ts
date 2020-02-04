import { type } from 'os';

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export interface ValidationRule<T> {
  rule: (state: T, index?: number) => boolean;
  message: Message;
}

export interface Message {
  text: string;
  severity: 'Error' | 'Warning' | 'Info';
}

export const isPrimitive = (object: any): object is Primitive => {
  switch (typeof object) {
    case 'bigint':
      return true;
    case 'boolean':
      return true;
    case 'number':
      return true;
    case 'string':
      return true;
    case 'symbol':
      return true;
    case 'undefined':
      return true;
    default:
      return false;
  }
};

export const isRule = (object: any) => {
  return !!object.isRule;
};

export interface Rule<T, S> {
  isRule?: true;
  default?: T;
  disabled?: ((state: S) => boolean) | boolean;
  hidden?: ((state: S) => boolean) | boolean;
  validations?: ValidationRule<S>[];
  overrideValue?: (state: S) => T | undefined;
  availableOptions?: ((state: S) => (T | unknown)[]) | (T | unknown)[];
}

export type ViewConfiguration<T, S> = T extends Primitive
  ? Rule<T, S>
  : {
      // tslint:disable-next-line
      [P in keyof T]: T[P] extends Array<infer U>
        ? ViewConfiguration<U, S> & Rule<U, S>
        : ViewConfiguration<T[P], S> & Rule<T[P], S>;
    };

export type Result<T> = {
  disabled?: boolean;
  hidden?: boolean;
  messages: Message[];
  overrideValue?: T;
  availableOptions?: T[];
};

export type RuleResult<T> = {
  [P in keyof T]?: RuleResult<T[P]>;
} &
  Result<T>;
