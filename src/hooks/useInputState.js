import { useState } from "react";

const useInputState = (initialState) => {
  const [state, setState] = useState(initialState);

  const onChange = (e) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};

export default useInputState