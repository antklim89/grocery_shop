import { FC, useEffect, useState } from 'react';


interface Props {
    startDate: Date;
    text: string;
    expireTime?: number
    onExpire?: () => void
}

const ConfirmTimer: FC<Props> = ({
    startDate,
    text,
    expireTime = 1000 * 60 * 15,
    onExpire,
}) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const id = setInterval(() => {
            const date = new Date(Math.abs(startDate.getTime() - Date.now() + expireTime));
            if (date.getTime() <= 0) {
                onExpire?.();
                clearInterval(id);
            }
            const min = date.getMinutes();
            const sec = `${date.getSeconds()}`.padStart(2, '0');
            setTime(`${min}:${sec}`);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <span>{text}</span>
            <span>{time}</span>
        </div>
    );
};

export default ConfirmTimer;
