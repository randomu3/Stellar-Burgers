import { useState } from "react";

const useInputState = (initialState: string) => {
  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};

export default useInputState;
