import { FC, memo, useEffect, useState } from 'react';


interface Props {
    message?: string|null
    type?: 'warning'|'info'|'success'|'danger'|'primary'|'secondary'
}


const Alert: FC<Props> = ({ message, type = 'success' }) => {
    const [show, setShow] = useState(() => Boolean(message));

    useEffect(() => {
        setShow(() => Boolean(message));
    }, [message, type]);

    if (!show) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            <i className="bi bi-exclamation-triangle px-2" />
            {message}
            <button
                aria-label="Close"
                className="btn-close"
                type="button"
                onClick={() => setShow(false)}
            />
        </div>
    );
};

export default memo(Alert);
