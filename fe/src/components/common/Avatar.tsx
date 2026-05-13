import React from 'react';
import styles from '../chat/Chat.module.css'; // Reusing onlineStatus style if possible, or we can move it

interface AvatarProps {
    src: string;
    alt?: string;
    size?: number;
    isOnline?: boolean;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
    src, 
    alt = "avatar", 
    size = 40, 
    isOnline = false,
    className = "" 
}) => {
    return (
        <div 
            className={className} 
            style={{ 
                position: 'relative', 
                width: size, 
                height: size,
                flexShrink: 0 
            }}
        >
            <img 
                src={src} 
                alt={alt} 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                }} 
            />
            {isOnline && (
                <div 
                    className={styles.onlineStatus} 
                    style={{
                        position: 'absolute',
                        bottom: size * 0.05,
                        right: size * 0.05,
                        width: Math.max(8, size * 0.2),
                        height: Math.max(8, size * 0.2),
                        borderWidth: Math.max(1, size * 0.05)
                    }}
                />
            )}
        </div>
    );
};
