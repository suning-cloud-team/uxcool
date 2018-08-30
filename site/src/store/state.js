import routeData, { groups } from '../router/routeData';
import { INITIAL_PRIMARY_COLOR } from '../common/constants';

function handleRoutes(data, groupMapping) {
  const routeMap = new Map();
  data.forEach((v) => {
    if (v.children) {
      v.children.forEach((v1) => {
        const { meta = {} } = v1;
        const { group } = meta;
        let groupName = group;
        // 没有group 则放入最上层
        if (!groupName || !(groupName in groupMapping)) {
          groupName = 'root';
        }
        if (!routeMap.has(groupName)) {
          routeMap.set(groupName, []);
        }
        const l = routeMap.get(groupName);
        l.push(v1);
      });
    }
  });
  routeMap.forEach((v) => {
    v.sort((a, b) => (a.name || '') > b.name);
  });
  return routeMap;
}

function buildMenuItem(list = [], pos = 0) {
  return list.map((v, i) => {
    const { name, meta } = v;
    const { title = '', subTitle = '' } = meta;
    // 给路由添加位置,方便底部菜单索引
    meta.pos = pos + i;
    return {
      name,
      title: `${title}${subTitle ? ' ' : ''}${subTitle}`,
    };
  });
}

function buildMenuData(routeMap, groupMapping) {
  let pos = 0;
  const groupNames = Object.keys(groupMapping).map(k => ({
    $$key: k,
    ...groupMapping[k],
  }));

  groupNames.sort((a, b) => a.sort - b.sort);
  groupNames.unshift({
    $$key: 'root',
  });
  return groupNames.reduce((r, v) => {
    const nr = r;
    const { $$key, name: gName } = v;
    const l = buildMenuItem(routeMap.get($$key), pos);
    if (l.length) {
      if ($$key === 'root') {
        nr.push(...l);
      } else {
        nr.push({
          group: gName,
          children: l,
        });
      }
    }
    pos += l.length;
    return nr;
  }, []);
}

function buildFooterNavData(menuData = []) {
  return menuData.reduce((r, v) => {
    const nr = r;
    const { children } = v;
    if (children) {
      nr.push(...children);
    } else {
      nr.push(v);
    }
    return nr;
  }, []);
}

const routeMap = handleRoutes(routeData, groups);
const menuData = buildMenuData(routeMap, groups);
const footerNavData = buildFooterNavData(menuData);
// console.log(JSON.stringify(footerNavData, null, 2));
// console.log(JSON.stringify(menuData, null, 2));
// console.log(JSON.stringify(routeData, null, 2));
// routeData.forEach((v) => {
//   if (v.children) {
//     v.children.forEach((v1) => {
//       console.log(
//         'checked',
//         footerNavData.length,
//         v1.meta.pos,
//         v1.meta.title,
//         footerNavData[v1.meta.pos]
//       );
//     });
//   }
// });
export default {
  // 组件主题 light | dark
  theme: 'light',
  // 选择的主题 light | dark | custom, 主要用于菜单切换后保持之前的选中状态和颜色
  selectedTheme: 'light',
  primaryColor: INITIAL_PRIMARY_COLOR,
  pageName: '',
  codeExpanded: false,
  navPageIndex: 0,
  menuData,
  footerNavData,
  routes: routeData,
};
