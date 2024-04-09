import { useState } from 'react';
import useProjects from '../hooks/useProjects';

export default function ProjectForm({ closeModal }) {
  const [project, setProject] = useState('');
  const { addProject } = useProjects();

  const handleAddProject = () => {
    addProject.mutate(project);
    closeModal();
  };

  return (
    <div className='flex flex-col p-3 gap-6'>
      <span className='font-semibold text-xl text-gray-800'>프로젝트 추가</span>
      <input className='px-4 py-3 h-10 border border-gray-300 rounded-lg' type='text' value={project} onChange={(e) => setProject(e.target.value)} placeholder='프로젝트 이름' />
      <div className='flex gap-2 leading-none'>
        <button className='px-5 py-3 w-40 h-10 border border-gray-500 rounded-lg' onClick={closeModal}>
          취소
        </button>
        <button className='px-5 py-3 w-40 h-10 border rounded-lg bg-brand text-white  tracking-widest' onClick={handleAddProject}>
          확인
        </button>
      </div>
    </div>
  );
}
