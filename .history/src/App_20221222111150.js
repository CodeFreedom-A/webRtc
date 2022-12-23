/*
 * @Author: sunheng
 * @Date: 2022-12-21 15:50:22
 * @LastEditors: sunheng
 * @LastEditTime: 2022-12-22 11:11:12
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
const socket = io.connect("http://localhost:5000");
function App() {
  const [stream, setStream] = useState(null);
  const [name, setName] = useState(null);
  const [idToCall, setIdToCall] = useState(null);
  const Myvideo = useRef();
  const [me, setMe] = useState("");
  const callUser = (idToCall) => {
    const peer = new Peer({
      initiator: true, //是否是发起方
      stream: stream, //这是WebRtc返回的那些数据(音频视频啥的)
    });
    // 传递信令
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        from: me,
        idToCall,
        name,
      });
    });
  };
  const [callAccepted, setCallAcceted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
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
    socket.on("me", (id) => {
      setMe(id);
    });
    //接听方从服务器获取发送放的信息
    socket.on("callUser", (id) => {
      setMe(id);
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
            ></video>
          </div>
        </div>

        <div className="myId">
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            value={name}
            style={{ marginBottom: "20px" }}
            onChange={(e) => setName(e.target.value)}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button
              variant="contained"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              我的通话ID
            </Button>
          </CopyToClipboard>
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            value={idToCall}
            style={{ marginBottom: "20px" }}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary">
                结束通话
              </Button>
            ) : (
              <IconButton onClick={() => callUser(idToCall)}>
                <PhoneIcon></PhoneIcon>
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
