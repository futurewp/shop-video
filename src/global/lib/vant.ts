import { ComponentMode } from 'typings/global'

import {
  Button,
  NavBar,
  Field,
  CellGroup,
  Form,
  Popup,
  Dialog,
  Toast,
  Tabs,
  Tab,
  Row,
  Col,
  Icon,
  Image,
  Lazyload,
  Search,
  Card,
  Rate,
  Radio,
  RadioGroup,
  Picker,
  DropdownMenu,
  DropdownItem,
  Swipe,
  PullRefresh,
  SwipeItem,
  NoticeBar,
  Tag,
  List,
  Area,
  Uploader,
  Cell,
  Progress,
  Circle,
  Divider,
  Popover,
  DatetimePicker,
  ActionSheet,
  Empty,
  Steps,
  Step,
  Cascader,
  Tabbar,
  TabbarItem,

} from 'vant'

const Components: Array<any> = []

Components.push(Tabbar)
Components.push(TabbarItem)
Components.push(Cascader)
Components.push(Steps)
Components.push(Step)
Components.push(Empty)
Components.push(Rate)
Components.push(PullRefresh)
Components.push(List)
Components.push(Popover)
Components.push(Button)
Components.push(NavBar)
Components.push(Field)
Components.push(CellGroup)
Components.push(Form)
Components.push(Popup)
Components.push(Dialog)
Components.push(Toast)
Components.push(Row)
Components.push(Col)
Components.push(Icon)
Components.push(Image)
Components.push({ component: Lazyload, _options: { lazyComponent: true } } as ComponentMode)
Components.push(Search)
Components.push(Tabs)
Components.push(Tab)
Components.push(Card)
Components.push(Radio)
Components.push(RadioGroup)
Components.push(Picker)
Components.push(DropdownMenu)
Components.push(DropdownItem)
Components.push(Swipe)
Components.push(SwipeItem)
Components.push(NoticeBar)
Components.push(Tag)
Components.push(Area)
Components.push(Uploader)
Components.push(Cell)
Components.push(Progress)
Components.push(Circle)
Components.push(Divider)
Components.push(DatetimePicker)
Components.push(ActionSheet)

export default Components
