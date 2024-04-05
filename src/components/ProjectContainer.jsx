import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';
import ProjectForm from './ProjectForm';

Modal.setAppElement('#root');

export default function ProjectContainer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const isDesktopOrMobile = useMediaQuery({ minWidth: 768 });

  const content = isDesktopOrMobile
    ? {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '200px',
      }
    : {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '200px',
      };

  return (
    <>
      <button className='flex items-center p-1 text-brand border-t border-gray-200' onClick={openModal}>
        <BsPlus />
        <div>프로젝트 추가</div>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content,
        }}>
        <ProjectForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
