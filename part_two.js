/**
 * Markus Bowie
 * Noël Hennings
 */
function createClass(className, superClassList) {
    const baseClass = {
        foundFunc: false,
        name: className,
        parents: []
    };

    if (Array.isArray(superClassList)) {
        superClassList.forEach(function (superClass) {
            if (typeof superClass === 'object' && !Array.isArray(superClass)) {
                baseClass.parents.push(superClass);
            }
        })
    }

    baseClass.new = function () {
        return Object.create(this);
    };

    baseClass.hasFunc = function (functionName, parameters) {
        return functionName in this && typeof this[functionName] === "function";
    };

    baseClass.call = function (funcName, parameters) {
        if (this.hasFunc(funcName, parameters)) {
            this.foundFunc = true;
            return this[funcName].apply(null, parameters);
        } else {
            const checked = Array.isArray(arguments[2]) ? arguments[2] : [];
            checked.push(this);

            for (let i = 0; i < this.parents.length; i++) {
                let returnValue;
                const parent = this.parents[i];
                if (checked.indexOf(parent) == -1) {
                    returnValue = parent.call(funcName, parameters, checked);
                }
                this.foundFunc = parent.foundFunc;
                if (this.foundFunc) {
                    return returnValue;
                }
            }
        }

    };
    return baseClass;
};


// function test1() {
//     var class0 = createClass("Class0", null);
//     class0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     var class1 = createClass("Class1", [class0]);
//     var class2 = createClass("Class2", []);
//     class2.func = function (arg) {
//         return "func2: " + arg;
//     };
//     var class3 = createClass("Class3", [class1, class2]);
//     var obj3 = class3.new();
//     var result = obj3.call("func", ["hello"]);
//     if (result === 'func0: hello') console.log('success')
//     else console.error('fail', result)
// }
//
// function test2() {
//     class0 = createClass("Class0", null);
//     class0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     class1 = createClass("Class1", [class0]);
//     class2 = createClass("Class2", []);
//     class3 = createClass("Class3", [class2, class1]);
//     obj3 = class3.new();
//     result = obj3.call("func", ["hello"]);
//     if (result === 'func0: hello') console.log('success')
//     else console.error('fail', result)
// }
//
// function test3() {
//     class0 = createClass("Class0", null);
//     class0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     var obj0 = class0.new();
//     result = obj0.call("func", ["hello"]);
//     if (result === 'func0: hello') console.log('success')
//     else console.error('fail', result)
// }
//
// function test4() {
//     var class0 = createClass("Class0", null);
//     class0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     var class1 = createClass("Class1", [class0]);
//     var class2 = createClass("Class2", []);
//     class2.func = function (arg) {
//         return "func2: " + arg;
//     };
//     class2.func2 = function (arg) {
//         return "func2: " + arg;
//     };
//     var class3 = createClass("Class3", [class1, class2]);
//     class3.func = function (arg) {
//         return "func3: " + arg;
//     };
//     var obj3 = class3.new();
//     var result = obj3.call("func", ["hello2"]);
//     if (result === 'func3: hello2') console.log('success')
//     else console.error('fail', result)
// }
//
// test1()
// test2()
// test3()
// test4()
