import React from 'react';
import styles from './Chat.module.css';
import { Avatar } from '../common/Avatar';
import type { Contact } from '../../types/Message.ts';

// Component Thẻ liên lạc
export const ContactItem: React.FC<{ contact: Contact; isActive?: boolean }> = ({ contact, isActive }) => (
  <div className={`${styles.contactItem} ${isActive ? styles.contactItemActive : ''}`}>
    <Avatar 
        src={contact.avatar} 
        alt={contact.name} 
        size={48} 
        isOnline={contact.isOnline} 
    />
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className={styles.contactName}>{contact.name}</span>
        <span className={styles.contactTime}>{contact.time}</span>
      </div>
      <div className={styles.lastMessageSnippet}>{contact.lastMessage}</div>
    </div>
  </div>
);
