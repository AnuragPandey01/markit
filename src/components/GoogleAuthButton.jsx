import React from 'react'

function GoogleAuthButton({...props}) {
    return (
        <button className="h-12 cursor-pointer rounded-xl flex items-center justify-center bg-gray-100 gap-4" {...props}>
            <img src="google.svg" className="h-5 w-5" />
            <p>Continue with Google</p>
        </button>
    )
}

export default GoogleAuthButton