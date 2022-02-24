/*
 * @Description:
 * @Autor: YC
 * @Date: 2021-01-20 15:39:05
 * @LastEditTime: 2021-08-18 09:12:13
 * @FilePath: \interact\src\business\lib\element.js
 */
import Vue from 'vue';
// import '@/assets/element/theme/index.css';
// 按需引入Element组件
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  InputNumber,
  Loading,
  MessageBox,
  Option,
  Pagination,
  Popconfirm,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tooltip,
  Upload,
  OperateGroupLayout,
} from 'lz-element-ui';

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };


Vue.use(Row);
Vue.use(Popconfirm);
Vue.use(OperateGroupLayout);
Vue.use(Col);
Vue.use(CheckboxGroup);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);
Vue.use(InputNumber);
Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$confirm = MessageBox.confirm;