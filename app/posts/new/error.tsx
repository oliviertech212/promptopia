"use client";

import React, { useEffect } from "react";

const Error = ({ error, reset }: { error: any; reset: VoidFunction }) => {
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong</h2>

      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
