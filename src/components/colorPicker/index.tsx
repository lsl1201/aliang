import React, { useState, forwardRef, useImperativeHandle } from "react";
import { DownOutlined } from '@ant-design/icons';
import { ColorPicker, Space } from 'antd';

const Demo = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#f3f5b8");
  useImperativeHandle(ref, () => ({
    getColor: () => color, // Return the current color
  }));
  const getColor = (e) => {
    const newColor = e.toHexString();
    setColor(newColor); // Save the selected color in state
  };
  return (
    <Space direction="vertical">
      <ColorPicker
        defaultValue="#f3f5b8"
        defaultFormat="hex"
        open={open}
        onOpenChange={setOpen}
        showText={() => (
          <DownOutlined
            rotate={open ? 180 : 0}
            style={{
              color: "rgba(0, 0, 0, 0.25)",
            }}
          />
        )}
        onChangeComplete={getColor}
      />
    </Space>
  );
});

export default Demo;