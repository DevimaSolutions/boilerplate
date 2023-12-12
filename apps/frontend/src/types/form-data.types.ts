export interface RecursiveObject {
  [key: string]: RecursiveObject;
}

export interface ToFormDataConfig {
  indices: boolean;
  nullsAsUndefineds: boolean;
  booleansAsIntegers: boolean;
  allowEmptyArrays: boolean;
}
