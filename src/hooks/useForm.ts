import { useState } from "react";

type TFormValues = {
  [key: string]: string
}

export function useForm(inputValues: TFormValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
