import { useEffect, useState } from "react"
import InputField from "../components/InputField"
import { MdOutlineMailOutline, MdOutlinePassword } from "react-icons/md"
import {toast} from "react-toastify"
import { Button , HorizontalDivider, Spinner} from "../components"
import { useAuthStore } from "../store"
import { useNavigate } from "react-router-dom"
import GoogleAuthButton from "../components/GoogleAuthButton"

const LoginPage = () => {

    const {loading, error, login, googleAuth} = useAuthStore();
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    useEffect(() => {
        toast.error(error)
    }, [error])

    const handleLogin = async () => {
        const data = {
            email: form.email,
            password: form.password
        }
        await login(data);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };


    return <div className="flex">
        
        <div className="grow-1">
            <h2 className="text-center text-2xl font-bold mb-9">Login</h2>
            <div className="flex flex-col gap-2">
                <InputField
                    name={"email"}
                    placeholder={"Email"}
                    icon={MdOutlineMailOutline}
                    value={form.email}
                    onChange={handleChange}
                />
                <InputField
                    name={"password"}
                    placeholder={"Pasword"}
                    icon={MdOutlinePassword}
                    type={"password"}
                    value={form.password}
                    onChange={handleChange}
                />
                {loading.login && <Spinner />}
                {!loading.login && <Button
                    onClick={handleLogin}
                    text={"Login"}
                />}

                <HorizontalDivider/>    
                
                <GoogleAuthButton onClick={googleAuth} disabled={loading.googleAuth} />

                <div className="text-center pt-12 pb-12">
                    <p>Don't have an account? <a onClick={() => navigate("/")} className="underline font-semibold cursor-pointer">Sign up here.</a></p>
                </div>
            </div>
        </div>
        <div className="grow-1 hidden md:block">
            <img src="/assets/login.svg" alt="login art" />
        </div>
    </div>
}

export default LoginPage;