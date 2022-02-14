---
nav:
  title: Numeral
  path: /components
---

## 数字格式化

<API></API>

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
