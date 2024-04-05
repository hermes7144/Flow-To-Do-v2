import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addNewProject, getProjects } from '../api/firebase';

export default function useProjects() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: ['projects', uid],
    queryFn: () => getProjects(uid),
  });

  const addProject = useMutation({
    mutationFn: async (project) => {
      await addNewProject(uid, project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects', uid]);
    },
  });

  return { projectsQuery, addProject };
}
