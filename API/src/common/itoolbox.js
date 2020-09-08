// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

export const apiNotice = async (title, content, url='') => {
    await iToolBox.notice(title, content, url);
};

export const apiBeep = async () => {
    await iToolBox.beep();
};

export const apiGetSysInfo = () => {
    return iToolBox.getSystemInfo();
};

export const apiGetGupInfo = () => {
    return iToolBox.getGPUInfo();
};

export const apiGetCpuInfo = () => {
    return iToolBox.getCPUInfo();
};

export const apiIsMac = () => {
    return iToolBox.isMac();
};
export const apiIsWindows = () => {
    return iToolBox.isWindows();
};
export const apiIsLinux = () => {
    return iToolBox.isLinux();
};

export const apiGetMousePoint = () => {
    return iToolBox.getMousePoint();
};
export const apiGetMainDisplay = () => {
    return iToolBox.getMainDisplay();
};
export const apiGetAllDisplays = () => {
    return iToolBox.getAllDisplays();
};
export const apiGetDisplay = (x, y) => {
    return iToolBox.getDisplay({x, y});
};
export const apiGetDisplayRect = (x, y, width, height) => {
    return iToolBox.getDisplay({x, y, width, height});
};
