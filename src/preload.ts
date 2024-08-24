// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

declare global {
  interface Window {
    api: {
      loadPage: (filePath: string) => void;
      onPageLoaded: (callback: (response: { error?: any; html?: string }) => void) => void;
    };
  }
}

// Expose API in the main world
contextBridge.exposeInMainWorld('api', {
  loadPage: (filePath: string) => ipcRenderer.send('load-page', filePath),
  onPageLoaded: (callback: (response: { error?: string; html?: string }) => void) => 
    ipcRenderer.on('load-page-reply', (event, response) => callback(response)),
});
