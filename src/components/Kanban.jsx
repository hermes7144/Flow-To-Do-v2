import React, { useEffect } from 'react';
import useTodos from '../hooks/useTodos';
import KanbanList from './KanbanList';
import { DragDropContext } from 'react-beautiful-dnd';
import { getDate } from '../js/CommonFunction';

function filterByDate(todos, date) {
  if (date === getDate(-1)) {
    return todos.filter((todo) => todo.deadline <= date && todo.status === 'active');
  } else {
    return todos.filter((todo) => todo.deadline === date);
  }
}

export default function Kanban() {
  let {
    productsQuery: { data: todos },
  } = useTodos();
  const { updateTodo } = useTodos();

  useEffect(() => {}, [todos]);

  const currentDate = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const tempDate = new Date(currentDate);
    tempDate.setDate(currentDate.getDate() + i - 1);
    return tempDate.toISOString().substring(0, 10);
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      // TODO: resorting in kanban.
    } else {
      const todo = todos.find((todo) => todo.id === draggableId);

      updateTodo.mutate({
        ...todo,
        deadline: destination.droppableId,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ul className='flex overflow-x-auto overflow-y' style={{ height: 'calc(100vh - 105px)' }}>
        {dates.map((date, index) => (
          <KanbanList key={date} date={date} index={index} todos={filterByDate(todos, date)} />
        ))}
      </ul>
    </DragDropContext>
  );
}
