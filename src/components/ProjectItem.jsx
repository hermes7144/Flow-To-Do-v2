import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

export default function ProjectItem({ project, handleSheduleClick }) {
  const handleClick = () => {
    handleSheduleClick(project);
  };
  return (
    <li className='flex justify-between hover:cursor-pointer text-sm p-1' onClick={handleClick}>
      {project.name}
      {/* <button>
        <BsThreeDots className='h-6 w-6 text-gray-200 hover:text-gray-300' />
      </button> */}
    </li>
  );
}
