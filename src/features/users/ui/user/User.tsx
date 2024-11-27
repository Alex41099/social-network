import React from "react"
import { user } from "../../api/userApi"
import "./user.css"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"

export const User = (props: { user: user }) => {
  const { user } = props

  return (
    <Div key={user.id}>
      <Skeleton
        circle={true}
        width={70}
        height={70}
        style={{ position: "absolute", left: "20px", top: "15px", zIndex: "2" }}
      />
      <Wrapper>
        <img
          className={"img"}
          src={
            user.photos.small ||
            "https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
          }
        />
      </Wrapper>
      <Span>{user.name}</Span>
    </Div>
  )
}

const Wrapper = styled.div`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  z-index: 3;
`

const Div = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  border-radius: 10px;
  background-color: #fff;

  min-width: 200px;
  max-width: 100%;
  width: 100%;
  margin-bottom: 15px;
  padding: 15px 20px 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const Span = styled.span`
  position: absolute;
  display: inline-block;
  border: 1px solid silver;
  bottom: 20px;
  left: 95px;
  font-size: 1.1rem;
  letter-spacing: 0.6px;
  width: max-content;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 0px 15px 15px 15px;
`
