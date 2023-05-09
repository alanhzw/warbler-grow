(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash-es')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash-es'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LegoComponents = {}, global.Vue, global._));
})(this, (function (exports, vue, lodashEs) { 'use strict';

  /*
   * @Author: 一尾流莺
   * @Description:
   * @Date: 2022-05-19 17:08:05
   * @LastEditTime: 2022-06-10 15:39:57
   * @FilePath: \lego-component\src\defaultProps.ts
   */
  // 通用的默认属性
  const commonDefaultProps = {
      // actions
      actionType: '',
      url: '',
      // size
      height: '',
      width: '318px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      // border type
      borderStyle: 'none',
      borderColor: '#000',
      borderWidth: '0',
      borderRadius: '0',
      // shadow and opacity
      boxShadow: '0 0 0 #000000',
      opacity: '1',
      // position and x,y
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
  };
  // l-text 组件特有默认属性
  const textDefaultProps = {
      // basic props - font styles
      text: '正文内容',
      fontSize: '14px',
      fontFamily: '',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      lineHeight: '1',
      textAlign: 'left',
      color: '#000000',
      backgroundColor: '',
      ...commonDefaultProps,
  };
  // 是否正在编辑
  const isEditingProp = {
      isEditing: {
          type: Boolean,
          default: false,
      },
  };
  // 排除非样式属性
  const textStylePropNames = lodashEs.without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
  // 转换成组件的props属性
  const transformToComponentProps = (props) => {
      const mapProps = lodashEs.mapValues(props, (item) => {
          return {
              type: item.constructor,
              default: item,
          };
      });
      return { ...mapProps, ...isEditingProp };
  };

  /*
   * @Author: 一尾流莺
   * @Description:
   * @Date: 2022-05-19 17:44:44
   * @LastEditTime: 2022-06-10 15:39:41
   * @FilePath: \lego-component\src\hooks\useComponentCommon.ts
   */
  // 使用 lodash 的 pick 方法挑选出样式属性,并返回一个点击事件处理函数
  const useComponentCommon = (props, picks) => {
      const styleProps = vue.computed(() => lodashEs.pick(props, picks));
      const handleClick = () => {
          if (props.actionType === 'url' && props.url && !props.isEditing) {
              window.location.href = props.url;
          }
      };
      return {
          styleProps,
          handleClick,
      };
  };

  const defaultProps = transformToComponentProps(textDefaultProps);
  var script = vue.defineComponent({
      // 合并 props
      props: {
          tag: {
              type: String,
              default: 'div'
          },
          ...defaultProps
      },
      name: 'l-test',
      setup(props) {
          // 获取到样式属性
          const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
          return {
              styleProps,
              handleClick
          };
      }
  });

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
      style: vue.normalizeStyle(_ctx.styleProps),
      onClick: _ctx.handleClick,
      class: "l-text-component"
    }, {
      default: vue.withCtx(() => [
        vue.createTextVNode(vue.toDisplayString(_ctx.text), 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["style", "onClick"]))
  }

  script.render = render;
  script.__scopeId = "data-v-6bf95b7a";
  script.__file = "src/components/LText/LText.vue";

  script.install = (app) => {
      app.component(script.name, script);
  };

  const components = [script];
  const install = (app) => {
      components.forEach((c) => {
          app.component('l-text', c);
      });
  };
  var index = {
      install,
  };

  exports.LText = script;
  exports["default"] = index;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
