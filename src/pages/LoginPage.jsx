import { useEffect, useState } from "react"
import pb from "../lib/pb"
import InputField from "../components/InputField"
import { MdOutlineMailOutline, MdOutlinePassword } from "react-icons/md"
import {toast} from "react-toastify"
import { Button , Spinner} from "../components"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    useEffect(() => {
        console.log(error)
        toast.error(error)
    }, [error])

    const login = async () => {
        setLoading(true);
        try {
            await pb.collection('users').authWithPassword(
                form.email,
                form.password,
            );
            if (pb.authStore.isValid) navigate('/home')
        } catch (err) {
            setError(err.message)
            setLoading(false);
        }
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
                {loading && <Spinner />}
                {!loading && <Button
                    onClick={login}
                    text={"Login"}
                />}

                <div className="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="/" className="underline font-semibold">Sign up here.</a></p>
                </div>
            </div>
        </div>
        <div className="grow-1 hidden md:block">
            <img src="/assets/login.svg" alt="login art" />
        </div>
    </div>
}

export default LoginPage;