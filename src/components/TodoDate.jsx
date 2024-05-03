import React, { useMemo } from 'react';
import { formatDate, getDate } from '../js/CommonFunction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTodos from '../hooks/useTodos';

export default function TodoDate({ todo, date }) {
  const { updateTodo } = useTodos();

  const handleUpdate = (date) => {
    const deadline = formatDate(date);
    console.log('deadline', deadline);

    updateTodo.mutate({
      ...todo,
      deadline,
    });
  };

  const displayDate = useMemo(() => {
    if (!date) return '추후';

    const formattedDate = formatDate(date);
    const today = getDate();
    const yesterday = getDate(-1);
    const tomorrow = getDate(1);

    if (formattedDate === today) return '오늘';
    if (formattedDate === yesterday) return '어제';
    if (formattedDate === tomorrow) return '내일';

    return new Date(date).toLocaleDateString('ko', { day: 'numeric', month: 'short' });
  }, [date]);

  const ExampleCustomInput = React.forwardRef(({ _, onClick }, ref) => (
    <button className='example-custom-input' onClick={onClick} ref={ref}>
      {displayDate}
    </button>
  ));
  ExampleCustomInput.displayName = 'Search';

  return <DatePicker popperPlacement='bottom-end' selected={date} onChange={(date) => handleUpdate(date)} customInput={<ExampleCustomInput />} />;
}
