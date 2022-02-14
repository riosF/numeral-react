import React from 'react';
import {
  isNumber,
  stringIsNumber,
  stringToNumber,
  numberValue,
  getFF,
  numberMoneyToChinese,
} from './utils';

type FormatType = 'default' | 'thousand' | 'tenThousand' | 'user-defined' | undefined;

type R5NumberFormatBaseProps = {
  /**
   * 需要格式化的值
   */
  value: number | string;
  /**
   * 币种 or 前缀例如 currency = '￥'  ￥100.00
   */
  currency?: string;
  /**
   * textAlign
   */
  textAlign?: 'right' | 'left' | 'center';
  /**
   * 单位 例如unit = '元' 100.00元
   */
  unit?: string;
  /**
   * 渲染
   */
  render?: (
    currency: string,
    value: number | string,
    unit: string,
  ) => number | string | React.ReactNode;
};

type R5NumberFormatUserDefinedProps = R5NumberFormatBaseProps & {
  /**
   * 保留几位小数 自定义类型可用其余不可用
   */
  decimals?: number;
  /**
   * 除数 自定义类型可用其余不可用
   */
  divisor?: number;
};

type R5NumberFormatProps = R5NumberFormatUserDefinedProps & {
  /**
   * 类型 'default'普通保留2位数格式 'thousand'只格式千分位不保留小数 'tenThousand'万 保留6位小数 'user-defined' 自定义
   * 对应可以直接使用 Numeral.Money Numeral.Thousand Numeral.TT Numeral.Defined
   */
  type?: FormatType;
};

const NumberElement = ({
  value,
  currency = '',
  textAlign = 'right',
  unit = '',
  render,
}: R5NumberFormatBaseProps) => {
  return (
    <div style={{ textAlign }}>
      {typeof render === 'function' ? render(currency, value, unit) : `${currency}${value}${unit}`}
    </div>
  );
};

/**
 * 默认的金额格式化 千分符 保留2位小数
 * @param
 * @returns
 */
const DefaultMoney = ({
  value,
  currency = '',
  textAlign = 'right',
  unit = '',
  render,
}: R5NumberFormatBaseProps) => {
  return (
    <NumberElement
      value={numberValue(value, 2)}
      currency={currency}
      textAlign={textAlign}
      unit={unit}
      render={render}
    />
  );
};

/**
 * 千分符的数字格式化
 * @param
 * @returns
 */
const ThousandFormatNumber = ({
  value,
  currency = '',
  textAlign = 'right',
  unit = '',
  render,
}: R5NumberFormatBaseProps) => {
  return (
    <NumberElement
      value={numberValue(value, 0)}
      currency={currency}
      textAlign={textAlign}
      unit={unit}
      render={render}
    />
  );
};

/**
 * 千分符的万元金额格式化
 * @param
 * @returns
 */
const TenThousandMoney = ({
  value,
  currency = '',
  textAlign = 'right',
  unit = '',
  render,
}: R5NumberFormatBaseProps) => {
  return (
    <NumberElement
      value={numberValue(value, 6, 10000)}
      currency={currency}
      textAlign={textAlign}
      unit={unit}
      render={render}
    />
  );
};

/**
 * 自定义格式
 * @param
 * @returns
 */
const UserDefinedFormatNumber = ({
  value,
  decimals,
  divisor = 1,
  currency = '',
  textAlign = 'right',
  unit = '',
  render,
}: R5NumberFormatUserDefinedProps) => {
  return (
    <div style={{ textAlign }}>
      {typeof render === 'function'
        ? render(currency, numberValue(value, decimals, divisor), unit)
        : `${currency}${numberValue(value, decimals, divisor)}${unit}`}
    </div>
  );
};

const Numeral = ({
  value,
  decimals,
  divisor = 1,
  currency = '',
  textAlign = 'right',
  unit = '',
  type = 'default',
}: R5NumberFormatProps) => {
  const props: R5NumberFormatBaseProps = {
    value,
    currency,
    textAlign,
    unit,
  };
  if (type === 'default') {
    return <DefaultMoney {...props} />;
  }
  if (type === 'thousand') {
    return <ThousandFormatNumber {...props} />;
  }

  if (type === 'tenThousand') {
    return <TenThousandMoney {...props} />;
  }

  if (type === 'user-defined') {
    const definedProps: R5NumberFormatUserDefinedProps = {
      ...props,
      decimals,
      divisor,
    };
    return <UserDefinedFormatNumber {...definedProps} />;
  }

  return <DefaultMoney {...props} />;
};

export default Numeral;

/**
 * 方法
 */
Numeral.stringToNumber = stringToNumber;
Numeral.stringIsNumber = stringIsNumber;
Numeral.numberFormat = getFF;
Numeral.isDealToNumber = isNumber;
Numeral.numberValue = numberValue;
Numeral.numberMoneyToChinese = numberMoneyToChinese;

/**
 * 组件
 */
Numeral.TT = TenThousandMoney;
Numeral.Defined = UserDefinedFormatNumber;
Numeral.Thousand = ThousandFormatNumber;
Numeral.Money = DefaultMoney;
