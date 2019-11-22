import ChildrenListView from './ChildrenList/View';
import ChildrenListEdit from './ChildrenList/Edit';

export function applyConfig(config) {
  config.blocks.blocksConfig.childrenlist = {
    id: 'childrenlist',
    group: 'custom_addons',
    title: 'Children List',
    view: ChildrenListView,
    edit: ChildrenListEdit,
    icon: config.blocks.blocksConfig.text.icon,
  };
  return config;
}
