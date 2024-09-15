export type InputType = string | number | readonly string[] | undefined ;


export type InputOptionType = {
    name: string;
    type: string;
    label: string;
  options?: string[];
    disabled?: boolean
  };