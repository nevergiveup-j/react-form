import React, { Component } from 'react'
import { Picker, Input } from 'zarm';

import Form from '../src/index';

import './App.scss';
import 'zarm/styles/index.scss';
import '../styles/index.css';

const createForm = Form.create;
const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certTypeDatas: [
        { value: '0', label: '请选择证件类型' },
        { value: '1', label: '身份证' },
        { value: '2', label: '护照' },
      ]
    };

    // this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    // e.preventDefault();

    // console.log('this.props====', this.props.form.getFieldsValue());

    this.props.form.validateFields((errors, value) => {
      console.log(errors)
      console.log(value)
    })
  }
  render() {
    const { certTypeDatas } = this.state;
    const { getFieldProps } = this.props.form;

    // console.log('props', this.props)

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '用户名至少为 5 个字符' },
        { required: true, min: 5,  regexp: /^\d/, message: '用户名至少为 5 个字符' },
      ]
    });

    const certTypeProps = getFieldProps('certType', {
      rules: [
        { required: true, message: '证件类型' },
      ]
    });

    const certNoProps = getFieldProps('certNo', {
      rules: [
        { required: true,  message: '证件号码必须为数字值' },
        {
          validator: (rule, value, callback, source, options) => {
            const errors = ['errors'];
            callback(errors);
          }
        }
      ]
    });

    const phoneProps = getFieldProps('phone', {
      rules: [
        { required: true, message: '请输入手机号' },
        // { required: true, type: 'isMobile', message: '请输入正确手机号' },
      ]
    });

    return (
      <div className="form-wrap">
        <Form>
          <FormItem
            label="姓名"
          >
            请输入姓名
          </FormItem>
          <FormItem
            label="姓名"
            description={<div>请输入姓名</div>}
          >
          </FormItem>
          <FormItem
            label="姓名"
          >
            <Input type="text" {...nameProps} placeholder="请输入姓名" />
          </FormItem>
          <FormItem
            hasArrow
            label="证件类型"
          >
            <Picker
              dataSource={ certTypeDatas }
              />
          </FormItem>
          <FormItem
            label="证件号码"
          >
            <Input type="text" {...certNoProps} placeholder="请输入证件号码" />
          </FormItem>
          <FormItem
            label="手机号"
          >
            <Input type="number" {...phoneProps} placeholder="请输入手机号" />
          </FormItem>

          <div className="button-inner">
            <button type="submit" onClick={() => this.onSubmit()} className="button-submit">提交</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default createForm()(App);
