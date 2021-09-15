import { FC, useEffect, useState } from 'react';

import { ORDER_EXPIRE_TIME } from '~/constants';


interface Props {
    startDate: Date;
    text: string;
    expireTime?: number
    onExpire?: () => void
    show?: boolean
}

const ConfirmTimer: FC<Props> = ({
    startDate,
    text,
    expireTime = ORDER_EXPIRE_TIME,
    onExpire,
    show = false,
}) => {
    const [time, setTime] = useState<Date|null>();

    useEffect(() => {
        if (!show) return () => undefined;
        const id = setInterval(() => {
            const date = new Date(startDate.getTime() - Date.now() + expireTime);
            if (date.getTime() <= 0) {
                clearInterval(id);
                onExpire?.();
            }
            setTime(date);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    if (!show) return null;

    if (!time) return <div className="p-2"><span>{text}</span></div>;

    const min = time.getMinutes();
    const sec = `${time.getSeconds()}`.padStart(2, '0');

    return (
        <div className="p-2">
            <span>{text}</span>
            <span>{min}:{sec}</span>
        </div>
    );
};

export default ConfirmTimer;
