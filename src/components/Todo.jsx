import React, { useMemo } from 'react';
import TodoList from './../components/TodoList';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import AddTodo from '../components/AddTodo';
import { getDeadline, getDate, isString } from '../js/CommonFunction';

function isDeadlineInRange(deadline, start, end) {
  return deadline >= start && deadline <= end;
}

function filterActiveTodos(category, todos) {
  if (isString(category)) {
    const deadline = getDeadline(category, true);
    if (!deadline) return [];

    return todos.filter((todo) => {
      if (todo.status !== 'active') return false;

      if (category === '내일') {
        return todo.deadline === deadline;
      } else if (category === '다음 주') {
        return isDeadlineInRange(todo.deadline, deadline.start, deadline.end);
      } else {
        return todo.deadline <= deadline;
      }
    });
  } else {
    return todos.filter((todo) => todo.status === 'active' && todo.projectId === category.id);
  }
}

export default function Todo({ category }) {
  const {
    productsQuery: { data: todos },
  } = useTodos();

  const activeTodo = useMemo(() => filterActiveTodos(category, todos), [category, todos]);
  const completedTodo = useMemo(() => todos.filter((todo) => todo.status === 'completed' ), [todos]);
  const filteredCompletedTodo = useMemo(() => {
    return completedTodo
      .filter(todo => {
        if (['오늘', '내일', '이번 주', '다음 주'].includes(category)) {
          return todo.completedDate === getDate();
        } else if (category && category.id) {
          return todo.projectId === category.id;
        }
        return false;
      })
      .sort((a, b) => a.completedDate > b.completedDate ? -1 : 1);
  }, [completedTodo, category]);

  return (
    <div className='p-2'>
      <PomodoroDashBoard activeTodo={activeTodo} completedCount={filteredCompletedTodo.length} thisWeek={['오늘', '이번 주'].includes(category)} />
      <AddTodo category={category} />
      <TodoList activeTodo={activeTodo} completedTodo={filteredCompletedTodo} category={category} />
    </div>
  );
}
