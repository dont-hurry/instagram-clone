import NavigationLayout from "../components/layout/navigation";
import styles from "./page-base.module.css";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

export default function Feed() {
  return (
    <NavigationLayout>
      <div className={styles.twoColumnsFeedPage}>
        <Timeline />
        <Sidebar />
      </div>
    </NavigationLayout>
  );
}
