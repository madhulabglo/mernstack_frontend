import { Button, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from '@mui/material/Card';


import { baseUrl } from "../baseurl"

const LoginScreen = () => {
  const navigate = useNavigate()
  const Email = localStorage.getItem("email")
  const [data, setData] = useState({ email: "", password: "" })
  const [details, setDetails] = useState({email:"",password:"",message:"",data:""})

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((body) => setDetails(body))
        .catch((error)=>console.log(error))

    }
    catch (error) {
      console.log("error", error)

    }
  }

  useEffect(() => {
    if (details.token) {
      localStorage.setItem("token", details.token)
      localStorage.setItem("isadmin", details.data.isAdmin)
      navigate("/employee")
    }
  }, [details])

  return (
    <>
      <center>
      <Card sx={{marginTop:"150px",height:400,width:400,borderRadius:10,boxShadow:10}}>
      <form>
          <h3>login Screen</h3><br/>
          <TextField variant="outlined" type="text" name="email" placeholder="enter email" onChange={handleChange} /><br /><br />
          <Typography style={{ fontSize: 16, color: "red" }}>{details.email}</Typography>
          <TextField variant="outlined" type="text" name="password" placeholder="enter password" onChange={handleChange} /><br /><br />
          <Typography style={{ fontSize: 16, color: "red" }}>{details.password}</Typography><br/><br/>
          <Button variant="contained" onClick={handleClick}>login</Button><br />
          <Typography style={{ fontSize: 16, color: "red" }}>{details.message}</Typography>
        </form>

      </Card>
       
      </center>
    </>
  )
}
export default LoginScreen