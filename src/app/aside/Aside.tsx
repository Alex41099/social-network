import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import s from "./Aside.module.css"
import { useAppSelector } from "../hooks/useAppSelector"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { setBurgerToggle } from "../../features/auth/model/authSlice"
import styled from "styled-components"

type AsidePropsType = {}

export const Aside = ({}: AsidePropsType) => {
  const isLogged = useAppSelector((state) => state.auth.isLogged)
  const burgerToggle = useAppSelector((state) => state.auth.burgerToggle)
  const dispatch = useAppDispatch()

  useEffect(() => {
    burgerToggle ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto")
  }, [burgerToggle])

  const toggleBurger = () => {
    dispatch(setBurgerToggle({ burgerToggle: !burgerToggle }))
  }

  return (
    <aside className={burgerToggle ? s.aside + " " + s.openAside : s.aside}>
      <IconButton onClick={toggleBurger}>
        <MenuIcon />
      </IconButton>
      <Ul>
        <li>
          <NavLink
            to={"/users?page=1"}
            onClick={toggleBurger}
            className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
          >
            Users
          </NavLink>
        </li>
        {isLogged ? (
          <li>
            <NavLink
              to={"/profile"}
              onClick={toggleBurger}
              className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
            >
              Me Profile
            </NavLink>
          </li>
        ) : null}
      </Ul>
    </aside>
  )
}

const Ul = styled.ul`
  & > li > a.active {
    color: silver;
  }
`
