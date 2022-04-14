import { Navigate, Route, Routes } from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";


export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container animate__animated animate__fadeInUp">
                <Routes>
                    <Route path="login" element={ <LoginScreen /> } />
                    <Route path="register" element={ <RegisterScreen /> } />

                    <Route path="*" element={ <Navigate replace to="login" /> } />
                </Routes>
            </div>
        </div>
    );
}