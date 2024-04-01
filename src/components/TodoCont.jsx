export default function TodoCont({ children }) {
  return (
    <div className='flex-1 bg-gray-50 overflow-y-auto overflow-x-hidden' style={{ height: 'calc(100vh - 57px)' }}>
      {children}
    </div>
  );
}
