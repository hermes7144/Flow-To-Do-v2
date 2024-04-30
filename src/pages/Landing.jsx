import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';

export default function Landing() {
  const { login } = useAuthContext();

  return (
    <div className='w-full bg-white '>
      <div className='w-full py-10 bg-gray-900 flex flex-col md:flex-row justify-center items-center gap-20'>
        <div className='w-[450px] flex flex-col justify-center items-start gap-7'>
          <h1 className='text-white text-6xl font-bold leading-[67px]'>
            체계적 유지
            <br />
            창조성 유지
          </h1>
          <p className='opacity-60 text-white text-xl leading-loose'>Flow To-Do는 언제 어디서나 업무를 관리하고 효율적으로 업무를 수행할 수 있도록 도와주는 사용하기 쉬운 시간 및 업무 관리 애플리케이션입니다.</p>
          <button className='flex justify-center items-center gap-3.5 text-red-500 text-xl font-bold' onClick={login}>
            Start Flow
            <FaArrowRight />
          </button>
        </div>
        <img className='w-[300px] md:w-[500px]' src='landing-main.svg' />
      </div>
      <div className='m-5 flex flex-col justify-center gap-40'>
        <div className='w-full flex flex-col md:flex-row justify-center gap-20'>
          <img className='w-full md:w-[550px] h-[400px] bg-slate-400 rounded-lg shadow-lg' src='flow-main.png' />
          <div className=' mt-16'>
            <h2 className='text-gray-900 text-4xl font-bold tracking-tight leading-[48px]'>뽀모도로 기법을 기반으로</h2>
            <p className='w-96 text-gray-500 text-xl leading-loose'>작업 실행 시간을 정하고, 시간이 끝날 때까지 작업에 집중하면 수확은 효율성뿐만 아니라 예상치 못한 성취감도 가져옵니다.</p>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row justify-center gap-20'>
          <div className='mt-16'>
            <h2 className='text-gray-900 text-4xl font-bold leading-[48px] tracking-tight'>무엇이든 수집하고 관리하세요</h2>
            <p className='w-96 text-gray-500 text-xl leading-loose'>일과 공부를 위한 계획을 세우고, 쇼핑 목록을 기록하고, 생일 알림을 설정하거나 일정을 조정하는 데 사용할 수 있습니다. Flow To-Do는 인생과 직장에서 모든 일을 처리하는 데 도움이 됩니다.</p>
          </div>
          <div className='w-[300px] md:w-[500px] h-[300px] relative'>
            <img className='w-[407px] h-[268px] absolute' src='flow-kanban.png' />
            <img className='w-[320px] h-[252px] left-[145px] top-[80px] absolute opacity-80 shadow-lg' src='flow-project.png' />
          </div>
        </div>

        <div className='w-full flex  flex-col md:flex-row justify-center gap-20'>
          <div className='w-[300px] md:w-[500px] h-[511px] relative'>
            <img className='w-[212px] h-[206px]  absolute rounded-lg' src='flow-computer.jpg' />
            <img className='w-[212px] h-[206px] left-[237px] top-[305px] absolute rounded-lg' src='flow-laptop.jpg' />
            <img className='w-[212px] h-[255px] left-[237px] top-[25px] absolute rounded-lg' src='flow-mobile.jpg' />
            <img className='w-[212px] h-[255px] left-0 top-[231px] absolute rounded-lg' src='flow-tablet.jpg' />
          </div>
          <div className='mt-16'>
            <h2 className='text-gray-900 text-4xl font-bold leading-[48px] tracking-tight'>어디서나 액세스</h2>
            <p className='w-96 text-gray-500 text-xl leading-loose'>휴대폰, 컴퓨터, 태블릿 등 언제 어디서나 작업을 기록하거나 Pomodoro를 시작할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div className='w-full bg-slate-900 flex flex-col items-center'>
        <div className="w-1/2 h-60 flex justify-around  text-zinc-100 text-xl font-['Poppins'] border-b border-slate-800 ">
          <button>Product</button>
          <button>Features</button>
          <button>Pricing</button>
          <button>Resources</button>
        </div>
        <div className="h-20 flex justify-center items-center text-slate-300 text-sm font-['Poppins'] leading-snug">© Copyright 2024, All Rights Reserved by Flow To-Do</div>
      </div>
    </div>
  );
}
