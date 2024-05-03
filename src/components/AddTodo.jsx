import React, { useMemo, useState } from 'react';
import useTodos from '../hooks/useTodos';
import { FaStopwatch } from 'react-icons/fa';
import { formatDate, getDate, isString } from '../js/CommonFunction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTodo({ category }) {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [estimate, setEstimate] = useState(0);
  const [date, setDate] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEstimate = (p) => {
    setEstimate(p);
  };
  const iconRange = Array.from({ length: 5 }, (_, index) => index + 1);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!input) return;

      const todo = {
        name: input,
        deadline: formatDate(date),
        estimate,
        projectId: isString(category) ? '' : category.id,
      };

      addTodo.mutate(todo);
      setInput('');
      setEstimate(0);
    }
  };
  return (
    <div className='flex my-3 bg-white items-center p-2 rounded-lg'>
      <input className='w-44 xs:flex-1 focus:outline-none' type='text' value={input} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={`+ "${isString(category) ? category : category.name} 할 일" 추가`} />
      <div className='w-[1px] h-4 bg-slate-500 mx-2'></div>
      <div className='flex min-w-14 items-center'>
        <div className='flex bg-white text-gray-300 gap-1 text-lg mr-2 opacity-50'>
          {iconRange.map((value) => (
            <FaStopwatch key={value} className={`hover:cursor-pointer ${estimate >= value ? 'text-brand' : ''}`} onClick={() => handleEstimate(estimate === value ? value - 1 : value)} />
          ))}
        </div>
      </div>
      {!['오늘', '내일', '이번 주', '다음 주'].includes(category) && <DatePicker popperPlacement='bottom-end' selected={date} onChange={(date) => setDate(date)} customInput={<ExampleCustomInput />} />}
    </div>
  );
}
