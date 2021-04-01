// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};
const DB = iToolBox.DB;
const DB_NAME = 'audio-db';

const addItemData = async (info) => {
    const res = await DB.addItem(DB_NAME, {
        ...info,
    });
    return res ? true : false;
};

const getAllDataList = async () => {
    const res = await DB.getAllItems(DB_NAME);
    console.log('API => 获取所有数据', res);
    return res.data;
};

module.exports = {
    addItemData,
    getAllDataList,
};

// async getItemData(item) {
//     const res = await DB.getItemById(DB_NAME, item._id);
//     if (res.code === 200) {
//         this.itemDetail = JSON.stringify(res.data);
//     }
// },
// async updateItemData(item) {
//     const _item = {
//         name: `${item.name}-update`
//     };
//     const res = await DB.updateItemById(DB_NAME, item._id, _item);
//     if (res.code === 200) {
//         message.success('更新成功');
//         await this.getAllDataList();
//     }
// },
// async deleteItemData(item) {
//     console.log('API => 执行删除', item);
//     const res = await DB.deleteItemById(DB_NAME, item._id);
//     if (res.code === 200) {
//         message.success('删除成功');
//         await this.getAllDataList();
//     }
// },
// async getAllDataList() {
//     const res = await DB.getAllItems(DB_NAME);
//     console.log('API => 获取所有数据', res);
//     if (res) {
//         this.dbList = res.data;
//     }
// },
// async getAllDataCount() {
//     const res = await DB.getCount(DB_NAME);
//     if (res) {
//         message.success(`获取统计信息成功：总共${res.data}条数据！`);
//     }
// },
