import ActionCable, { Cable } from 'actioncable';
import useAuthStore from '../../store/auth/useAuthStore';

class Socket {
  protected cable: Cable;

  constructor() {
    const token = useAuthStore.getState().token;
    this.cable = ActionCable.createConsumer(`${import.meta.env.VITE_WEBSOCKET_HOST}?token=${token}`);
  }
}

export default Socket;