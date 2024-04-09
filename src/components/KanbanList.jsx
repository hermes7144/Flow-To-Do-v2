import React, { useMemo } from 'react';
import KanbanItem from './KanbanItem';
import { Droppable } from 'react-beautiful-dnd';
import TodoDate from './TodoDate';
import { getDate } from '../js/CommonFunction';
import useTodos from '../hooks/useTodos';

function filterByDate(todos, date) {
  if (date === getDate(-1)) {
    return todos.filter((todo) => todo.deadline <= date && todo.status === 'active');
  } else {
    return todos.filter((todo) => todo.deadline === date);
  }
}

export default function KanbanList({ date, index }) {
  const {
    productsQuery: { data: todos },
  } = useTodos();

  const filteredTodos = useMemo(() => filterByDate(todos, date), [todos, date]);

  return (
    <li className='flex flex-col m-1 p-1 min-w-80'>
      <span className='font-bold'>{index === 0 ? '기한 초과' : <TodoDate date={date} />}</span>
      <Droppable droppableId={date}>
        {(provided, snapshot) => (
          <ul className={`flex flex-col min-h-16 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`} ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {filteredTodos.map((todo, index) => (
              <KanbanItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </li>
  );
}
