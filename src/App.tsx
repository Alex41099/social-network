import "./App.css"
import { Aside } from "./app/aside/Aside"
import {Navigate, Outlet} from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch } from "./app/hooks/useAppDispatch"
import {
  initializedTC,
  logoutTC,
  setBurgerToggle,
  setIsInitialized,
  setProgressLinear
} from "./features/auth/model/authSlice"
import { useAppSelector } from "./app/hooks/useAppSelector"
import { AppBar, Button, LinearProgress, Toolbar, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import styled from "styled-components"
import {Main} from "./app/main/Main";

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((state) => state.auth.isInitialized)
  const progress = useAppSelector((state) => state.auth.progressLinear)
  const totalCount = useAppSelector((state) => state.users.totalCount)
  const isMeProfile = useAppSelector((state) => state.auth.isMeProfile)
  const isLogged = useAppSelector((state) => state.auth.isLogged)

  useEffect(() => {
    dispatch(setProgressLinear({ progressLinear: 30 }))
    dispatch(initializedTC())
      .then(() => {
        dispatch(setProgressLinear({ progressLinear: 100 }))
        dispatch(setIsInitialized({ isInitialized: true }))
      })
      .then(() => {
        setTimeout(() => {
          dispatch(setProgressLinear({ progressLinear: 101 }))
        }, 500)
      })
  }, [])

  const toggleBurger = () => {
    dispatch(setBurgerToggle({ burgerToggle: true }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <>
      {progress !== 101 ? (
        <LinearProgress
          style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
          variant="buffer"
          value={progress}
        />
      ) : null}
      {isInitialized ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleBurger}
              >
                {isLogged? <MenuIcon />: null}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {isMeProfile && "Это мой профиль!"}
                {!isMeProfile && isLogged && isInitialized && <>
                  <Schetcik>{totalCount}</Schetcik> - Pазработчиков зарегистрировались!
                </>}
                {!isLogged && !isMeProfile && "Нажмите на Login!"}
              </Typography>
            </Toolbar>
          </AppBar>
          <Aside />
          <Main/>
        </>
      ) : null}
    </>
  )
}

const Schetcik = styled.span`
  display: inline-block;
  background-color: #262525;
  border-radius: 5px;
  padding: 0 5px;
  letter-spacing: 1.2px;
  color: greenyellow;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`
