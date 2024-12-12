import { useState } from "react";
import style from "./index.module.less";
import { useRef, useEffect } from "react";

const TextComponent = () => {
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  let [num1, setNum1] = useState(200);
  let [num2, setNum2] = useState(200);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let opacity = 1
      let opacity2 = 1
      if (scrollY > 3317 && scrollY < 4000) {
        setNum1(200 - scrollY * 0.2 + 700);
      } else if (scrollY > 4000) {
        setNum1(100);
      } else if (scrollY < 3317) {
        setNum1(200);
      }
      if (scrollY < 3750) {
        opacity = 0.2
      }
      if (scrollY < 4145) {
        opacity2 = 0.2
      }
      console.log(scrollY)

      if (scrollY > 4200 && scrollY < 4600) {
        setNum2(200 - scrollY * 0.2 + 800);
      } else if (scrollY > 4900) {
        setNum2(60);
      } else if (scrollY < 4200) {
        setNum2(200);
      }
      if (num2 < 60) {
        setNum2(60);
      }

      textRef.current.style.fontSize = `${num1}px`;
      textRef.current.style.opacity = `${opacity}`;
      textRef2.current.style.fontSize = `${num2}px`;
      textRef2.current.style.opacity = `${opacity2}`;

    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [num1, num2]);

  return (
    <div className={style.text}>
      <div ref={textRef} style={{ height: '600px' }}>我们曾挥霍的一切</div>
      <div ref={textRef2} >在最高处必将汇合</div>
    </div>
  );
};

export default TextComponent;
