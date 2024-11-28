import React from "react"
import {Route, Routes} from "react-router-dom"
import "./Main.module.css"
import { Container } from "@mui/material"
import {Profile} from "../../features/profile/ui/Profile";
import { Users } from "../../features/users/ui/Users"

export const Main = () => {

  return (
    <Container maxWidth="xl">
      <main>
        <Routes>
            <Route path={"/"} element={<Profile />}/>
            <Route path={"/users"} element={<Users />}/>
            <Route path={"/users/profile/:userId"} element={<Profile />}/>
            <Route path={"/*"} element={<div>Error 404</div>}/>
        </Routes>
      </main>
    </Container>
  )
}
