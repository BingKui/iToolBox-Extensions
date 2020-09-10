import { get } from './ajax';
import MD5 from 'md5';
import { BAIDU_URL } from '@constants/url';
const APPID = '2015063000000001';
const APPSCREAT = 'MidPvb3Febt1nHxFGXEk';
const DOMAIN = 'common';

const createSign = (text, randomNumber) => {
    const str = `${APPID}${text}${randomNumber}${DOMAIN}${APPSCREAT}`;
    return MD5(str);
};

export const translateText = (text, { base, target }) => {
    // 生成签名
    const randomNumber = (new Date()).getTime();
    const sign = createSign(text, randomNumber);
    console.log('签名为：', sign);
    const param = {
        q: encodeURIComponent(text),
        from: base,
        to: target,
        appid: APPID,
        salt: randomNumber,
        sign,
        domain: DOMAIN,
    };
    console.log('参数为：', param);
    // 发送请求
    return get(BAIDU_URL, param);
};
