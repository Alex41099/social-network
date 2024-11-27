import React, { useEffect, useState } from "react"
import { updateProfileStatusTC } from "../../model/profileSlice"
import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { useAppDispatch } from "../../../../app/hooks/useAppDispatch"
import { useParams } from "react-router-dom"

type StatusPropsType = {
  editMode: boolean
  setEditMode: (editMode: boolean) => void
}

export const Status = ({ editMode, setEditMode }: StatusPropsType) => {
  const dispatch = useAppDispatch()
  const userId = useParams().userId
  const status = useAppSelector((state) => state.profile.status)

  const [localStatus, setLocalStatus] = useState(status)
  const updateStatus = (value: string) => {
    setLocalStatus(value)
  }

  const blurStatus = () => {
    dispatch(updateProfileStatusTC(localStatus))

    setEditMode(false)
  }

  return (
    <>
      {editMode ? (
        <input
          type="text"
          value={localStatus}
          onBlur={blurStatus}
          onChange={(e) => updateStatus(e.currentTarget.value)}
          autoFocus
        />
      ) : (
        <span>{status || "нет статуса"}</span>
      )}
    </>
  )
}
