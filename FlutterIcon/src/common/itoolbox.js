// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

export const apiSelectFile = () => {
    return iToolBox.selectFile();
};

export const apiGetFileContent = (filePath) => {
    return iToolBox.getFileContent(filePath);
};

export const apiCopyText = (text) => {
    return iToolBox.copyText(text);
};
