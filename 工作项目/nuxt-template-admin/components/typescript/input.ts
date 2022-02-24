/*
 * @Author: 一尾流莺
 * @Description:input组件验证规则
 * @Date: 2021-12-16 10:16:06
 * @LastEditTime: 2021-12-16 10:22:40
 * @FilePath: \nuxt-template-admin\components\typescript\input.ts
 */
// 单个验证规则
export type RuleType = 'required' | 'maxlength' | 'custom';
export interface InputValidator {
  type: RuleType;
  message: string;
  maxlength?: number;
  validator?: (value: string) => boolean;
}

// 验证规则组合
export type InputValidators = InputValidator[];

// 单个input的验证器
export const inputValidator = {
  // 是否必填
  required: (value: string, rule?: InputValidator) => {
    return value.trim() !== '';
  },
  // 最大长度
  maxlength: (value: string, rule: InputValidator) => {
    if (rule.type === 'maxlength' && rule.maxlength) {
      return value.length <= rule.maxlength;
    }
    return true;
  },
  // 自定义验证器
  custom: (value: string, rule: InputValidator) => {
    if (rule.type === 'custom' && rule.validator) {
      return rule.validator(value);
    }
    return true;
  },
};

// 验证器处理程序
export const handlerValidateInput = (value: string, rule: InputValidator) => {
  return inputValidator[rule.type](value, rule);
};
