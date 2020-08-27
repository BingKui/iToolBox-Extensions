import { Message } from 'ant-design-vue';

/**
 * 提示
 * @param {String} text 提示信息
 */
export const Tip = (text) => {
    Message.info(text, 2, () => {});
};

/**
 * 成功提示
 * @param {String} text 提示信息
 */
export const TipSuccess = (text) => {
    Message.success(text, 2, () => {});
};

/**
 * 错误提示
 * @param {String} text 提示信息
 */
export const TipError = (text) => {
    Message.error(text, 2, () => {});
};

/**
 * 警告提示
 * @param {String} text 提示信息
 */
export const TipWarning = (text) => {
    Message.warning(text, 2, () => {});
};

/**
 * 加载
 * @param {String} text 提示信息
 */
export const TipLoading = (text) => {
    Message.loading(text, 2, () => {});
};
