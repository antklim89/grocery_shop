import { FC, HTMLAttributes, useRef } from 'react';

import styles from '~/styles/SwitchToggle.module.scss';


interface Props extends HTMLAttributes<HTMLInputElement> {
    label?: string
    checked: boolean
}

const SwitchToggle: FC<Props> = ({ label, id, ...props }) => {
    const randomId = useRef((Math.random() * 100000).toString(32));
    return (
        <div className={`${styles.switchToggle} p-1 align-self-end`}>
            {label}
            <input
                id={id || `switch-${randomId.current}`}
                type="checkbox"
                {...props}
            />
            <label htmlFor={id || `switch-${randomId.current}`}>In order:</label>
        </div>
    );
};

export default SwitchToggle;
