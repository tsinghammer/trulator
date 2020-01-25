export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export interface ValidationRule<T> {
  rule: (trade: T) => boolean;
  message: Message;
}

export interface Message {
  text: string;
  severity: 'Error' | 'Warning' | 'Info';
}

export const isRule = (object: any) => {
  return 'validations' in object;
};

export interface Rule<T, S> {
  default?: T;
  disabled?: ((trade: S) => boolean) | boolean;
  hidden?: ((trade: S) => boolean) | boolean;
  validations: ValidationRule<S>[];
  overrideValue?: (trade: S) => T | undefined;
  availableOptions?: (trade: S) => (T | unknown)[] | (T | unknown)[];
}

export type ViewConfiguration<T, S> = T extends Primitive
  ? Rule<T, S>
  : {
      [P in keyof T]: ViewConfiguration<T[P], S>;
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
