import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAlerts } from 'redux/alerts';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

const Toast = () => {
    const alerts = useSelector(selectAlerts);
    useEffect(() => {
        alerts.forEach(alert => {
            const toastType = toast[alert.type];
            toastType(alert.message, {
                position: 'top-right',
                autoClose: alert.timeout,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });
        });
    }, [alerts]);
};

export default Toast;
