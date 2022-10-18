import list from './list';
import create from './create';
import show from './details';
import remove from './remove';
import edit from './edit';

class DevicesService {
  static list = list;
  static create = create;
  static show = show;
  static delete = remove;
  static edit = edit;
}

export default DevicesService;
