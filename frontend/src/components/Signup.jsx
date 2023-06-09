import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setmobile] = useState("")

    const handleform = async (e) => {
        e.preventDefault();
        let data = {
            "username": username,
            "email": email,
            "password": password,
            "name": name,
            "m_no": mobile
        }
        const result = await fetch('http://localhost:3000/signup', {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "data": data
            })
        })
        const res = await result.json()
        console.log(res);
        if (res.data.sucess) {
            navigate("/login")
        }
    }

    return (
        <div className=' flex justify-center items-center'>
            <div className=' w-1/2 flex justify-center items-center'>
                <form className=' p-4 border-2 w-2/3 flex justify-center flex-col items-center' onSubmit={handleform}>
                    <h1 className=' text-xl bold'>Signup</h1>
                    <label>Name:</label>
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={name} onChange={(e) => {
                        setname(e.target.value)
                    }} />
                    <label>EMAIL:</label>
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }} />
                    <label>Username:</label>
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={username} onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                    <label>Password:</label>
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <label>MOBLIE NO.:</label>
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={mobile} onChange={(e) => {
                        setmobile(e.target.value)
                    }} />
                    <button className=' m-2 bg-blue-600 text-white py-1 px-3 rounded' >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup