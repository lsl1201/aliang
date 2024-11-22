import "./index.css";
import { Button, Input, Avatar, Spin,  } from "antd";
import { UngroupOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { postMassage, getMassage } from "@/api/message";
import MessageList from "./messageList";

import ColorPicker from "../../components/colorPicker/index";

const Message = () => {
  const [num, setNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [messageListInfo, setMessageListInfo] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const colorPickerRef = useRef();
  const loadingRef = useRef(null);
  async function getMassageList() {
    let res = await getMassage({ page: num });
    if (res.length > 0) {
      setMessageListInfo((prevList) => [...prevList, ...res]);
    } else {
      setIsLoading(true);
      return () => {
        observer.unobserve(loadingRef.current);
      };
    }
  }

  const value = useRef(null);
  const signature = useRef(null);
  const [valueInfo, setValueInfo] = useState("");
  const [signatureInfo, setSignatureInfo] = useState("");

  async function addMessageFn() {
    const color = colorPickerRef.current.getColor();
    let data = {
      message: value.current.input.value,
      signature: signature.current.input.value
        ? signature.current.input.value
        : "匿名",
      color,
    };
    if (data.message === "") {
      return;
    }
    let res = await postMassage(data);
    if (res.status === 200) {
      let p = {
        message_content: value.current.input.value,
        signature: signature.current.input.value,
        avatar: userInfo.avatar_url,
        name: userInfo.name,
        create_time: "刚刚",
        color,
      };
      setMessageListInfo([p, ...messageListInfo]);
      setValueInfo("");
      setSignatureInfo("");
    }
  }
  useEffect(() => {
    if (num == 0) return;
    getMassageList();
  }, [num]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
          setNum((num) => num + 1);
        }
      });
    };

    // 创建 IntersectionObserver 实例
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // 设置为 null 代表根为视口
      threshold: 0.5, // 当元素至少 10% 可见时触发回调
    });

    // 开始观察目标元素
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    // 组件卸载时停止观察
    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, []);


  return (
    <div className="massage">
      <div className="massage-title">
                <span className='title-h1'>欢迎来到我的留言墙。</span>
                <p>在这里，你可以留下你想对我说的话，或是你的建议，或是你的想法，或是你的批评，或是你的赞美，或是你的鼓励，或是你的吐槽。</p>
            </div>
      {
        <div className="inputDiv">
          {/* <Avatar className='mssage-avatar' size={40} src={userInfo.avatar_url} /> */}
          <Input
            ref={value}
            value={valueInfo}
            onChange={(e) => setValueInfo(e.target.value)}
            onPressEnter={() => addMessageFn()}
            placeholder="说点什么吧，反正火不了呢..."
            variant="borderless"
          />
          <ColorPicker ref={colorPickerRef} />
        </div>
      }
      {
        <div className="signature">
          {/* <Avatar className='mssage-avatar' size={40} src={userInfo.avatar_url} /> */}
          <Input
            ref={signature}
            value={signatureInfo}
            onChange={(e) => setSignatureInfo(e.target.value)}
            onPressEnter={() => addMessageFn()}
            placeholder="签名..."
            variant="borderless"
          />
        </div>
      }
      <MessageList info={messageListInfo} />
      {/* {isLogin && <Login onSetIsLogin={setIsLoginFn}/>} */}
      {!isLoading ? (
        <div ref={loadingRef} className="loading">
          <Spin /> &nbsp;&nbsp; 正在拉取...
        </div>
      ) : (
        <div className="loading">
          <UngroupOutlined /> &nbsp;&nbsp; 暂无更多
        </div>
      )}
      <div style={{ height: "250px" }}></div>
    </div>
  );
};

export default Message;
