import React, { useEffect, useState } from "react"
import {Navigate, useParams} from "react-router-dom"
import { useAppSelector } from "../../../app/hooks/useAppSelector"
import { useAppDispatch } from "../../../app/hooks/useAppDispatch"
import { fetchUserProfileTC, getStatusTC } from "../model/profileSlice"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Status } from "./status/Status"
import { EditProfile } from "./EditProfile/EditProfile"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import IconButton from "@mui/material/IconButton"
import styled from "styled-components"
import { setIsMeProfile } from "../../auth/model/authSlice"
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone"

export const Profile = () => {
  const dispatch = useAppDispatch()
  const userId = useParams().userId
  const user = useAppSelector((state) => state.profile)
  const isLoading = useAppSelector((state) => state.profile.isLoading)
  const meId = useAppSelector((state) => state.auth.meData.id)
  const isLogged = useAppSelector((state) => state.auth.isLogged)

  const [load, setLoad] = useState(true)

  useEffect(() => {
    setEditMode(false)
    if (userId) {
      dispatch(fetchUserProfileTC(Number(userId))).then(() => {
        dispatch(setIsMeProfile({ isMeProfile: false }))
        dispatch(getStatusTC(Number(userId))).then(() => {
          setLoad(false)
        })
      })
    } else {
      dispatch(fetchUserProfileTC(meId)).then(() => {
        dispatch(setIsMeProfile({ isMeProfile: true }))
        dispatch(getStatusTC(meId)).then(() => {
          setLoad(false)
        })
      })
    }
  }, [userId])

  const [editMode, setEditMode] = useState(false)
  const [editModeStatus, setEditModeStatus] = useState(false)
  const clickStatus = () => {
    setEditModeStatus(true)
  }

  if (!isLogged) {
    return <Navigate to={"/"}/>
  }

  if (isLoading || load) {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Skeleton width={200} height={200} style={{ marginLeft: "20px", marginTop: "20px" }} />
          <Skeleton width={590} height={200} style={{ marginLeft: "20px", marginTop: "20px" }} />
        </div>
        <h3>
          <Skeleton width={200} height={22} style={{ marginLeft: "20px", marginBottom: "5px", marginTop: "10px" }} />

          <Skeleton width={200} height={20} count={3} style={{ marginLeft: "20px", marginTop: "10px" }} />
        </h3>
      </div>
    )
  }


  return (
    <>
      {editMode ? (
        <EditProfile user={user} setEditMode={setEditMode} meId={meId.toString()} />
      ) : (
        <Div>
          <div style={{ width: "200px", height: "200px" }}>
            <img
              style={{ width: "200px" }}
              src={
                user.photos.large ||
                "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              }
            />
          </div>
          <About>
            <div>
              <b style={{ fontSize: "1.2rem" }}>имя: </b>
              <span>{user.fullName || "..."}</span>
            </div>
            <Span>
              <b style={{ fontSize: "1.2rem" }}>статус: </b>
              <Status setEditMode={setEditModeStatus} editMode={editModeStatus} />
              {!userId && (
                <IconButton size={"small"} onClick={() => setEditModeStatus(!editModeStatus)}>
                  {editModeStatus ? <FileDownloadDoneIcon /> : <ModeEditIcon />}
                </IconButton>
              )}
            </Span>
            <div>
              <b style={{ fontSize: "1.2rem" }}>ищу ли я работу: </b>
              <span>{user.lookingForAJob ? "да" : "нет"}</span>
            </div>
            <div>
              <b style={{ fontSize: "1.2rem" }}>сфера работы: </b>
              <span>{user.lookingForAJobDescription || "не указан"}</span>
            </div>
            <EditBtn>
              {!userId && (
                <IconButton onClick={() => setEditMode(true)}>
                  <ModeEditIcon />
                </IconButton>
              )}
            </EditBtn>
          </About>
        </Div>
      )}
      {!editMode && (
        <Contacts>
          <h3>Контакты:</h3>
          {!user.contacts.mainLink &&
            !user.contacts.youtube &&
            !user.contacts.github &&
            !user.contacts.vk &&
            !user.contacts.facebook &&
            !user.contacts.instagram &&
            !user.contacts.twitter &&
            !user.contacts.website && <p>Нет контактов!</p>}
          {user.contacts.github && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>github: </b>
              <span>{user.contacts.github}</span>
            </div>
          )}
          {user.contacts.vk && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>vk: </b>
              <span>{user.contacts.vk}</span>
            </div>
          )}
          {user.contacts.facebook && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>facebook: </b>
              <span>{user.contacts.facebook}</span>
            </div>
          )}
          {user.contacts.instagram && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>instagram: </b>
              <span>{user.contacts.instagram}</span>
            </div>
          )}
          {user.contacts.twitter && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>twitter: </b>
              <span>{user.contacts.twitter}</span>
            </div>
          )}
          {user.contacts.website && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>website: </b>
              <span>{user.contacts.website}</span>
            </div>
          )}
          {user.contacts.youtube && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>youtube: </b>
              <span>{user.contacts.youtube}</span>
            </div>
          )}
          {user.contacts.mainLink && (
            <div>
              <b style={{ fontSize: "1.1rem" }}>mainLink: </b>
              <span>{user.contacts.mainLink}</span>
            </div>
          )}
        </Contacts>
      )}
    </>
  )
}

const Div = styled.div`
  display: flex;
  padding: 20px;

  img {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`
const About = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  margin: 0px 0 0 20px;
  padding: 20px 20px;
  border-radius: 10px;
  min-width: 400px;
  max-width: 700px;
  width: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`
const Contacts = styled.div`
  margin-top: 10px;
  margin-left: 25px;
  padding-bottom: 20px;

  h3 {
    margin: 0 0 9px 0;
  }
  div {
    margin: 0 0 8px 0;
  }
`
const EditBtn = styled.div`
  position: absolute;
  top: 145px;
  left: 12px;
`
const Span = styled.span`
  button {
    position: absolute;
    margin: 0;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`
