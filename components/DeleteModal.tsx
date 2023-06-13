import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useMovie from '@/hooks/useMovie';
import useDeleteModal from '@/hooks/useDeleteModal';
import axios from 'axios';

interface DeleteModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<DeleteModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useDeleteModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();

    }, 300);
  }, [onClose]);

  const handleOk = useCallback(async () => {
    setIsVisible(false);
    await axios.delete(`/api/movies/${data.id}`);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
              {/* <XMarkIcon className="text-white w-6" /> */}
              <AiOutlineClose className="text-white w-6" />
            </div>
          <div className="px-12 py-8">
            <div className="flex flex-col items-center gap-2 mb-8 mt-10">
              <p className="text-green-400 font-semibold text-lg">
                Sure to Delete this Movie?
              </p>
              <div className='w-1/2' >
                <button onClick={handleOk} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                  OK
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfoModal;
