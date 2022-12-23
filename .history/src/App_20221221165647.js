/*
 * @Author: sunheng
 * @Date: 2022-12-21 15:50:22
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-21 16:56:47
 * @Description: 请填写简介
 */

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";
// 客户端socket链接
const socket = io.connect("http//localhost:5000");
function App() {
  const [stream, setStream] = useState(null);
  const Myvideo = useRef();
  //
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => {
        console.log(res);
        setStream(res);
        Myvideo.current.srcObject = res;
      })
      .catch((err) => {
        console.log("没有摄像头", err);
      });
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>视频聊天应用</h1>
      <div className="container">
        {/* 视频容器 */}
        <div className="video-container">
          <div className="video">
            <video
              playsInline
              muted
              autoPlay
              style={{ width: "500px" }}
              ref={Myvideo}
            >
              {" "}
            </video>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
