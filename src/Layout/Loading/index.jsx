import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserInfo, setCode } from "@/store/modules/user"
import { useDispatch } from "react-redux";


const Loading = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [res, setRes] = useState(null)

    useEffect(() => {
        // 获取url中的参数
        const url = new URL(window.location.href);
        // console.log(url.searchParams.get('code'))
        async function getUserInfoFn() {
            if (url.searchParams.get('code')) {
                dispatch(await setCode(url.searchParams.get('code')))
                setRes(await dispatch(await getUserInfo()))
                if (res) {
                    navigate('/')
                }
            }
        }
        getUserInfoFn()
    }, [navigate, dispatch,res])

    const contentStyle = {
        padding: 300,
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
    };
    const content = <div style={contentStyle} />;
    return (
        <div>
            <Spin tip="Loading" size="large">
                {content}
            </Spin>
        </div>
    )
}

export default Loading