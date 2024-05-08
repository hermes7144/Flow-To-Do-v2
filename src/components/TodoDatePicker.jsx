import React, { useMemo } from 'react';
import { formatDate, getDate } from '../js/CommonFunction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTodos from '../hooks/useTodos';

export default function TodoDatePicker({ todo }) {
  const { updateTodo } = useTodos();

  const handleUpdate = (date) => {
    const deadline = formatDate(date);

    updateTodo.mutate({
      ...todo,
      deadline,
    });
  };

  const displayDate = useMemo(() => {
    if (!todo.deadline) return '추후';

    const formattedDate = formatDate(todo.deadline);
    const today = getDate();
    const yesterday = getDate(-1);
    const tomorrow = getDate(1);

    if (formattedDate === today) return '오늘';
    if (formattedDate === yesterday) return '어제';
    if (formattedDate === tomorrow) return '내일';

    return new Date(todo.deadline).toLocaleDateString('ko', { day: 'numeric', month: 'short' });
  }, [todo]);

  const dateCompare = todo.deadline ? formatDate(todo.deadline) < getDate() : false;

  const ExampleCustomInput = React.forwardRef(({ _, onClick }, ref) => (
    <button className={`${dateCompare ? 'text-brand' : ''}`} onClick={onClick} ref={ref}>
      {displayDate}
    </button>
  ));
  ExampleCustomInput.displayName = 'Search';

  return <DatePicker popperPlacement='bottom-end' selected={todo.deadline} onChange={handleUpdate} customInput={<ExampleCustomInput />} />;
}
