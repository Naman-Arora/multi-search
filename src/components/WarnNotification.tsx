import { showNotification } from "@mantine/notifications";
import { BsExclamationLg } from "react-icons/bs";

const WarnNotification = () => {
  showNotification({
    message: 'Please have a query!',
    autoClose: 5000,
    color: 'red',
    icon: <BsExclamationLg />,
  });
}

export default WarnNotification;