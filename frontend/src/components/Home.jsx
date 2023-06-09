import React, { useState,useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [loginStatus, setloginStatus] = useState(false)
    const [logedinName, setlogedinName] = useState("")
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const getusername = async()=>{
            // const result = await fetch('http://localhost:3000/')
            // const res = await result.json()
            const result = await axios.get('http://localhost:3000/')
            console.log(result.data)
            if(result.data.data.sucess){
                setloginStatus(true)
                setlogedinName(result.data.data.username)
            }
        }
        getusername()
    }, [])
    
    return (
        <div>
            <h1 className=''>welcome {logedinName}</h1>
        </div>
    )
}

export default Home
