import { UsergroupAddOutlined, EnvironmentOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useEffect, useState } from 'react';
import './index.css'
import { getLocationInfo } from '../../api/api'
const Footer = () => {
    const [ipInfo, setIpInfo] = useState({})
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getMassage() {
            let res = await axios.get(
                `https://api.ip.sb/geoip`
            );
            // console.log(res)
            setIpInfo(res.data)
            let { count } = await getLocationInfo()
            // console.log(count)
            count = (count / 1000).toFixed(2)
            setCount(count)
        }
        getMassage()
    }, [])

    return (
        <div className='footer'>
            <div>
                @2024 All rights reserved by <span>MOOM</span>. &nbsp;
                <span>
                    &amp;
                    <a href="https://beian.miit.gov.cn" target="_blank">
                        豫ICP备2023012660号-1
                    </a>
                </span>.&nbsp;
                {/* &amp;网站开源： */}
            </div>
            <div>
                <UsergroupAddOutlined />总浏览量 {count}k <EnvironmentOutlined />最近访客来自：{ipInfo.city},{ipInfo.country_code}
            </div>
        </div>
    )
}

export default Footer