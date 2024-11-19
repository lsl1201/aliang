import './index.css'
import { SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd';
import { Logout } from "@/store/modules/user"
import { useDispatch } from 'react-redux'
const Info = ({ msg }) => {
    console.log(msg);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '成功退出登录',
        });
    };
    function LogoutFn() {
        dispatch(Logout())
        success()
        setTimeout(() => {
            window.location.reload()
        }, 1500);

    }

    return (
        <> {contextHolder}
            <div className='info'>

                <div style={{ display: "flex" }}>
                    <Avatar size={38} icon={<UserOutlined />} src={msg.avatar_url} />
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>{msg.name}</span>
                        <span >{msg.login}</span>
                    </div>
                </div>
                {msg.name === '刘善良' && <div className='info-btn'>
                    <SettingOutlined /> <span>后台管理</span>
                </div>}
                <div className='info-btn' onClick={() => LogoutFn()}>
                    <LogoutOutlined />
                    <span>退出登录</span>
                </div>
            </div></>
    )
}

export default Info