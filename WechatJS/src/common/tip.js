import { Message, Notice } from 'view-design';

Message.config({
    top: 25,
    duration: 3
});

export const TipSuccess = (text='成功') => {
    Message.success(text);
};

export const TipError = (text='错误') => {
    Message.error(text);
};

export const TipWarning = (text='警告') => {
    Message.warning(text);
};

export const TipLoading = (text='加载中...', duration = 3) => {
    Message.loading({
        content: text,
        duration,
    });
};

export const NoticeNormal = (title, desc) => {
    Notice.open({
        title,
        desc,
    });
};
