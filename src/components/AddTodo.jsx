import React, { useMemo, useState } from 'react';
import useTodos from '../hooks/useTodos';
import { FaStopwatch } from 'react-icons/fa';
import { formatDate, addDays, isString, getDeadline } from '../js/CommonFunction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from 'react-icons/fa';

export default function AddTodo({ category }) {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [estimate, setEstimate] = useState(0);
  const [date, setDate] = useState(null);

  const handleChange = (e) => setInput(e.target.value);
  const handleEstimate = (p) => setEstimate(p);

  const iconRange = Array.from({ length: 5 }, (_, index) => index + 1);

  const displayDate = useMemo(() => {
    return date ? <FaRegCalendar /> : null;
  }, [date]);

  const CustomInputButton = React.forwardRef(({ _, onClick }, ref) => (
    <button className='hover:bg-gray-200 p-1 rounded-full' onClick={onClick} ref={ref}>
      {displayDate}
    </button>
  ));
  CustomInputButton.displayName = 'Search';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const todo = {
        name: input,
        deadline: getTodoDeadline(),

        estimate,
        projectId: isString(category) ? '' : category.id,
      };
      addTodo.mutate(todo);
      setInput('');
      setEstimate(0);
    }
  };

  const getTodoDeadline = () => {
    return isString(category) ? getDeadline(category) : date ? formatDate(addDays(date, 1)) : null;
  };

  return (
    <div className='flex my-3 bg-white items-center justify-between p-2 rounded-lg'>
      <input className='w-44 xs:flex-1 focus:outline-none' type='text' value={input} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={`+ "${isString(category) ? category : category.name} 할 일" 추가`} />
      <div className='flex items-center'>
        <div className='flex bg-white text-gray-300 gap-1 text-lg mr-1 opacity-50'>
          {iconRange.map((value) => (
            <FaStopwatch key={value} className={`hover:cursor-pointer ${estimate >= value ? 'text-brand' : ''}`} onClick={() => handleEstimate(estimate === value ? value - 1 : value)} />
          ))}
        </div>
        {!isString(category) && (
          <div className='flex items-center'>
            <div className='w-[1px] h-4 bg-slate-500 mx-1'></div>
            <DatePicker popperPlacement='bottom-end' selected={date} onChange={setDate} customInput={<CustomInputButton>{displayDate}</CustomInputButton>} />
          </div>
        )}
      </div>
    </div>
  );
}
