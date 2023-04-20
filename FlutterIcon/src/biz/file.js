// 处理 json 文件为可用的数据
export const dealJsonFile = (fileContent) => {
    const obj = JSON.parse(fileContent);
    const list = obj.glyphs;
    const result = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        result.push({
            name: dealIconName(item.name),
            code: `0x${item.unicode}`,
        });
    }
    return result;
};

const dealIconName = (name) => {
    const arr = name.replaceAll(' ', '-').split('-');

    let result = '';
    for (let i = 0; i < arr.length; i++) {
        result += firstToUpper(arr[i]);
    }
    return result.toLocaleLowerCase();
};

const firstToUpper = (str) => {
    const nameArr = str.trim().split('');
    let result = '';
    for (let i = 0; i < nameArr.length; i++) {
        if (i === 0) {
            result += nameArr[i].toUpperCase();
        } else {
            result += nameArr[i];
        }
    }
    return result;
};

export const createDartClass = (list, fontFamily) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        result.push(`static const IconData ${item.name} = IconData(${item.code}, fontFamily: '${fontFamily}');`);
    }
    return `class SelfIcon {
  ${result.join('\n  ')}
}`;
};
