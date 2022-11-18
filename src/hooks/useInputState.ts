import { useState, Dispatch, SetStateAction } from "react";

const useInputState = (initialState: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void,Dispatch<SetStateAction<string>> ] => {
  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};

export default useInputState;
