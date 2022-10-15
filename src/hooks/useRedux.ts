import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../services";
import { TypedDispatch } from "../services/types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
