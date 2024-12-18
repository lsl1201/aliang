import { getArticleContent } from "@/api/article";
import { useEffect, useRef, useState } from "react";
import styles from "../index.module.less";
import "./index.less";
import { Affix, Button } from "antd";
import { ArrowLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { MdPreview, MdCatalog } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
const editorId = "article-editor";
const ArticleContent = () => {
  const { id, fileName } = useParams();
  const navigate = useNavigate();
  const goTop = useRef(null);
  const [state, setstate] = useState({
    text: "",
    scrollElement: document.documentElement,
  });

  const handleBack = () => {
    navigate(-1);
    setTop(top + 10);
  };
  const [top, setTop] = useState(30);
  const [topStyles, setTopStyles] = useState({
    position: "fixed",
    bottom: "50px",
    right: "100px",
    zIndex: "9999 !important",
    opacity: 0,
    transition: "opacity 0.5s ease-in-out",
  });

  // 获取url参数
  const [article, setArticle] = useState({ content: "" });
  useEffect(() => {
    window.scrollTo(0, 0);
    async function getArticleFn() {
      let res = await getArticleContent(id);
      setArticle(res);
      setstate({
        text: res.content,
        scrollElement: document.documentElement,
      });
    }
    getArticleFn();
  }, [id]);
  useEffect(() => {
    console.log(article);
  }, [article]);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || document.documentElement.scrollTop;
      if (position > 400) {
        setTopStyles({
          position: "fixed",
          bottom: "50px",
          right: "100px",
          zIndex: "999",
          opacity: 1,
          transition: "opacity 0.5s ease-in-out",
        });
      } else {
        setTopStyles({
          position: "fixed",
          bottom: "50px",
          right: "100px",
          zIndex: "999",
          opacity: 0,
          transition: "opacity 0.5s ease-in-out",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function getCatalog(catalog) {
    console.log(catalog);
  }
  return (
    <div className={styles.articleContent}>
      <Affix offsetTop={top} ref={goTop} style={topStyles}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        />
      </Affix>
      <Affix offsetTop={80} style={{ transition: "opacity 1s ease-in-out" }}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
        />
      </Affix>
      <h2 style={{ marginLeft: "20px" }}>{fileName}</h2>
      <MdPreview id={editorId} value={state.text} toggleCatalog={true} />
      <MdCatalog
        class="Catalog"
        editorId={editorId}
        scrollElement={state.scrollElement}
      />
    </div>
  );
};

export default ArticleContent;
