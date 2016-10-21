'strict'

let util = Object.create(null);

// defines a readonly api property on an object
let _defineProp = (on, name, value, writable = false, deletable = false) => {
    let descriptor = Object.create(null);
    Object.defineProperties(descriptor, {
        value: {
            value: value
        },
        configurable: {
            value: deletable
        },
        enumerable: {
            value: false
        },
        writable: {
            value: writable
        }
    });
    Object.defineProperty(on, name, descriptor);
};
let _scriptImport = (moduleId, src) => {
    return new Promise((resolve, reject) => {
        // TODO: type for other sources (loader plugins)
        let script = document.createElement('script');
        script.id = moduleId;
        script.type = "text/javascript";
        script.onerror = (error) => { reject(error); };
        script.onload = () => {
            resolve(moduleId);
        };
        
        // add script to DOM before setting source ?
        document.head.appendChild(script);
        script.src = `${src}.js`;
    });
};
_defineProp(util, "defineProp", _defineProp);
_defineProp(util, "scriptImport", _scriptImport);

export default util;