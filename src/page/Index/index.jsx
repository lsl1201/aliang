import './index.less'
import { useEffect, useState } from "react";
import { Avatar } from 'antd';
// import classNames from 'classnames';
import Timeline from '../../components/Timeline';
import { getWorkExperience, getWeather, getUtils } from '@/api/api'
import { getMassage } from '@/api/message.js'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { DisconnectOutlined } from "@ant-design/icons";
import Force from './force/index';
import Tracks from './tracks';
import TextComponent from './text';
import Social from './social';
import SnowScratch from './snowScratch';
const Index = () => {
    const [workExperience, setWorkExperience] = useState(null)
    const [messageInfo, setMessageInfo] = useState(null)
    const longitudeAndLatitude = useSelector(state => state.jwdStore); // 获取经纬度
    const [cityWeather, setCityWeather] = useState({})
    const [utilsList, setUtilsList] = useState(null)
    const weatherBackground = {
        '晴': 'linear-gradient(120deg, #f77062 0%, #fe5196 100%)',
        '多云': 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
        '阴': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        '阵雨': 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        '雷阵雨': 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        '小雨': 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        '雷阵雨伴冰雹': 'linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%)',
        '雨夹雪': 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
    };
    useEffect(() => {
        async function getWorkExperienceFn() {
            let res = await getWorkExperience()
            setWorkExperience(res.reverse())
            let res2 = await getMassage({ page: 1 })
            setMessageInfo(res2)
            let res3 = await getUtils()
            setUtilsList(res3)
        }
        getWorkExperienceFn()
    }, [])
    useEffect(() => {
        async function getWeatherFn() {
            let data = {
                location: longitudeAndLatitude.longitudeAndLatitude
            }
            let res = await getWeather(data)
            setCityWeather(res)
        }
        getWeatherFn()
    }, [longitudeAndLatitude])

    function hexToRgb(hex) {
        // 去掉 '#' 前缀，如果存在
        if (!hex) return { r: 0, g: 0, b: 0 };
        hex = hex.replace(/^#/, "");

        // 处理简写格式 #abc -> #aabbcc
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((char) => char + char)
                .join("");
        }

        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return { r, g, b };
    }

    // 计算亮度 (Y)
    function getLuminance({ r, g, b }) {
        const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }

    // 判断颜色是否接近深色
    function isDarkColor(hex) {
        const rgb = hexToRgb(hex);
        const luminance = getLuminance(rgb);

        // 如果亮度低于 0.5，认为是深色
        return luminance > 0.3;
    }
    return (
        <div>
            <div className="index">
                <div className="title">
                    <span> &lt;开发者 /&gt;</span>，
                    <span className='Designer'>
                        <span className='corner'></span>
                        设计师</span>，
                    <br />
                    <span>搬砖人</span>，
                    <span className='Details'>
                        <span className='DetailsIcon '>
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="svgRotate">
                                <path d="M4.35 17.4V18.75M4.35 18.75V20.1M4.35 18.75H5.7M4.35 18.75H3M12.9 3L13.2202 5.51971C13.6243 8.69877 16.0808 11.2281 19.2467 11.7249L21 12L19.2467 12.2751C16.0808 12.7719 13.6243 15.3012 13.2202 18.4803L12.9 21L12.5798 18.4803C12.1757 15.3012 9.71919 12.7719 6.5533 12.2751L4.8 12L6.5533 11.7249C9.71919 11.2281 12.1757 8.69877 12.5798 5.51971L12.9 3ZM5.7 3L5.76713 3.40758C5.95525 4.54964 6.85036 5.44475 7.99242 5.63286L8.4 5.7L7.99242 5.76713C6.85036 5.95525 5.95525 6.85036 5.76713 7.99242L5.7 8.4L5.63286 7.99242C5.44475 6.85036 4.54964 5.95525 3.40758 5.76713L3 5.7L3.40758 5.63286C4.54964 5.44475 5.44475 4.54964 5.63286 3.40758L5.7 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                </path></svg></span>
                        <span className='DetailsText'>细节控。</span>
                    </span>
                </div>

                <div>
                    <span>
                        我是MOON，一个存活于互联网的边缘的搬砖人;<br />
                        我热爱开发，设计，创新，享受生活，以及在未知领域中探索。
                    </span>
                </div>
            </div>
            <div>
                <Social />
            </div>
            <div className='banner'>
                <div className='Weather'>
                    {cityWeather.status == 1 ? (<div className='WeatherInfo' >
                        <div className='Weathericon' style={{ background: weatherBackground[cityWeather.lives[0].weather] }}>
                            {cityWeather.lives[0].weather}
                        </div>
                        <div>{cityWeather.lives[0].city}</div>
                        <div>温度：{cityWeather.lives[0].temperature}℃</div>
                        <div>风力：{cityWeather.lives[0].winddirection}风{cityWeather.lives[0].windpower}级</div>
                        <div>更新时间：{cityWeather.lives[0].reporttime}</div>
                    </div>) : (<div className='WeatherInfo' >获取天气失败：
                        {cityWeather.info}</div>)}
                </div>
                <div className='bannerInfo'>
                    <div className="text">
                        <h2>时光留言墙，留下你的足迹</h2>
                        <div>当下的心情，就让它留在当下吧～</div>
                        <div>如您对留言墙感兴趣，欢迎来留言。</div>
                    </div>
                    <img className='bannerInfoImg' src="/src/assets/message.png" alt="" />
                    <div className='bannerInfoButton' onClick={() => {
                        window.location.href = '/message';
                    }
                    }>
                        去留言
                    </div>
                </div>
            </div>
            <div className='links'>
                <div>
                    <span className='linksTitle'>实用工具</span><span>收集一些实用网站...</span>
                </div>
                <div className="linksContent2">
                    {utilsList &&
                        utilsList.map((item, index) =>
                            item.isshow == true ? (
                                <div key={index}>
                                    <Link
                                        target="_blank"
                                        to={item.address}
                                        className="project-link"
                                    >
                                        <div className="links-item2">
                                            <Avatar
                                                className="links-item-Avatar"
                                                size={50}
                                                icon={<DisconnectOutlined />}
                                                src={item.avatar}
                                            />
                                            <div className="links-item-text">
                                                <strong className="links-item-name">
                                                    {item.name}
                                                </strong>
                                                <span className="links-item-description">
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ) : null
                        )}
                </div>
            </div>

            <div className='messageWall'>
                <div>
                    <span className='messageWallTitle'>留言墙</span><span>一面可以留言的墙...</span>
                </div>
                <div className="massage-info" >
                    {messageInfo &&
                        messageInfo.length > 0 &&
                        messageInfo.map((item, index) => (
                            <div key={index}>
                                <div
                                    className="massage-list"
                                    style={{
                                        backgroundColor: item.color ? item.color : "#fff",
                                        color: isDarkColor(item.color) ? "#333" : "#fff",
                                    }}
                                >
                                    <div className="massage-list-time">
                                        <span>{item.create_time}</span>
                                    </div>
                                    <div className="massage-list-message_content">
                                        <span>{item.message_content}</span>
                                    </div>
                                    <div className="massage-list-message_signature">
                                        <span >{item.signature ? item.signature : "匿名"}</span>

                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className='customdiv' onClick={() => {
                    window.location.href = '/message';
                }
                }>
                    进入留言墙
                </div>

            </div>
            <div className='indexAbout'>
                <div className='aboutMOON'>
                    <h3 className='aboutMOONTitle'>Abuot MOON</h3>
                    <span>
                        MOON这个怪兮兮的ID意为“月亮”，幕后工作者。
                        <br />
                        95后前端工作者，当然因为长期缺乏与人的技术交流且几乎没换过公司，代码写得相当混乱。
                        <br />
                        幸亏本身对前端也算得上热爱，倒也不排斥学新技术。
                        <br />
                        目前有前端开发、NodeJs开发、UI/UX 设计、内容创作等经验
                        <br />
                        性格以当今流行的MBTI<span style={{ textDecoration: 'line-through' }}>赛博占星</span>测试看属于<span className='gradient-text '>ISFP-T</span>。
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'right', }}>
                    <h3 style={{ marginRight: '20px' }}>工作经历</h3>
                    <Timeline data={workExperience} />
                </div>

            </div>
            <div>
                <h3 className='Skills'>My Skills</h3>
                <Force />
            </div>
            <div>
                <h3 className='Skills'>My Tracks</h3>
                <Tracks />
            </div>
            <div style={{ marginTop: '300px' }}>
                <h3 className='Skills'></h3>
                <TextComponent />
            </div>
            <div style={{ height: '100px' }}></div>
            <div >
                <SnowScratch />
            </div>


            {/* <div className='test'></div> */}
            <div style={{ height: '100px', textAlign: 'center', lineHeight: '100px' }}>
                --------- 到达了世界尽头 ----------
            </div>
        </div>
    )
}
export default Index