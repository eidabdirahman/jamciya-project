import { toast } from 'react-hot-toast';

const Message = ({ type, message }) => {
  if (type === 'error') {
    toast.error(message);
  } else if (type === 'success') {
    toast.success(message);
  } else {
    toast(message);
  }

  return null; // No need to render anything
};

export default Message;
