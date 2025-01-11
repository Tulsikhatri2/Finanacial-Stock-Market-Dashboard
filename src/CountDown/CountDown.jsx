import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountdownRedirect = ({ seconds, targetUrl }) => {
  const [countdown, setCountdown] = useState(seconds);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          navigate(targetUrl);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, targetUrl]);

  return (
    <div className="redirect-countdown">
      <p>Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default CountdownRedirect;