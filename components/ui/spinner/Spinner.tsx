import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai'; 
import styles from './Spinner.module.css'; 

const Spinner: React.FC = () => {
    return (
        <div className={styles.spinnerContainer}>
            <AiOutlineLoading className={styles.spinnerIcon} />
        </div>
    );
};

export default Spinner;
