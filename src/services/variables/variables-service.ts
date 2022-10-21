import list from './list';
import create from './create';
import show from './show';
import remove from './remove';

class VariablesService {
  static list = list;
  static create = create;
  static show = show;
  static delete = remove;
}

export default VariablesService;
