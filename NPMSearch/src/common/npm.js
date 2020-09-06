import NpmSearch from 'libnpmsearch';

export const searchLibrary = async (name, page) => {
    const res = await NpmSearch(name, {
        limit: 20,
        from: (page - 1) * 20,
        agent: false,
    });
    console.log('获取到的内容为：', res);
    return res || [];
};
