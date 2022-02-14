/**
 * 金额格式化
 * @param val:number 需要格式化的值 decimals:number 保留位数
 * @returns
 */
export const getFF = (val: number, decimals: number | undefined, divisor: number = 1): string => {
  const str = `${(val / (divisor === 0 ? 1 : divisor)).toFixed(
    decimals === 0 || decimals === undefined ? 2 : decimals,
  )}`;
  const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); // 取到整数部分
  if (decimals === 0) {
    return intSum;
  }
  const dot = str.substring(str.length, str.indexOf('.')); // 取到小数部分搜索
  const ret = intSum + dot;
  return ret;
};

/**
 * 判断字符串是否是数字
 * @param
 * @returns
 */
export const stringIsNumber = (val: string): boolean => {
  const regPos = /^\d+(\.\d+)?$/; // 非负浮点数
  const regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  }
  return false;
};

/**
 * 字符串转number 判断字符串不是数字字符串返回原字符串 类型string
 * @param val
 * @returns
 */
export const stringToNumber = (val: string): number | string => {
  if (!stringIsNumber(val)) {
    return val;
  }
  return parseFloat(val);
};

/**
 * 判断any格式是否可以转化为数字  数字类型string以及number为true
 * @param val
 * @returns
 */
export const isNumber = (val: any): boolean => {
  if (typeof val === 'number') {
    return true;
  }
  if (typeof val === 'string' && stringIsNumber(val)) {
    return true;
  }
  return false;
};

export const numberValue = (
  val: string | number,
  decimals: number | undefined,
  divisor?: number,
): number | string => {
  if (isNumber(val)) {
    return getFF(parseFloat(`${val}`), decimals, divisor);
  }
  return val;
};

// 金额数字转换大写金额
export const numberMoneyToChinese = (val: number | string) => {
  if (!isNumber(val)) {
    return '';
  }
  const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'); //汉字的数字
  const cnIntRadice = new Array('', '拾', '佰', '仟'); //基本单位
  const cnIntUnits = new Array('', '万', '亿', '兆'); //对应整数部分扩展单位
  const cnDecUnits = new Array('角', '分', '毫', '厘'); //对应小数部分单位
  const cnInteger = '整'; //整数金额时后面跟的字符
  const cnIntLast = '元'; //整型完以后的单位
  const maxNum = 999999999999999.9999; //最大处理的数字
  let integerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let ChineseStr = ''; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  let Symbol = ''; //正负值标记

  let money = parseFloat(`${val}`);
  if (money >= maxNum) {
    alert('超出最大处理数字');
    return '';
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return ChineseStr;
  }
  if (money < 0) {
    money = -money;
    Symbol = '负 ';
  }
  const newMoney = `${money}`; //转换为字符串

  if (newMoney.indexOf('.') == -1) {
    integerNum = newMoney;
    DecimalNum = '';
  } else {
    parts = newMoney.split('.');
    integerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(integerNum, 10) > 0) {
    //获取整型部分转换
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != '') {
    //小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i++) {
      const n = DecimalNum.substr(i, 1);
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == '') {
    ChineseStr += cnInteger;
  }
  ChineseStr = Symbol + ChineseStr;

  return ChineseStr;
};
