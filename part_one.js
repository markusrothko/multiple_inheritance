/**
 * Markus Bowie
 * Noël Hennings
 */
var myObject = {
    foundFunc: false,

    create: function (prototypeList) {
        var prototypes = [];
        if (Array.isArray(prototypeList)) {
            prototypeList.forEach(function (prototype) {
                if (typeof prototype === 'object' && !Array.isArray(prototype)) {
                    prototypes.push(prototype);
                }
            })
        }
        var tempObject = Object.create(this);
        tempObject.prototypes = prototypes;
        return tempObject;
    },

    hasFunc: function (funcName, parameters) {
        return funcName in this && typeof this[funcName] === "function";
    },

    call: function (funcName, parameters) {
        if (this.hasFunc(funcName, parameters)) {
            this.foundFunc = true;
            return this[funcName].apply(null, parameters);
        } else {
            const checked = Array.isArray(arguments[2]) ? arguments[2] : [];
            checked.push(this);

            for (var i = 0; i < this.prototypes.length; i++) {
                var returnValue;
                const prototype = this.prototypes[i];
                if (checked.indexOf(prototype) == -1) {
                    returnValue = prototype.call(funcName, parameters, checked);
                }
                this.foundFunc = prototype.foundFunc;
                if (this.foundFunc) {
                    return returnValue;
                }
            }
        }

    },
};

// function test1() {
//     var obj0 = myObject.create(null);
//     obj0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     var obj1 = myObject.create([obj0]);
//     var obj2 = myObject.create([]);
//     obj2.func = function (arg) {
//         return "func2: " + arg;
//     };
//     var obj3 = myObject.create([obj1, obj2]);
//     var result = obj3.call("func", ["hello"]);
//     console.log("should print ’func0: hello’ ->", result);
//     return result === 'func0: hello';
// }
//
// function test2() {
//     obj0 = myObject.create(null);
//     obj0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     obj1 = myObject.create([obj0]);
//     obj2 = myObject.create([]);
//     obj3 = myObject.create([obj2, obj1]);
//     result = obj3.call("func", ["hello"]);
//     console.log("should print ’func0: hello’ ->", result);
//     return result === 'func0: hello';
// }
//
// function test3() {
//     obj0 = myObject.create(null);
//     obj0.func = function (arg) {
//         return "func0: " + arg;
//     };
//     result = obj0.call("func", ["hello"]);
//     console.log("should print ’func0: hello’ ->", result);
//     return result === 'func0: hello';
// }
//
// test1() && console.log('success')
// test2() && console.log('success')
// test3() && console.log('success')
