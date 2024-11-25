import './index.css';
import MessageDetails from './messageDetails.tsx';
import { useState } from 'react';

const MessageList = ({ info }) => {
  const [open, setOpen] = useState(false);
  const [messageDetailsInfo, setMessageDetailsInfo] = useState('');
  const onClose = () => {
    setOpen(false);
  };
  // console.log(info)
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
    <div className="massage-info" style={{ marginTop: "50px" }}>
      {info &&
        info.length > 0 &&
        info.map((item, index) => (
          <div key={index}>
            <div
              className="massage-list"
              style={{
                backgroundColor: item.color?item.color:"#fff",
                color: isDarkColor(item.color) ? "#333" : "#fff",
              }}
              onClick={() => {
                setOpen(true);
                setMessageDetailsInfo(item);
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
        <MessageDetails open={open} close={onClose} info={messageDetailsInfo} isDarkColor={isDarkColor} />
    </div>
  );
}
export default MessageList