import { useEffect, useState } from "react";
import "./updatenotice.css";

export default function UpdateNotice() {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!showNotice) return null;

  return (
    <div className="notice-overlay">
      <div className="notice-box">
        <h2>⚠️ Platform Update Notice</h2>

        <p>
          This platform is still under development. During updates or
          maintenance, some account data may occasionally be reset or removed.
        </p>

        <small>Thank you for your understanding.</small>
      </div>
    </div>
  );
}
