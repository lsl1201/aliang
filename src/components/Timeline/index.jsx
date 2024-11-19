// import PropTypes from 'prop-types';
import { Timeline } from 'antd';
import styles from'./index.module.less'

const App = ({ data }) => (
  <Timeline mode={'left'} className={styles.ul}
    items={data}
  />
);

// App.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       children: {},
//     })
//   ).isRequired,
// };

export default App;
