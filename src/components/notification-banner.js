import style from "./notification-banner.module.css";

const NotificationBanner = ({ show, children }) => {
  return (
    <div className={`${style.banner} ${show ? style.show : ""}`}>
      {children}
    </div>
  );
};

export default NotificationBanner;
