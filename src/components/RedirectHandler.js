import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate backend call to get long URL
    const map = {
      "short0": "https://example.com",
      "short1": "https://openai.com"
    };

    const target = map[shortcode];
    if (target) {
      window.location.href = target;
    } else {
      alert("Invalid shortcode or expired.");
      navigate("/");
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;
