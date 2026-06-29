import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";

// ✅ NEW PAGE — not in original documented architecture.
// Paystack redirects here after checkout (callback_url set in
// paymentController.js -> initializePayment). We read the `reference`
// query param, ask the backend to verify it, then send the teacher on.
function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
  const [message, setMessage] = useState("Confirming your payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("error");
        setMessage("No payment reference found.");
        return;
      }

      try {
        const res = await API.get(`/payments/verify/${reference}`);

        // Keep localStorage user object in sync so the dashboard
        // immediately reflects the new plan without a fresh login.
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        storedUser.plan = res.data.plan;
        localStorage.setItem("user", JSON.stringify(storedUser));

        setStatus("success");
        setMessage(`Payment successful! You're now on the ${res.data.plan} plan.`);

        setTimeout(() => {
          navigate("/teacherdashboard");
        }, 2000);
      } catch (err) {
        console.log(err);
        setStatus("error");
        setMessage(
          err.response?.data?.message || "We couldn't verify this payment.",
        );
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2>{status === "success" ? "✅ Payment Verified" : status === "error" ? "❌ Payment Issue" : "Verifying Payment..."}</h2>
      <p>{message}</p>
    </div>
  );
}

export default PaymentVerify;
