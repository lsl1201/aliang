import { Avatar } from 'antd';
import './index.css'
import dayjs from 'dayjs';
const MessageList = ({ info }) => {
    // console.log(info)
    // const LoginInformation = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(LoginInformation.id)
    function setTime(time) {
        // 获取当前时间戳
        let now = dayjs().valueOf()
        console.log(now)
        if (now - time < 60 * 1000) {
            return dayjs(time).format('HH:mm:ss')
        }
        // return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }
    return (
        <div style={{ marginTop: '50px' }}>
            {info && info.length > 0 && info.map((item, index) => (
                <div key={index}>
                    <div className='massage-list'>
                        <div className="massage-list-avatar">
                            <Avatar size={38} src={item.avatar} />
                        </div>
                        <div>
                            <div >
                                <span className='massage-list-name'>{item.name}</span>
                                <span className='massage-list-time'>
                                    {item.create_time} 
                                    {/* {dayjs(Number(item.create_time)).format('YYYY-MM-DD HH:mm:ss')} */}
                                </span>
                            </div>
                            <div className='massage-list-message_content'  >
                                <div className='massage-list-line' />
                                <span>{item.message_content}</span>
                            </div>
                        </div>
                    </div>

                </div>
            )

            )}
        </div>
    )
}
export default MessageList