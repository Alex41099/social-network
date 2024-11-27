import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../../../app/hooks/useAppDispatch"
import { useAppSelector } from "../../../app/hooks/useAppSelector"
import { setUsersTC } from "../model/usersSlice"
import { User } from "./user/User"
import {Link, Navigate, useSearchParams} from "react-router-dom"
import { PaginatedItems } from "./pagination/PaginateBibliotec"
import Skeleton from "react-loading-skeleton"
import s from "./users.module.css"
import styled from "styled-components"
import { setIsMeProfile } from "../../auth/model/authSlice"

export const Users = () => {
  const dispatch = useAppDispatch()
  const isLogged = useAppSelector((state) => state.auth.isLogged)

  const getUsers = useAppSelector((state) => state.users)

  const [searchParams, setSearchParams] = useSearchParams()

  const [savePageNum, setSavePageNum] = useState("")

  const page = searchParams.get("page")

  useEffect(() => {
    const pageControl = page === "0" ? "1" : page

    dispatch(setUsersTC(pageControl || "1")).then(() => {
      dispatch(setIsMeProfile({ isMeProfile: false }))
      setSavePageNum(page || "1")
    })
  }, [page])

  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <div className={s.skeleton} key={index}>
      <Skeleton circle={true} width={70} height={70} />
      <div>
        <Skeleton width={200} height={30} />
      </div>
    </div>
  ))

  if (savePageNum !== page) {
    return <>{skeletonItems}</>
  }

  if (!isLogged) {
    return <Navigate to={"/"}/>
  }

  return (
    <div>
      {getUsers.items.map((u) => {
        return (
          <Link key={u.id} to={`profile/${u.id}`} style={{ width: "max-content" }}>
            <User user={u} />
          </Link>
        )
      })}

      <Div1>
        <Div2>
          <PaginatedItems itemsPerPage={10} initialPage={Number(page) - 1} />
        </Div2>
      </Div1>
    </div>
  )
}

const Div1 = styled.div`
  display: flex;
`

const Div2 = styled.div`
  margin: 0 auto;
`
