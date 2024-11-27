import React, { ChangeEvent, useState } from "react"
import { Status } from "../status/Status"
import { profileData } from "../../../users/api/userApi"
import { useFormik } from "formik"
import { updateProfilePhotoTC, updateProfileTC } from "../../model/profileSlice"
import { useAppDispatch } from "../../../../app/hooks/useAppDispatch"
import styled from "styled-components"
import SaveAsIcon from "@mui/icons-material/SaveAs"
import IconButton from "@mui/material/IconButton"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type EditProfilePropsType = {
  user: profileData
  setEditMode: (editMode: boolean) => void
  meId: string
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const EditProfile = ({ user, setEditMode, meId }: EditProfilePropsType) => {
  const dispatch = useAppDispatch()

  const updatePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0])
      dispatch(updateProfilePhotoTC(event.target.files[0], meId))
    } else {
      // Handle the case where no file is selected
      console.log("No file selected")
    }
  }

  const formik = useFormik({
    initialValues: {
      aboutMe: user.aboutMe,
      userId: user.userId,
      lookingForAJob: user.lookingForAJob,
      lookingForAJobDescription: user.lookingForAJobDescription,
      fullName: user.fullName,
      contacts: {
        github: user.contacts.github,
        vk: user.contacts.vk,
        facebook: user.contacts.facebook,
        instagram: user.contacts.instagram,
        twitter: user.contacts.twitter,
        website: user.contacts.website,
        youtube: user.contacts.youtube,
        mainLink: user.contacts.mainLink,
      },
    },
    onSubmit: (values) => {
      dispatch(updateProfileTC(values))
      setEditMode(false)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Div>
        <div style={{ width: "200px", height: "200px" }}>
          <img
            style={{ width: "200px" }}
            src={
              user.photos.large ||
              "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            }
          />
          <Button
              sx={{left: "49.5px", top: "105px", position: "absolute", zIndex: "100"}}
              size={"small"}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={updatePhoto}
                multiple
            />
          </Button>
        </div>
        <About>
          <div>
            <b style={{ fontSize: "1.2rem" }}>имя: </b>
            <span>
              <input type="text" name={"fullName"} value={formik.values.fullName} onChange={formik.handleChange} />
            </span>
          </div>
          <span>
            <b style={{ fontSize: "1.2rem" }}>статус: </b>
            <Status setEditMode={() => {}} editMode={false} />
          </span>
          <div>
            <b style={{ fontSize: "1.2rem" }}>ищу ли я работу: </b>
            <span>
              <input
                type="checkbox"
                name={"lookingForAJob"}
                checked={formik.values.lookingForAJob}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          <div>
            <b style={{ fontSize: "1.2rem" }}>сфера работы: </b>
            <span>
              <input
                type={"text"}
                name="lookingForAJobDescription"
                value={formik.values.lookingForAJobDescription}
                onChange={formik.handleChange}
              />{" "}
            </span>
          </div>
          <SaveBtn>
            <IconButton onClick={formik.submitForm}>
              <SaveAsIcon />
            </IconButton>
          </SaveBtn>
        </About>
      </Div>
      <Contacts>
        <h3>Контакты:</h3>
        <div>
          <b style={{ fontSize: "1.1rem" }}>github: </b>
          <span>
            <input
              type="text"
              name="contacts.github"
              value={formik.values.contacts.github}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>vk: </b>
          <span>
            <input type="text" name="contacts.vk" value={formik.values.contacts.vk} onChange={formik.handleChange} />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>facebook: </b>
          <span>
            <input
              type="text"
              name="contacts.facebook"
              value={formik.values.contacts.facebook}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>instagram: </b>
          <span>
            <input
              type="text"
              name="contacts.instagram"
              value={formik.values.contacts.instagram}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>twitter: </b>
          <span>
            <input
              type="text"
              name="contacts.twitter"
              value={formik.values.contacts.twitter}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>website: </b>
          <span>
            <input
              type="text"
              name="contacts.website"
              value={formik.values.contacts.website}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>youtube: </b>
          <span>
            <input
              type="text"
              name="contacts.youtube"
              value={formik.values.contacts.youtube}
              onChange={formik.handleChange}
            />
          </span>
        </div>
        <div>
          <b style={{ fontSize: "1.1rem" }}>mainLink: </b>
          <span>
            <input
              type="text"
              name="contacts.mainLink"
              value={formik.values.contacts.mainLink}
              onChange={formik.handleChange}
            />
          </span>
        </div>
      </Contacts>
    </Form>
  )
}

const Form = styled.form`
  height: max-content;
`

const Div = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
  
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
const SaveBtn = styled.div`
  position: absolute;
  top: 145px;
  left: 12px;
`
