import * as React from "react";
export const Input: React.FC<{ placeholder: string; type?: string }> = ({
  type,
  placeholder,
}) => {
  return <input type={type ?? "text"} placeholder={placeholder} />;
};
