import React from "react";

interface PathProps {
  from: string;
  to: string;
}

const Path: React.FC<PathProps> = ({ from, to }) => {
  const paths = {
    "building1-building2": "M 100 200 L 200 300", // example path
    "building2-building3": "M 200 300 L 300 400",
  };

  const pathKey = `${from}-${to}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d={paths[pathKey]} stroke="#" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default Path;
