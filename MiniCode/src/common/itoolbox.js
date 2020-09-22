// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

export const apiRequest = async ({url, param, method, headers, other}) => {
    return await iToolBox.request({url, param, method, headers, other});
};
export const apiSaveFile = (filename, data) => {
    return iToolBox.saveFile(filename, data);
};
export const apiArrayBufferToBase64 = (buffer) => {
    return iToolBox.arrayBufferToBase64(buffer);
};
