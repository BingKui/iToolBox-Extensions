// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

export const copyText = async (text) => {
    const res = await iToolBox.copyText(text);
    if (res.success) {
        return true;
    }
    return false;
};
