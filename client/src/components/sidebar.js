// import Editor from "./editor";
import styles from "./sidebar.module.css";
import { FaArrowsAltH } from 'react-icons/fa';

export default function Sidebar(props) {
  const sidebarClass = props.isOpen ? styles.sidebar : styles.sidebarClosed;
  return (
    <>
      <div className={sidebarClass}>
        <div className={styles.sidebarFlex}>
          <button
            onClick={props.toggleSidebar}
            className={
              props.isOpen ? styles.sidebarToggle : styles.sidebarToggleClosed
            }
          >
            <FaArrowsAltH />
          </button>
          <div>
            {/* <Editor /> */}
          </div>
        </div>
      </div>
    </>
  );
}
