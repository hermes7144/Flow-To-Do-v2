import React from 'react';
import { isString } from '../js/CommonFunction';

export default function SidebarItem({ item, category, handleSheduleClick, handleViewClick }) {
  const handleClick = () => {
    handleSheduleClick(item.name);
    if (['오늘', '내일'].includes(item.name)) handleViewClick('LIST');
  };

  const formattedCategory = isString(category) ? category : category.name;

  return (
    <li className={`flex text-sm p-1 m-1 gap-1 rounded-lg cursor-pointer ${formattedCategory === item.name ? 'bg-slate-200' : 'hover:bg-slate-100'}`} onClick={handleClick}>
      {item.icon}
      {item.name}
    </li>
  );
}
