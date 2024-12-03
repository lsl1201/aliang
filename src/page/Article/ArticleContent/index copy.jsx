import { getArticleContent } from "@/api/article";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // 引入 rehype-raw 插件
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "../index.module.less";
import { Affix, Button } from "antd";
import { ArrowLeftOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
const ArticleContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goTop = useRef(null);

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
  const [article, setArticle] = useState({ fileName: "", content: "" });
  useEffect(() => {
    window.scrollTo(0, 0);
    async function getArticleFn() {
      let res = await getArticleContent(id);
      setArticle(res);
    }
    getArticleFn();
  }, [id]);
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
      <div className={styles.articleContentTitle}>{article.fileName}</div>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={article.content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // 使用 rehypeRaw 插件来渲染 HTML
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default ArticleContent;
