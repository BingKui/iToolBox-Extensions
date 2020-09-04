import * as Terser from 'terser';
import { TipError } from './tip';
/**
 * 压缩代码
 * @param {String} codeString 代码字符串
 */
export const jsCodeTerser = async (codeString) => {
    try {
        const result = await Terser.minify(codeString);
        if (result.error) {
            console.error(result.error);
            TipError('压缩失败，检查代码是否正确');
        } else {
            console.log('压缩结果为：', result);
            return result.code;
        }
    } catch (error) {
        console.log('catch', error);
    }
};

