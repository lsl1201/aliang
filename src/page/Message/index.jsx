import './index.css'
import { Button, Input, Avatar } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import { useSelector, } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { postMassage, getMassage } from "@/api/message"
import MessageList from './messageList';
import Login from '../../Layout/Login';

const Message = () => {
    const  [messageListInfo,setMessageListInfo ] = useState([])
    const { userInfo } = useSelector(state => state.user)
    useEffect(() => {
        async function getMassageList() {
            let res = await getMassage()
            setMessageListInfo(res)
        }
        getMassageList()
    }, [])
    const value = useRef(null)
    const [valueInfo, setValueInfo] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    function setIsLoginFn() {
        setIsLogin(!isLogin)
    }
    async function addMessageFn() {
        let data = {
            id: userInfo.id,
            message: value.current.input.value,
        }
        if(data.message === ''){
            return
        }
        let res = await postMassage(data)
        if(res.status === 200){
            let p = {
                message_content: value.current.input.value,
                avatar: userInfo.avatar_url,
                name: userInfo.name,
                create_time: "刚刚"
            }
            setMessageListInfo([p, ...messageListInfo])
            setValueInfo('')
        }
    }

    return (
        <div className="massage">
            <div className="massage-title">
                <span className='title-h1'>欢迎来到我的留言墙。</span>
                <p>在这里，你可以留下你想对我说的话，或是你的建议，或是你的想法，或是你的批评，或是你的赞美，或是你的鼓励，或是你的吐槽。</p>
            </div>
            {
                <div className='inputDiv'>
                    <Avatar className='mssage-avatar' size={40} src={userInfo.avatar_url} />
                    <Input ref={value} value={valueInfo} onChange={(e) => setValueInfo(e.target.value)} onPressEnter={() => addMessageFn()} placeholder="说点什么吧，反正火不了呢..." variant="borderless" />
                </div>}
            <MessageList  info={messageListInfo} />
            {/* {isLogin && <Login onSetIsLogin={setIsLoginFn}/>} */}
            <div style={{height:'250px'}}></div>
        </div>
    )
}

export default Message