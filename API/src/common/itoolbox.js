// 使用到的原生方法封装
const iToolBox = window.iToolBox || {};

export const apiNotice = async (title, content, url='') => {
    await iToolBox.notice(title, content, url);
};

export const apiBeep = async () => {
    await iToolBox.beep();
};
export const apiCommand = async (line) => {
    return await iToolBox.command(line);
};
export const apiRequest = async ({url, param, method, headers}) => {
    return await iToolBox.request({url, param, method, headers});
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

export const apiOpenUrl = (url) => {
    return iToolBox.openUrlInBrowser(url);
};
export const apiOpenFile = (filePath) => {
    return iToolBox.openFile(filePath);
};
export const apiOpenFolder = (folderPath) => {
    return iToolBox.openFolder(folderPath);
};
export const apiShowFileInManage = (filePath) => {
    return iToolBox.showFileInManage(filePath);
};

export const apiSelectFile = () => {
    return iToolBox.selectFile();
};
export const apiSelectFolder = () => {
    return iToolBox.selectFolder();
};

export const apiCopyText = (text) => {
    return iToolBox.copyText(text);
};
export const apiCopyFileContent = (filePath) => {
    return iToolBox.copyFileContent(filePath);
};
export const apiCopyImage = (filePath) => {
    return iToolBox.copyImage(filePath);
};

export const apiGetFolderContent = (folderPath) => {
    return iToolBox.getFolderContentList(folderPath);
};
export const apiGetFileContent = (filePath) => {
    return iToolBox.getFileContent(filePath);
};
export const apiDeleteFile = (filePath) => {
    return iToolBox.deleteFile(filePath);
};
export const apiTrashFile = (filePath) => {
    return iToolBox.trashFile(filePath);
};
export const apiDeleteFolder = (folderPath) => {
    return iToolBox.deleteFolder(folderPath);
};
export const apiTrashFolder = (folderPath) => {
    return iToolBox.trashFolder(folderPath);
};

