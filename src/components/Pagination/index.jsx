// import React from "react";
import { Pagination } from "antd";
import PropTypes from "prop-types"; // 添加这行
import styles from "./index.module.less";
// 封装分页组件
const PaginationComponent = ({
  current = 1,
  total = 1,
  pageSize = 10,
  onPageChange,
}) => {
  return (
    <Pagination
      className={styles.pagination}
      current={current} // 当前页
      total={total} // 数据总条数
      pageSize={pageSize} // 每页显示的条数
      onChange={onPageChange} // 页码变化时的回调
      showSizeChanger={false} // 隐藏页大小切换，若需要可以设置为 true
    />
  );
};
// 添加 PropTypes 验证
PaginationComponent.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
