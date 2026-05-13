import React from 'react';
import { Search } from 'lucide-react';
import styles from './Chat.module.css';
import { ChatInputWrapper } from './ChatInputWrapper';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
    placeholder = "Tìm kiếm...", 
    value, 
    onChange 
}) => {
    return (
        <ChatInputWrapper 
            leftIcons={<Search size={20} color="#4A5E8B" />}
        >
            <input
                type="text"
                className={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </ChatInputWrapper>
    );
};
