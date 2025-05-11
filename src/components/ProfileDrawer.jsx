import { MdOutlineClose, MdOutlineInfo } from "react-icons/md";
import { InputField, Spinner } from ".";
import { useAuthStore } from "../store";
import { useEffect, useState } from "react";
import { useShallow } from 'zustand/react/shallow';

const ProfileDrawer = ({ onClose }) => {

    const { firstName, lastName, email, avatar, logout, loading, updateProfile } = useAuthStore(
        useShallow((state) => ({
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            avatar: state.avatar,
            logout: state.logout,
            loading: state.loading.updateProfile,
            updateProfile: state.updateProfile
        }))
    );

    const [hasChanges, setHasChanges] = useState(false);

    const [updateForm, setUpdateForm] = useState(
        {
            firstName: firstName,
            lastName: lastName
        }
    )

    useEffect(()=>{
        setHasChanges(updateForm.firstName != firstName || updateForm.lastName != lastName);
    },[updateForm,firstName,lastName])

    const handleUpdateProfile = (e) => {
        updateProfile(updateForm.firstName, updateForm.lastName);
    }

    return (
        <div className="fixed inset-0 z-10">
            {/* Backdrop */}
            <div
                className="h-full w-full bg-black opacity-50"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 bottom-0 w-sm max-w-md bg-white shadow-lg rounded-tl-2xl rounded-bl-2xl px-4 py-6">
                <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Settings</p>
                    <MdOutlineClose className="text-2xl hover:bg-gray-200 hover:rounded-full p-1" onClick={onClose} />
                </div>

                <img src={avatar} alt="avatar" className="mx-auto rounded-full w-14 md:w-20 aspect-square my-4" />

                <InputField
                    className="w-full"
                    placeholder="Email"
                    value={email}
                    disabled
                />

                <div className="flex gap-2 items-center text-xs text-gray-400">
                    <MdOutlineInfo/>
                    <p>You can't change email</p>
                </div>

                <div className="flex gap-2 mt-4">
                    <InputField
                        placeholder="First Name"
                        value={updateForm.firstName}
                        name="firstName"
                        onChange={(e)=>setUpdateForm({...updateForm,firstName:e.target.value})}
                    />
                    <InputField
                        placeholder="Last Name"
                        value={updateForm.lastName}
                        name="lastName"
                        onChange={(e)=>setUpdateForm({...updateForm,lastName:e.target.value})}
                    />
                </div>

                {loading && 
                    <Spinner className="mx-auto mt-4"/>
                }

                {!loading && 
                    <button disabled={!hasChanges} className={`w-full ${hasChanges ? 'bg-blue-400' : 'bg-blue-200' } text-white rounded-md py-2 mt-4`} onClick={handleUpdateProfile}>
                    save changes
                </button>
                }
                

                <button className={`w-full text-red-400 border-1 border-red-400 rounded-md py-2 mt-4 hover:bg-red-400 hover:text-white`} onClick={logout}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default ProfileDrawer; 