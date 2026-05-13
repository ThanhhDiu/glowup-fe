import { getInfo } from '../../../services/getInfo';
import { SettingsSidebarCard } from '../../layout/SettingsSidebarCard';
import { customerSettingsSidebarItems } from './customerSettingsConfig';
import { useEffect, useState } from 'react';
interface CustomerSettingsSidebarProps {
  activeItem: string;
  onSelect?: (id: string) => void;
  avatar?: string;
  name?: string;
  meta?: string;
}

export function CustomerSettingsSidebar({
  activeItem,
  onSelect,
  avatar = 'https://segayanime.com/wp-content/uploads/2026/01/avatar-fb-mac-dinh-1.jpg',
}: CustomerSettingsSidebarProps) {
     const [fullname, setFullname] = useState('')
    const [code, setCode] = useState('')
    const [avatarUrl, setAvatarUrl] = useState(avatar)
  useEffect(()=> {
   getInfo().then(data => {
    setFullname(data.fullName)
    setCode(data.code)
    setAvatarUrl(data.avatar) // Assuming the getInfo response includes an avatar URL
   })
  }, [])
  return (
    <SettingsSidebarCard
      avatar={avatarUrl || avatar}
      name={fullname }
      meta={code}
      items={customerSettingsSidebarItems}
      activeItem={activeItem}
      onSelect={onSelect}
    />
  );
}
