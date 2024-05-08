import React from 'react';
import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';
import { getDate, isString } from '../js/CommonFunction';
import TodoDate from './TodoDate';

export default function TodoList({ activeTodo, completedTodo, category }) {
  const hasTodos = activeTodo && activeTodo.length > 0;
  let lastProject = null;
  let lastDate = null;

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
          {category === '오늘' || category === '내일' || !isString(category)
            ? sortedActiveTodo.map((todo, index) => {
                if (lastProject === null || todo.projectName !== lastProject) {
                  lastProject = todo.projectName;

                  return (
                    <React.Fragment key={index}>
                      <span>{lastProject}</span>
                      <TodoItem key={todo.id} todo={todo} />
                    </React.Fragment>
                  );
                } else {
                  return <TodoItem key={todo.id} todo={todo} />;
                }
              })
            : activeTodo.map((todo, index) => {
                if (lastDate === null || todo.deadline > lastDate) {
                  lastDate = todo.deadline < getDate() ? getDate() : todo.deadline;

                  return (
                    <React.Fragment key={index}>
                      <TodoDate key={lastDate} date={lastDate} />
                      <TodoItem key={todo.id} todo={todo} />
                    </React.Fragment>
                  );
                } else {
                  return <TodoItem key={todo.id} todo={todo} />;
                }
              })}
        </ul>
      )}

      {completedTodo && (
        <div>
          <div className='m-4'>완료한 할 일</div>
          <ul className='flex-1'>
            {completedTodo.map((todo) => (
              <TodoItem key={todo.id} todo={todo} completed />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
