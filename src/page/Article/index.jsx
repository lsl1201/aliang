import styles from "./index.module.less";
import { getArticleList } from "../../api/article";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/Pagination/index";
const Message = () => {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  function handleRouter(item) {
    console.log(item);
    navigate(`/article/${item.id}/${item.title}`);
  }
  async function getArticleListFn(page = 1) {
    let res = await getArticleList(page);
    console.log(res);
    setArticleList(res.articles);
    setTotal(res.total);
  }
  useEffect(() => {
    getArticleListFn(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.massage}>
      <div className={styles.massageTitle}>
        <span className={styles.titleH1}>欢迎光临我的博客。</span>
        <p>
          写博客文章是我比较喜欢的沉淀分享方式，我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如设计、生活随笔等等。
        </p>
      </div>
      <div className={styles.article}>
        {articleList &&
          articleList.map((item, index) => (
            <div
              key={index}
              className={classNames(styles.articleItem, styles.rainbowDiv)}
              onClick={() => handleRouter(item)}
            >
              <img
                className={classNames(styles.articleItemImg)}
                src={item.url && item.url}
                alt=""
              />
              <div className={styles.articleItemTitle}>{item.title}</div>
            </div>
          ))}
      </div>
      <PaginationComponent
        current={currentPage}
        total={total}
        onPageChange={(page) => {
          setCurrentPage(page);
          getArticleListFn(page);
        }}
      />
      <div style={{ height: "250px" }}></div>
    </div>
  );
};

export default Message;
