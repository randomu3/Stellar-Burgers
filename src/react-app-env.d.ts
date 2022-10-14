/// <reference types="react-scripts" />

import { ReactNode } from "react";

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      children?: ReactNode;
    }
  }
}