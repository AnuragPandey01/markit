import { MdOutlineMailOutline, MdOutlinePassword, MdPersonOutline } from "react-icons/md";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { Button, Spinner} from "../components"
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

    const {loading, error, signup} = useAuthStore();
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const register = async () => {
        const data = {
            "email": form.email,
            "emailVisibility": true,
            "first_name": form.firstName,
            "last_name": form.lastName,
            "password": form.password,
            "passwordConfirm": form.confirmPassword
        };
        signup(data);
    }

    useEffect(()=>{
        toast.error(error)
    },[error])

    return <div className="flex items-center">
        {/* Left Half with Background Image */}
        <div className="grow-1 hidden md:block">
            <img src="/assets/register.svg" className="w-[400px] m-auto" />
        </div>

        {/* Right Half with Sign Up Heading */}
        <div className="grow-1">
            <h2 className="text-center text-2xl font-bold mb-9">Sign Up</h2>
            <div className="flex flex-col gap-4">
                <InputField
                    icon={MdOutlineMailOutline}
                    placeholder={"First name"}
                    name={"firstName"}
                    value={form.firstName}
                    onChange={handleChange}
                />
                <InputField
                    icon={MdPersonOutline}
                    placeholder={"Last name"}
                    name={"lastName"}
                    value={form.lastName}
                    onChange={handleChange}
                />
                <InputField
                    icon={MdOutlineMailOutline}
                    placeholder={"Email"}
                    name={"email"}
                    value={form.email}
                    onChange={handleChange}
                />
                <InputField
                    icon={MdOutlinePassword}
                    type="password"
                    placeholder={"Password"}
                    name={"password"}
                    value={form.password}
                    onChange={handleChange}
                />
                <InputField
                    icon={MdOutlinePassword}
                    type="password"
                    placeholder={"Confirm Password"}
                    name={"confirmPassword"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <div>
                    <input type="checkbox" />
                    <span className="pl-5">I agree to all terms</span>
                </div>

                {loading && <Spinner />}
                {!loading && <Button onClick={register} text={"Register"} />}

                <div className="text-center pt-12 pb-12">
                    <p>Already have an account? <a onClick={() => navigate("/login")} className="underline font-semibold cursor-pointer">Log in here.</a></p>
                </div>
            </div>
        </div>
    </div>
}

export default SignupPage;