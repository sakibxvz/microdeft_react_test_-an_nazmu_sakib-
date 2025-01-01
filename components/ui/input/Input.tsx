import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input id={id} className={styles.input} {...props} />
        </div>
    );
};

export default Input;

