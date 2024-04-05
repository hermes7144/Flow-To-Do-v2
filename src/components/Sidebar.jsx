import React from 'react';
import SidebarItem from './SidebarItem';
import { PiSun, PiSunHorizonFill } from 'react-icons/pi';
import { RiCalendar2Fill, RiCalendarCheckFill } from 'react-icons/ri';
import ProjectContainer from './ProjectContainer';
import useProjects from '../hooks/useProjects';
import ProjectItem from './ProjectItem';

const categories = [
  { name: '오늘', icon: <PiSun className='h-6 w-6 text-red-400' /> },
  { name: '내일', icon: <PiSunHorizonFill className='h-6 w-6 text-orange-400' /> },
  { name: '이번 주', icon: <RiCalendar2Fill className='h-6 w-6 text-emerald-400' /> },
  { name: '다음 주', icon: <RiCalendarCheckFill className='h-6 w-6 text-blue-400' /> },
];

export default function Sidebar({ category, handleSheduleClick }) {
  const {
    projectsQuery: { data: projects },
  } = useProjects();

  return (
    <div className='min-w-60 flex flex-col bg-white shadow-xl justify-between' style={{ height: 'calc(100vh - 57px)' }}>
      <div>
        <ul>
          {categories.map((item) => (
            <SidebarItem key={item.name} item={item} category={category} handleSheduleClick={handleSheduleClick} />
          ))}
        </ul>

        <ul className='border-t border-gray-200 p-2'>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} handleSheduleClick={handleSheduleClick} />
          ))}
        </ul>
      </div>
      <ProjectContainer />
    </div>
  );
}
