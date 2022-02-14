# numeral-react

<div>
  <h1>numeral-react</h1>
  <p>
    <br />
    <strong>金额格式化组件，内容丰富，提供数字转中文大写 例如：￥200034.12 => ￥贰拾万零叁拾肆元壹角贰分</strong>
  </p>
</div>

## Getting Started

Install dependencies,

```bash
$ npm i numeral-react
or
$ yarn add numeral-react
```

### API

<table style="margin-top: 24px;"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td>value</td><td>需要格式化的值</td><td><code>string | number</code></td><td><code>(required)</code></td></tr><tr><td>currency</td><td>币种 or 前缀例如 currency = '￥'  ￥100.00</td><td><code>string</code></td><td><code>--</code></td></tr><tr><td>textAlign</td><td>textAlign</td><td><code>"right" | "left" | "center"</code></td><td><code>right</code></td></tr><tr><td>unit</td><td>单位 例如unit = '元' 100.00元</td><td><code>string</code></td><td><code>--</code></td></tr><tr><td>render</td><td>渲染</td><td><code>(currency: string, value: string | number, unit: string) =&gt; ReactNode</code></td><td><code>--</code></td></tr><tr><td>decimals</td><td>保留几位小数 自定义类型可用其余不可用</td><td><code>number</code></td><td><code>--</code></td></tr><tr><td>divisor</td><td>除数 自定义类型可用其余不可用</td><td><code>number</code></td><td><code>1</code></td></tr><tr><td>type</td><td>类型 'default'普通保留2位数格式 'thousand'只格式千分位不保留小数 'tenThousand'万 保留6位小数 'user-defined' 自定义
对应可以直接使用 Numeral.Money Numeral.Thousand Numeral.TT Numeral.Defined</td><td><code>FormatType</code></td><td><code>default</code></td></tr></tbody></table>

### Demo:

```jsx
import { Card, Modal, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { Numeral } from 'numeral-react';
import 'antd/dist/antd.css';

export default () => {
  const columns = [
    {
      title: '商品',
      align: 'left',
      dataIndex: 'name',
    },
    {
      title: '数量',
      align: 'right',
      dataIndex: 'numbers',
      render: (text) => <Numeral.Thousand value={text} />,
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'right',
      render: (text) => <Numeral value={text} unit="元" />,
    },
  ];

  const columns2 = [
    {
      title: '商品',
      align: 'left',
      dataIndex: 'name',
    },
    {
      title: '数量',
      align: 'right',
      dataIndex: 'numbers',
      render: (text) => <Numeral type="thousand" unit="件" value={text} />,
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'right',
      render: (text) => <Numeral.TT value={text} unit="万元" />,
    },
  ];

  const columns3 = [
    {
      title: '商品',
      align: 'left',
      dataIndex: 'name',
    },
    {
      title: '数量',
      align: 'right',
      dataIndex: 'numbers',
      render: (text) => <Numeral.Thousand value={text} />,
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'right',
      render: (text) => (
        <Numeral.Defined
          render={(currency, value, unit) => (
            <div>
              <Tag color="cyan">{`${currency}${value}${unit}`}</Tag>
            </div>
          )}
          decimals={3}
          value={text}
          unit="美元"
          currency="$"
        />
      ),
    },
  ];

  const columns4 = [
    {
      title: '商品',
      align: 'left',
      dataIndex: 'name',
    },
    {
      title: '数量',
      align: 'right',
      dataIndex: 'numbers',
      render: (text) => <Numeral.Thousand value={text} />,
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'right',
      render: (text) => <Numeral.Defined decimals={3} value={text} unit="" />,
    },
  ];

  const columns5 = [
    {
      title: '商品',
      align: 'left',
      dataIndex: 'name',
    },
    {
      title: '数量',
      align: 'right',
      dataIndex: 'numbers',
      render: (text) => <div>{Numeral.numberValue(text, 0, 1)}</div>,
    },
    {
      title: '金额',
      dataIndex: 'money',
      align: 'right',
      render: (text) => <div>{Numeral.numberValue(text, 2, 1)}</div>,
    },
  ];

  const dataArray = () => {
    const data = [];
    for (let i = 0; i < 1; i++) {
      data.push({
        key: i,
        name: `产品 ${i}`,
        numbers: 1000,
        money: 23004.34,
      });
    }
    return data;
  };

  return (
    <>
      <Card>
        <h3>普通的金额格式化 例如:2000 -- 2,000.00 </h3>
        <Table pagination={false} columns={columns} dataSource={dataArray()} />
      </Card>
      <Card>
        <h3>格式转行为万元 例如:20000 -- 2.000000</h3>
        <Table pagination={false} columns={columns2} dataSource={dataArray()} />
      </Card>
      <Card>
        <h3>格式自定义 需要转为保留3位小数 使用render自定义渲染 </h3>
        <Table pagination={false} columns={columns3} dataSource={dataArray()} />
      </Card>
      <Card>
        <h3>错误格式数据-原始数据返回 ***金额=fds-9383</h3>
        <Table
          pagination={false}
          columns={columns4}
          dataSource={[
            {
              key: 333,
              name: `产品 ${0}`,
              numbers: Math.floor(Math.random() * 100000),
              money: 'fds-9383',
            },
          ]}
        />
      </Card>
      <Card>
        <h3>不直接使用Numeral组件 使用Numeral.numberValue转换</h3>
        <Table
          pagination={false}
          columns={columns5}
          dataSource={[
            {
              key: 333,
              name: `产品 ${0}`,
              numbers: Math.floor(Math.random() * 100000),
              money: '1000',
            },
          ]}
        />
      </Card>
      <Card>
        <h3>￥200034.12 => ￥{Numeral.numberMoneyToChinese(200034.12)}</h3>
      </Card>
    </>
  );
};
```
