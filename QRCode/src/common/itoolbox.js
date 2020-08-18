// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};
const DB_NAME = 'qrcode';
const DB = iToolBox.DB;

export const getAllLocalData = async () => {
    if (DB) {
        const res = await DB.getAllItems(DB_NAME);
        return res.success ? res.data : [];
    }
    return [];
};

export const addLocalItem = async (info) => {
    const res = await DB.addItem(DB_NAME, { ...info });
    return res.success;
};

export const delLocalItem = async (id) => {
    const res = await DB.deleteItemById(DB_NAME, id);
    return res.success;
};
