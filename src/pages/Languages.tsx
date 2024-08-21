import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export const SelectLanguage: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col p-6">
      <Link to={"/list"}>List</Link>
    </div>
  );
};
