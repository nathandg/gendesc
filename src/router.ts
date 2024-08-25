export class Router {
  
  static routes: { [key: string]: string } = {};
  static routeChangeCallbacks: Array<(path: string) => void> = [];

  static getHtmlFromFilePath(filePath: string) {
    return new Promise((resolve, reject) => {
      console.log('Criando página com o arquivo:', filePath);
      window.api.loadPage(filePath);
      
      window.api.onPageLoaded((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          console.log('Página criada com sucesso:', response.html);
          resolve(response.html);
        }
      });
    });
  }

  static async addRoute(routePath: string, filePath: string) {
    try {
      const html = await Router.getHtmlFromFilePath(filePath);
      Router.routes[routePath] = html as string;
    } catch (error) {
      console.error(error);
    }
  }

  static navigate(path: string) {
    const html = Router.routes[path];
    const app = document.getElementById('app');

    if (!html || !app) {
      throw new Error('Failed to navigate to path: ' + path);
    }

    app.innerHTML = html;
    Router.routeChangeCallbacks.forEach(callback => callback(path));
  }

  static onRouteChange(callback: (path: string) => void) {
    Router.routeChangeCallbacks.push(callback);
  }
}
