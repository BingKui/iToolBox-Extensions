// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

/**
 * 复制内容
 * @param {String} text 复制的内容
 */
export const copyText = async (text) => {
    const res = await iToolBox.copyText(text);
    if (res.success) {
        return true;
    }
    return false;
};
