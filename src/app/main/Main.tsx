import React from "react"
import { Outlet } from "react-router-dom"
import "./Main.module.css"
import { Container } from "@mui/material"

export const Main = () => {

  return (
    <Container maxWidth="xl">
      <main>
        <Outlet />
      </main>
    </Container>
  )
}
