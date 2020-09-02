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

export const addItem = async (dbName, info) => {
    return await iToolBox.DB.addItem(dbName, info);
};

export const delItem = async (dbName, id) => {
    return await iToolBox.DB.deleteItemById(dbName, id);
};

export const getAllItems = async (dbName) => {
    return await iToolBox.DB.getAllItems(dbName);
};
