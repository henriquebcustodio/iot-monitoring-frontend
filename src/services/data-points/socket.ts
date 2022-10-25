import Socket from '../socket';
import DataPoint from './DataPoint';
import { Channel } from 'actioncable';

class DataPointsSocket extends Socket {
  private readonly variableId: number | string;
  private channelName = '::Devices::Variables::Cable::Channel';
  private channel?: Channel;

  constructor(variableId: string | number) {
    super();

    this.variableId = variableId;
  }

  subscribe(onReceived: (dataPoint: DataPoint) => void) {
    if (this.channel) return;

    this.channel = this.cable.subscriptions.create({
      channel: this.channelName,
      variable_id: this.variableId,
    }, {
      received(dataPoint: DataPoint) {
        onReceived(dataPoint);
      }
    });
  }

  stop() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !this.cable.connection.disconnected && this.cable.disconnect();
  }
}

export default DataPointsSocket;