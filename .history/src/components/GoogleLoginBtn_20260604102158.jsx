import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function GoogleLoginBtn({
  redirectTo,
  role,
  onSuccessMessage,
  onErrorMessage,
}) {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await API.post("/auth/google", {
            credential: credentialResponse.credential,
            role,
          });

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          onSuccessMessage?.(
            res.data.message || "Google login successful"
          );

          setTimeout(() => {
            navigate(redirectTo);
          }, 1500);
 
          setTimeout(() => {
             onSuccessMessage("")
          }, 3000);

        } catch (err) {
          onErrorMessage?.(
            err.response?.data?.message ||
              "Google authentication failed"
          );
          setTimeout(() => {
             onErrorMessage("")
          }, 3000);

        }
      }}
      onError={() => {
        onErrorMessage?.("Google login failed");
      }}
    />
  );
}

export default GoogleLoginBtn;


