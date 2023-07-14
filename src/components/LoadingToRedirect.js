import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate("/login");
    }
  }, [count, navigate]);

  return (
    <div>
      <h5 style={{ marginTop: "100px" }}>Redirecting you in {count} seconds</h5>
    </div>
  );
}

export default LoadingToRedirect;
