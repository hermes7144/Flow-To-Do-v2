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
    <div>
      <span>프로젝트 추가</span>
      <input type='text' value={project} onChange={(e) => setProject(e.target.value)} />
      <button onClick={closeModal}>취소</button>
      <button onClick={handleAddProject}>확인</button>
    </div>
  );
}
