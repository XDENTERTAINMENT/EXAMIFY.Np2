import { GoogleLogin } from "@react-oauth/google";
import API from '../services/api';
import { useNavigate } from "react-router-dom";

function GoogleLoginBtn({redirectTo}) {
const navigate = useNavigate();

    return (
        <GoogleLogin
            onSuccess={async (res) => {
                const response = await API.post("/auth/google", {
                    credential: res.credential,
                });

                localStorage.setItem("token", response.data.token);
                navigate(redirectTo);
            }}
            onError={() => console.log("Login Failed")}
        />
    );
}

export default GoogleLoginBtn;