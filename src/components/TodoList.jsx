import React, { useState } from 'react';
import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';
import { getDate, isString } from '../js/CommonFunction';
import TodoDate from './TodoDate';
import useProjects from '../hooks/useProjects';
import { MdArrowDropUp, MdArrowDropDown  } from "react-icons/md";

export default function TodoList({ activeTodo, completedTodo, category }) {
  const {
    projectsQuery: { data: projects },
  } = useProjects();
  const [isCompletedSectionOpen, setIsCompletedSectionOpen] = useState(false);

  const toggleCompletedSection = () => {
    setIsCompletedSectionOpen(!isCompletedSectionOpen);
  };
   
  const hasTodos = activeTodo && activeTodo.length > 0;
  let lastProjectId = null;
  let lastDate = null;
  let completeLastDate = null;



  // activeTodo를 프로젝트 별로 그룹화하고 정렬하는 함수
  const groupAndSortTodosByProject = (todos) => {
    // 프로젝트 별로 Todo를 그룹화하기 위한 객체
    const groupedTodos = {};

    // 프로젝트가 있는 Todo와 없는 Todo를 분리
    const todosWithProject = todos.filter((todo) => todo.projectId);
    const todosWithoutProject = todos.filter((todo) => !todo.projectId);

    // 프로젝트가 있는 Todo를 프로젝트 별로 그룹화
    todosWithProject.forEach((todo) => {
      if (!groupedTodos[todo.projectId]) {
        groupedTodos[todo.projectId] = [];
      }
      groupedTodos[todo.projectId].push(todo);
    });

    // 프로젝트가 있는 Todo를 정렬
    Object.values(groupedTodos).forEach((projectTodos) => {
      projectTodos.sort((a, b) => a.projectName.localeCompare(b.projectName));
    });

    // 프로젝트가 있는 Todo와 없는 Todo를 병합하여 반환
    return [...todosWithoutProject, ...Object.values(groupedTodos).flat()];
  };

  // 프로젝트 별로 정렬된 activeTodo를 얻기 위해 함수 호출
  const sortedActiveTodo = groupAndSortTodosByProject(activeTodo);
  
  return (
    <div className='flex flex-col pb-20'>
      {!hasTodos && <EmptyTodo />}
      {hasTodos && (
        <ul className='flex-1'>
          {/* 카테고리가 프로젝트인지 확인 */}
          {!isString(category)
            ? activeTodo.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            : 
              // 카테고리가 오늘, 내일이라면
              ['오늘', '내일'].includes(category)
            ? // 프로젝트 별로 보여줌
              sortedActiveTodo.map((todo, index) => {
                const { projectId } = todo;
                const isDifferentProject = projectId && projectId !== lastProjectId;
                const project = isDifferentProject ? projects.find((proj) => proj.id === projectId) : null;
                if (isDifferentProject) lastProjectId = projectId;

                return (
                  <React.Fragment key={index}>
                    {isDifferentProject && <span>{project.name}</span>}
                    <TodoItem key={todo.id} todo={todo} />
                  </React.Fragment>
                );
              })
              
            : // 날짜별로 보여줌
              activeTodo.map((todo, index) => {
                if (lastDate === null || todo.deadline > lastDate) {
                  lastDate = todo.deadline < getDate() ? getDate() : todo.deadline;

                  return (
                    <React.Fragment key={index}>
                      <TodoDate date={lastDate} />
                      <TodoItem todo={todo} />
                    </React.Fragment>
                  );
                } else {
                  return <TodoItem key={todo.id} todo={todo} />
                }
              })}
        </ul>
      )}

      {completedTodo && (
        <div>
          <div className='flex justify-center'>
          <button
            className='m-4 flex items-center justify-between px-4 py-2 bg-brand text-white rounded-3xl shadow-md hover:brightness-90 transition duration-300 ease-in-out gap-1'
            onClick={toggleCompletedSection}
          >
            <span>{isCompletedSectionOpen ? '완료한 작업 숨기기' : '완료한 작업 보기'}</span>
            {isCompletedSectionOpen ? <MdArrowDropUp className='w-5 h-5' /> : <MdArrowDropDown className='w-5 h-5' />}
          </button>
          </div>
          {isCompletedSectionOpen && (
          <ul className='flex-1'>
            {completedTodo.map((todo) => {
                  if (completeLastDate === null || todo.completedDate < completeLastDate) {
                  completeLastDate = todo.completedDate;

                  return (
                    <React.Fragment key={todo.id}>
                      <span>{new Date(completeLastDate).toLocaleDateString('ko', { day: 'numeric', month: 'short' })}</span>
                      <TodoItem todo={todo} completed />
                    </React.Fragment>
                  );
                } else {
                  return <TodoItem key={todo.id} todo={todo} completed />
                }
            })}
          </ul>
          )}
        </div>
      )}
    </div>
  );
}
