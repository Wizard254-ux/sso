const loadCSS = function (url) {
    return new Promise((resolve, reject) => {
        const stylesheet = document.createElement('link');
        stylesheet.href = url;
        stylesheet.rel = 'stylesheet';

        document.head.appendChild(stylesheet);

        stylesheet.onload = () => {
            resolve(stylesheet);
        };

        stylesheet.onerror = () => {
            reject();
        };
    });
};

const unloadCSS = function (stylesheet) {
    if (typeof stylesheet === 'string')
        document.head.removeChild(
            document.head.querySelector(`link[href='${stylesheet}']`)
        );
    else document.head.removeChild(stylesheet);
};

export { loadCSS, unloadCSS };
