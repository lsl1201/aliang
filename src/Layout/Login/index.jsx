import './index.css'
import { CloseOutlined, ArrowRightOutlined, GithubOutlined } from '@ant-design/icons';
import { Divider, Input, Button, Form, Spin,Avatar } from 'antd';
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { login } from "@/store/modules/user"
// import { setPlatform } from "@/store/modules/user"

const Login = (props) => {
    const {onSetIsLogin} = props
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
    };
    function handleLogin(e) {
        setIsLoading(true)
        localStorage.setItem("platform", e)
        dispatch(login(e))
    }
    return (
        <div className="login">
            <div className="login-content">
                <div className="login-close">
                    <Avatar size={32}  src='/icon.png' />
                    <CloseOutlined onClick={()=>onSetIsLogin()} />
                </div>
                <div>
                    <span style={{ fontSize: '24px', fontWeight: "600" }}>登录</span>
                    <br />
                    <span>继续使用lsltest.top</span>
                </div>
                <div className="loginMethod">
                    <div
                        className="login-input"
                        onClick={() => { handleLogin("github") }}
                    >
                        <div className='login-input-icon'>
                            {!isLoading ? <GithubOutlined style={{ marginRight: "10px" }} /> : <Spin />}
                        </div>
                        <div className='login-input-text'>
                            <span >使用GitHub登录</span>
                            <ArrowRightOutlined className='RightOutlined' />
                        </div>
                    </div>
                    <div
                        className="login-input"
                        onClick={() => { handleLogin("gitee") }}
                    >
                        <div className='login-input-icon'>
                            {!isLoading ? <GithubOutlined style={{ marginRight: "10px" }} /> : <Spin />}
                        </div>
                        <div className='login-input-text'>
                            <span >使用Gitee登录</span>
                            <ArrowRightOutlined className='RightOutlined' />
                        </div>
                    </div>
                </div>
                <Divider plain><span>或者</span></Divider>
                <div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Form.Item
                            label="电子邮件地址"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入电子邮件地址!',
                                },
                                {
                                    type: 'email',
                                    message: '请输入有效的电子邮件地址!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <Button style={{ width: '100%', marginTop: '10px', backgroundColor: '#000', color: '#fff' }} htmlType="submit">继续</Button>
                        </Form.Item>
                        <Form.Item
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            还没有账号？ <span style={{ color: '#000', cursor: 'pointer', textDecoration: "underline" }}>注册</span>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login