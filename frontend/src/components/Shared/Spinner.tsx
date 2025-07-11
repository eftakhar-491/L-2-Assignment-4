import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative"></div>
      <div className="w-16 h-16 rounded-full border-4 border-t-4 border-transparent border-t-blue-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-500 rounded-full opacity-75"></div>
      </div>
    </div>
  );
};

export default Spinner;
