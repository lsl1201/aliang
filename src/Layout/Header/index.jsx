import { Col, Row} from 'antd';
import "./index.css"
import classNames from "classnames";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setActiveFn } from "@/store/modules/status"
// import { Logout } from "@/store/modules/user"
import { Avatar, Space } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom"



const Header = () => {
    const navigate = useNavigate()
    const { active } = useSelector((state) => state.status);
    const dispatch = useDispatch();
    const [avatarCount, setAvatarCount] = useState(64)

    function setActive1(index) {
        dispatch(setActiveFn(index.target.dataset.index))
    }
    useEffect(() => {
        let a = 0
        if (active === '/' || active === '/undefined') {
            a = 1
        } else if (active === '/article') {
            a = 2
        } else if (active === '/project') {
            a = 3
        } else if (active === '/message') {
            a = 4
        } else if (active === '/ama') {
            a = 5
        }
        menuLineRef.current.style.left = `${20 * (a - 1) + 5}%`
    }, [active])
    useEffect(() => {
        // 获取url
        const url = window.location.pathname
        const segments = url.split('/').filter(Boolean); // 使用 filter(Boolean) 去除空字符串
        const firstSegment = '/' +segments[0];
        dispatch(setActiveFn(firstSegment))
    }, [dispatch])
    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY || document.documentElement.scrollTop;
            let num = 64 - position / 4
            avatarRef.current.style.top = `${100 - position}px`
            if (num >= 64) {
                num = 64
            } else if (num <= 44) {
                num = 44
                avatarRef.current.style.top = "5px"
            }
            setAvatarCount(num)
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerRef = useRef('')
    const menuLineRef = useRef('')
    const avatarRef = useRef('')
    return (
        <div className='header-container'>
        <Row ref={headerRef} className='header'>
            <Col xs={2} sm={4} md={6} lg={9} xl={9} className='avatar'>
                <Space ref={avatarRef} wrap size={16} className='header-avatar' onClick={() => navigate('/')}>
                    <Avatar size={avatarCount} icon={<UserOutlined />} src='/icon.png' />
                </Space>
            </Col>
            <Col xs={20} sm={16} md={10} lg={6} xl={6}>
                <div className='header-menu'>
                    <ul onClick={setActive1}>
                        <li data-index='/' onClick={() => navigate('/')} className={classNames("header-menu-item", active === "/" || active === '/undefined'&& "active")} >首页</li>
                        <li data-index='/article' onClick={() => navigate('/article')} className={classNames("header-menu-item", active === "/article" && "active")} >博客</li>
                        <li data-index='/project' onClick={() => navigate('/project')} className={classNames("header-menu-item", active === "/project" && "active")} >项目</li>
                        <li data-index='/message' onClick={() => navigate('/message')} className={classNames("header-menu-item", active === "/message" && "active")} >留言板</li>
                        <li data-index='/ama' onClick={() => navigate('/ama')} className={classNames("header-menu-item", active === "/ama" && "active")}  >友联</li>
                    </ul>
                    <div ref={menuLineRef} className="header-line" />
                </div>
            </Col>
            {/* <Col xs={2} sm={4} md={6} lg={9} xl={9} align="middle" justify="center">
                {url == undefined ? <TeamOutlined style={
                    {
                        fontSize: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        padding: '10px',
                        marginTop: "5px",
                        cursor: "pointer"
                    }
                }
                    onClick={setIsLoginFn}
                /> : <div style={
                    {
                        position: 'absolute',
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <Avatar style={
                        {
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            marginTop: "5px",
                            cursor: "pointer",
                            width: '40px',
                            height: '40px',
                        }
                    } onClick={viewInfo} src={url} />
                    {!showInfo && <Info msg={msg} onSetShowInfo={setShowInfo} className="info" />}
                </div>
                }
            </Col> */}
           
        </Row>
         {/* {isLogin && <Login onSetIsLogin={setIsLoginFn} />} */}
        </div>
    )
}
export default Header