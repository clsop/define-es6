'strict'

let util = Object.create(null);

let _defineProperty = (on, name, value, enumerable = false, writable = false, configurable = false) => {
    let descriptor = Object.create(null);
    Object.defineProperties(descriptor, {
        value: {
            value: value
        },
        configurable: {
            value: configurable
        },
        enumerable: {
            value: enumerable
        },
        writable: {
            value: writable
        }
    });
    Object.defineProperty(on, name, descriptor);
};

let _properties = (names, values, enumerable, writable, configurable) => {
    let props = Object.create(null);

    names.forEach((name, index) => {
        props[name] = {
            value: values[index],
            configurable: configurable,
            enumerable: enumerable,
            writable: writable
        };
    });
    
    return props;
};

let _defineProperties = (on, names, values, enumerable = false, writable = false, configurable = false) => {
    let descriptor = Object.create(null);
    Object.defineProperties(on, _properties(names, values, enumerable, writable, configurable));
};

let _scriptImport = (moduleId, src) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.id = moduleId;
        script.type = "text/javascript";
        script.onerror = (error) => {
            reject(error);
        };
        script.onload = () => {
            resolve(moduleId);
        };

        // add script to DOM before setting source ?
        document.head.appendChild(script);
        script.src = `${src}.js`;
    });
};

// helper function for defining a flexible object property
_defineProperty(util, "defineProperty", _defineProperty);

// helper function for defining flexible object properties
_defineProperty(util, "defineProperties", _defineProperties);

// dynamic imports of scripts
_defineProperty(util, "scriptImport", _scriptImport);

export default util;