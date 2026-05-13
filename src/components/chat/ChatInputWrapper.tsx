import React from 'react';
import styles from './Chat.module.css';

interface ChatInputWrapperProps {
    children: React.ReactNode;
    leftIcons?: React.ReactNode;
    rightElement?: React.ReactNode;
}

export const ChatInputWrapper: React.FC<ChatInputWrapperProps> = ({ 
    children, 
    leftIcons, 
    rightElement 
}) => {
    return (
        <div className={styles.inputContainer}>
            {leftIcons && <div className={styles.iconGroup}>{leftIcons}</div>}
            <div className={styles.textAreaWrapper}>
                {children}
            </div>
            {rightElement && <div>{rightElement}</div>}
        </div>
    );
};
