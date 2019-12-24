import ChildrenListView from './ChildrenList/View';
import ChildrenListEdit from './ChildrenList/Edit';

function addCustomGroup(config) {
  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(
    el => el.id === 'custom_addons',
  );
  if (!hasCustomGroup.length) {
    config.blocks.groupBlocksOrder.push({
      id: 'custom_addons',
      title: 'Custom addons',
    });
  }
}

export function applyConfig(config) {
  addCustomGroup(config);

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
