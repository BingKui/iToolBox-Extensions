import { getCommondLine } from './sign';
const iToolBox = window.iToolBox || {};
export const TencentTranslate = async (text, { base, target }) => {
    if (!text) {
        return;
    }
    const line = getCommondLine(text, { base, target });
    console.log(line);
    console.log(iToolBox);
    const res = await iToolBox.command(line);
    console.log('执行结果为：', res);
    return JSON.parse(res.data);
};


