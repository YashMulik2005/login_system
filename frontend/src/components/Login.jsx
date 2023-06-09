import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleclick = async (e) => {
        e.preventDefault()
        let data = {
            "username": username,
            "password": password
        }
        // const result = await fetch('http://localhost:3000/login', {          
        //     method: 'post',
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     credentials:'include',
        //     body: JSON.stringify({
        //         "data": data
        //     })
        // })
        // const res = await result.json()
        const result = await axios.post('http://localhost:3000/login',{"data":data})
        console.log(result.data.data);
        if(result.data.data.sucess){
            navigate('/')
        }

    }
    return (
        <div className=' flex justify-center items-center'>
            <div className=' w-1/2 flex justify-center items-center'>
                <form method='post' className=' p-4 border-2 w-2/3 flex justify-center flex-col items-center' onSubmit={handleclick} >
                    <h1>Login</h1>
                    <label>Username</label><br />
                    <input type='text' className=' border-2 rounded py-1 px-2 w-2/3' value={username} onChange={(e) => {
                        setusername(e.target.value)
                    }} /><br />
                    <label>Password</label><br />
                    <input type='password' className=' border-2 rounded py-1 px-2 w-2/3' value={password} onChange={(e) => {
                        setpassword(e.target.value)
                    }} /><br />
                    <button className=' m-2 bg-blue-600 text-white py-1 px-3 rounded'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login