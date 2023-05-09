/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-06-02 10:51:22
 * @LastEditTime: 2022-06-09 17:00:42
 * @FilePath: \lego-fe\tests\unit\Uploader.spec.ts
 */
import type { VueWrapper } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import Uploader from '@/components/Uploader.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

jest.mock('axios');
//将 mock 对象断言为特定类型 使用 jest.Mocked<T>
const mockAxios = axios as jest.Mocked<typeof axios>;
// 定义 wrapper
let wrapper: VueWrapper<any>;
// 定义测试文件
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

// 测试 UserProfile.vue
describe('UserProfile.vue', () => {
  beforeAll(() => {
    // 获取组件
    wrapper = shallowMount(Uploader, {
      // 传入到组件内部的属性
      props: { action: 'https://jsonplaceholder.typicode.com/posts/' },
    });
  });
  // 测试初始界面渲染
  it('basic layout before uploading', async () => {
    // 存在上传按钮
    expect(wrapper.find('button').exists()).toBeTruthy();
    // 按钮文字是点击上传
    expect(wrapper.get('button').text()).toBe('点击上传');
    // input 是隐藏的
    expect(wrapper.get('input').isVisible()).toBeFalsy();
  });
  // 测试上传成功
  it('upload process should works fine', async () => {
    // mock 成功的请求
    mockAxios.post.mockResolvedValueOnce({ status: 'success' });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 change 事件
    await wrapper.get('input').trigger('change');
    // post 请求被调用一次
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    // 按钮文字为 正在上传
    expect(wrapper.get('button').text()).toBe('正在上传');
    // 按钮状态为禁用
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled');
    // 列表长度修改, 并且有正确的 class
    expect(wrapper.findAll('li').length).toBe(1);
    // 获取列表第一个元素
    const firstItem = wrapper.get('li:first-child');
    // 元素的类名包含 uploading
    expect(firstItem.classes()).toContain('upload-loading');
    // 清除 promise
    await flushPromises();
    // 按钮文字为点击上传
    expect(wrapper.get('button').text()).toBe('点击上传');
    // 元素的类名包含 upload-success
    expect(firstItem.classes()).toContain('upload-success');
    // 元素的内容正确
    expect(firstItem.get('.filename').text()).toBe(testFile.name);
  });
  // 测试上传失败
  it('should return error text when post is rejected', async () => {
    // mock 失败的请求
    mockAxios.post.mockRejectedValueOnce({ error: 'error' });
    // 触发 change 事件
    await wrapper.get('input').trigger('change');
    // post 请求被调用2次
    expect(mockAxios.post).toHaveBeenCalledTimes(2);
    // 按钮文字为正在上传
    expect(wrapper.get('button').text()).toBe('正在上传');
    // 清除 promise
    await flushPromises();
    // 按钮文字为正在上传
    expect(wrapper.get('button').text()).toBe('点击上传');
    // 列表长度增加 列表的最后一项有正确的class名
    expect(wrapper.findAll('li').length).toBe(2);
    // 获取最后一个元素
    const lastItem = wrapper.get('li:last-child');
    // 元素的类名包含 upload-error
    expect(lastItem.classes()).toContain('upload-error');
    // 点击删除图标,可以删除这一项
    await lastItem.get('.delete-icon').trigger('click');
    // 列表长度减少1
    expect(wrapper.findAll('li').length).toBe(2);
  });
  // 测试自定义插槽
  it('should show current custom slot', async () => {
    // 成功的请求
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'aa.url' } });
    // 获取 wrapper
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
      },
      slots: {
        default: '<button>Custom Button</button>',
        loading: "<div class='loading'>Custom Loading</div>",
        uploaded: `<template #uploaded="{ uploadedData }">
          <div class='custom-loaded'>{{uploadedData.url}}</div>
        </template>`,
      },
    });
    // 自定义上传按钮
    expect(wrapper.get('button').text()).toBe('Custom Button');
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 change 事件
    await wrapper.get('input').trigger('change');
    // 自定义loading
    expect(wrapper.get('.loading').text()).toBe('Custom Loading');
    // 清除 promise
    await flushPromises();
    // 自定义文件名称
    expect(wrapper.get('.custom-loaded').text()).toBe('aa.url');
  });
  // 测试上传前检查
  it('before upload check', async () => {
    // 模拟一个回调函数
    const callback = jest.fn();
    // 模拟post请求
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'aa.url' } });
    // 模拟上传前的check
    const checkFileSize = (file: File) => {
      if (file.size > 2) {
        callback();
        return false;
      }
      return true;
    };
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        beforeUpload: checkFileSize,
      },
    });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // post 请求没有被触发
    expect(mockAxios.post).not.toHaveBeenCalled();
    // 页面中没有生成 li
    expect(wrapper.findAll('li').length).toBe(0);
    // 回调函数被触发
    expect(callback).toHaveBeenCalled();
  });
  // 测试上传前检查 使用 promise 失败
  it('before upload check using Promise file', async () => {
    // 模拟 post 请求
    mockAxios.post.mockRejectedValueOnce({ data: { url: 'aa.url' } });
    // 失败的情况
    const failedPromise = (file: File) => {
      return Promise.reject('wrong type');
    };
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        beforeUpload: failedPromise,
      },
    });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // 清除 promise
    await flushPromises();
    // post 请求没有被触发
    expect(mockAxios.post).not.toHaveBeenCalled();
    // 页面中没有生成 li
    expect(wrapper.findAll('li').length).toBe(0);
  });
  // 测试上传前检查 使用 promise 成功
  it('before upload check using Promise success', async () => {
    // 模拟 post 请求
    mockAxios.post.mockRejectedValueOnce({ data: { url: 'aa.url' } });
    // 成功的情况
    const successPromise = (file: File) => {
      const newFile = new File([file], 'new_name.docx', { type: file.type });
      return Promise.reject(newFile);
    };
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        beforeUpload: successPromise,
      },
    });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // 清除 promise
    await flushPromises();
    // post 请求被触发
    expect(mockAxios.post).toHaveBeenCalled();
    // 页面中生成了一个 li
    expect(wrapper.findAll('li').length).toBe(1);
    // 获取列表第一个元素
    const firstItem = wrapper.get('li:first-child');
    // 元素的类名包含 upload-success
    expect(firstItem.classes()).toContain('upload-success');
    // 元素的内容正确
    expect(firstItem.get('.filename').text()).toBe('new_name.docx');

    // 成功的情况 返回了错误类型
    const successPromiseWrongType = (file: File) => {
      const newFile = new File([file], 'new_name.docx', { type: file.type });
      return Promise.reject(newFile);
    };
    // 设置 props
    await wrapper.setProps({ beforeUpload: successPromiseWrongType });
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // 清除 promise
    await flushPromises();
    // post 请求没有被触发
    expect(mockAxios.post).not.toHaveBeenCalled();
    // 页面中没有生成 li
    expect(wrapper.findAll('li').length).toBe(0);
  });
  // 测试拖拽
  it('test drag and drop function', async () => {
    // 模拟 post 请求
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'aa.url' } });
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        drag: true,
      },
    });
    // 获取上传区域
    const uploadArea = wrapper.get('.upload-area');
    // 触发 dragover 事件
    await uploadArea.trigger('dragover');
    // 存在类名
    expect(uploadArea.classes()).toContain('is-dragover');
    // 触发 dragleave 事件
    await uploadArea.trigger('dragleave');
    // 不存在类名
    expect(uploadArea.classes()).not.toContain('is-dragover');
    // 触发 drop 事件
    await uploadArea.trigger('drop', { dataTransfer: { files: [testFile] } });
    // post 请求被触发
    expect(mockAxios.post).toHaveBeenCalled();
    // 页面中生成了一个 li
    expect(wrapper.findAll('li').length).toBe(1);
  });
  // 测试手动上传
  it('test manual upload process', async () => {
    // 模拟 post 请求
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'aa.url' } });
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        drag: true,
        autoUpload: false,
      },
    });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // 获取列表第一个元素
    const firstItem = wrapper.get('li:first-child');
    // 元素的类名包含 upload-ready
    expect(firstItem.classes()).toContain('upload-ready');
    // 获取组件实例 触发 uploadFiles 方法
    wrapper.vm.uploadFiles();
    // post 请求被触发
    expect(mockAxios.post).toHaveBeenCalled();
    // 清空 promise
    await flushPromises();
    // 元素的类名包含 upload-success
    expect(firstItem.classes()).toContain('upload-success');
  });
  // 测试文件列表展示
  it('pictureList mode should works fine', async () => {
    // 模拟 post 请求
    mockAxios.post.mockResolvedValueOnce({ data: { url: 'aa.url' } });
    // 模拟 URL.createObjectURL 方法
    window.URL.createObjectURL = jest.fn(() => {
      return 'test.url';
    });
    const wrapper = shallowMount(Uploader, {
      props: {
        action: 'https://jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
      },
    });
    // 模拟 input 的 e.target.files
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    const files = [testFile] as any;
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    });
    // 元素的类名包含 upload-list-picture
    expect(wrapper.get('ul').classes()).toContain('upload-list-picture');
    // 触发 input 的 change 事件
    await wrapper.get('input').trigger('change');
    // 清空 promise
    await flushPromises();
    // 页面中生成了一个 li
    expect(wrapper.findAll('li').length).toBe(1);
    // 检测 图片是否正确渲染
    expect(wrapper.find('li:first-child img').exists()).toBeTruthy();
    // 图片src是否正确
    const firstImg = wrapper.get('li:first-child img');
    expect(firstImg.attributes('src')).toEqual('test.url');
  });

  afterEach(() => {
    // 重置 post 请求
    mockAxios.post.mockReset();
  });
});
