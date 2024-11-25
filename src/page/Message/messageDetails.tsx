import React, { useState } from "react";
import { Button, Drawer } from "antd";
type InfoProps = {
  info: {
    signature: string;
    message_time: string;
    message_content: string;
    color: string;
    create_time: string;
    message_id: string;
    uid: string;
  };
  open: boolean;
  close: () => void;
  isDarkColor: (e:string) => boolean;
};
const MessageDetails: React.FC<InfoProps> = (props) => {
  return (
    <>
      <Drawer
        className="messageDetails"
        // mask={false}
        style={{
          backgroundColor: props.info.color,
          color: props.isDarkColor(props.info.color) ?  "#000":"#fff" ,
        }}
        title={props.info.signature}
        onClose={props.close}
        open={props.open}
      >
        <div>{props.info.message_time}</div>
        <div>{props.info.message_content}</div>
      </Drawer>
    </>
  );
};

export default MessageDetails;
