import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
    const [loginStatus, setloginStatus] = useState(false)
    const [logedinName, setlogedinName] = useState("")
    const [theme, settheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const getusername = async () => {
            // const result = await fetch('http://localhost:3000/')
            // const res = await result.json()
            const result = await axios.get('http://localhost:3000/')
            console.log(result.data)
            if (result.data.data.sucess) {
                setloginStatus(true)
                setlogedinName(result.data.data.username)
            }
        }
        getusername()
        localStorage.setItem("theme", theme)
        const localtheme = localStorage.getItem("theme")
        document.querySelector('html').setAttribute("data-theme", localtheme)
    }, [theme])

    const data = {
        "username": logedinName
    }
    const handlelogout = async () => {
        const result = await axios.post('http://localhost:3000/', { "data": data })
        console.log(result);
        setlogedinName("");
    }

    const changetheme = () => {
        if (theme == "light") {
            settheme("dark");
        }
        else {
            settheme("light");
        }
    }

    return (
        <div>
            <h1 className=''>welcome {logedinName}</h1>
            <button className=' bg-blue-600 py-1 px-2 text-white rounded m-1' onClick={handlelogout}>LOGOUT</button>
            <button className=' bg-blue-600 py-1 px-2 text-white rounded m-1' onClick={changetheme}>theme change</button>
            <div className={`w-1/2 border-2 m-4 p-4 ${theme == "dark" ? "bg-black" : "bg-white"} `}>
                <h1>Hii,I am Yash Mulik</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad eos vero asperiores accusamus quod velit eaque voluptates maiores molestias voluptatibus, ullam modi, atque laudantium deserunt dicta! Mollitia omnis exercitationem officia.</p>
            </div>
        </div>
    )
}

export default Home
