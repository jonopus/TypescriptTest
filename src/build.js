var com;
(function (com) {
    (function (opus) {
        (function (signals) {
            function validateListener(listener, fnName) {
                if(typeof listener !== 'function') {
                    throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
                }
            }
            var Signal = (function () {
                function Signal() {
                    this._bindings = [];
                    this._prevParams = null;
                    this.VERSION = '::VERSION_NUMBER::';
                    this.memorize = false;
                    this._shouldPropagate = true;
                    this.active = true;
                }
                Signal.prototype._registerListener = function (listener, isOnce, listenerContext, priority) {
                    if (typeof isOnce === "undefined") { isOnce = null; }
                    if (typeof listenerContext === "undefined") { listenerContext = null; }
                    if (typeof priority === "undefined") { priority = null; }
                    var prevIndex = this._indexOfListener(listener, listenerContext);
                    var binding;
                    if(prevIndex !== -1) {
                        binding = this._bindings[prevIndex];
                        if(binding.isOnce() !== isOnce) {
                            throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                        }
                    } else {
                        binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                        this._addBinding(binding);
                    }
                    if(this.memorize && this._prevParams) {
                        binding.execute(this._prevParams);
                    }
                    return binding;
                };
                Signal.prototype._addBinding = function (binding) {
                    var n = this._bindings.length;
                    do {
                        --n;
                    }while(this._bindings[n] && binding._priority <= this._bindings[n]._priority)
                    this._bindings.splice(n + 1, 0, binding);
                };
                Signal.prototype._indexOfListener = function (listener, context) {
                    var n = this._bindings.length;
                    var cur;

                    while(n--) {
                        cur = this._bindings[n];
                        if(cur._listener === listener && cur.context === context) {
                            return n;
                        }
                    }
                    return -1;
                };
                Signal.prototype.has = function (listener, context) {
                    return this._indexOfListener(listener, context) !== -1;
                };
                Signal.prototype.add = function (listener, listenerContext, priority) {
                    if (typeof listenerContext === "undefined") { listenerContext = null; }
                    if (typeof priority === "undefined") { priority = null; }
                    validateListener(listener, 'add');
                    return this._registerListener(listener, false, listenerContext, priority);
                };
                Signal.prototype.addOnce = function (listener, listenerContext, priority) {
                    if (typeof listenerContext === "undefined") { listenerContext = null; }
                    if (typeof priority === "undefined") { priority = null; }
                    validateListener(listener, 'addOnce');
                    return this._registerListener(listener, true, listenerContext, priority);
                };
                Signal.prototype.remove = function (listener, context) {
                    if (typeof context === "undefined") { context = null; }
                    validateListener(listener, 'remove');
                    var i = this._indexOfListener(listener, context);
                    if(i !== -1) {
                        this._bindings[i]._destroy();
                        this._bindings.splice(i, 1);
                    }
                    return listener;
                };
                Signal.prototype.removeAll = function () {
                    var n = this._bindings.length;
                    while(n--) {
                        this._bindings[n]._destroy();
                    }
                    this._bindings.length = 0;
                };
                Signal.prototype.getNumListeners = function () {
                    return this._bindings.length;
                };
                Signal.prototype.halt = function () {
                    this._shouldPropagate = false;
                };
                Signal.prototype.dispatch = function (params) {
                    if (typeof params === "undefined") { params = null; }
                    if(!this.active) {
                        return;
                    }
                    var paramsArr = Array.prototype.slice.call(arguments);
                    var n = this._bindings.length;
                    var bindings;

                    if(this.memorize) {
                        this._prevParams = paramsArr;
                    }
                    if(!n) {
                        return;
                    }
                    bindings = this._bindings.slice(0);
                    this._shouldPropagate = true;
                    do {
                        n--;
                    }while(bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false)
                };
                Signal.prototype.forget = function () {
                    this._prevParams = null;
                };
                Signal.prototype.dispose = function () {
                    this.removeAll();
                    delete this._bindings;
                    delete this._prevParams;
                };
                Signal.prototype.toString = function () {
                    return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
                };
                return Signal;
            })();
            signals.Signal = Signal;            
            var SignalBinding = (function () {
                function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
                    this.active = true;
                    this.params = null;
                    this._listener = listener;
                    this._isOnce = isOnce;
                    this.context = listenerContext;
                    this._signal = signal;
                    this._priority = priority || 0;
                }
                SignalBinding.prototype.execute = function (paramsArr) {
                    var handlerReturn;
                    var params;

                    if(this.active && !!this._listener) {
                        params = this.params ? this.params.concat(paramsArr) : paramsArr;
                        handlerReturn = this._listener.apply(this.context, params);
                        if(this._isOnce) {
                            this.detach();
                        }
                    }
                    return handlerReturn;
                };
                SignalBinding.prototype.detach = function () {
                    return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
                };
                SignalBinding.prototype.isBound = function () {
                    return (!!this._signal && !!this._listener);
                };
                SignalBinding.prototype.getListener = function () {
                    return this._listener;
                };
                SignalBinding.prototype._destroy = function () {
                    delete this._signal;
                    delete this._listener;
                    delete this.context;
                };
                SignalBinding.prototype.isOnce = function () {
                    return this._isOnce;
                };
                SignalBinding.prototype.toString = function () {
                    return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
                };
                return SignalBinding;
            })();
            signals.SignalBinding = SignalBinding;            
        })(opus.signals || (opus.signals = {}));
        var signals = opus.signals;

    })(com.opus || (com.opus = {}));
    var opus = com.opus;

})(com || (com = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var require;
var exec = require('child_process').exec;
var child = require('child_process').child;
var compile;
(function (compile) {
    var Command = (function () {
        function Command() {
            this.executed = new com.opus.signals.Signal();
        }
        Command.prototype.getOptions = function () {
            return "";
        };
        Command.prototype.exe = function () {
            var _this = this;
            var options = this.getOptions();
            console.log('exe: ' + options);
            var child = exec(options);
            child.addListener("close", function (x) {
                return _this.result();
            });
        };
        Command.prototype.result = function () {
            this.executed.dispatch();
        };
        return Command;
    })();
    compile.Command = Command;    
    var TypeScriptCompileCommand = (function (_super) {
        __extends(TypeScriptCompileCommand, _super);
        function TypeScriptCompileCommand(input, output) {
            if (typeof output === "undefined") { output = null; }
                _super.call(this);
            this.input = input;
            this.output = output;
        }
        TypeScriptCompileCommand.prototype.getOptions = function () {
            return "tsc" + (this.declarations ? " --declarations" : "") + (this.module != null ? " --module " + this.module : "") + (this.output != null ? " --out " + this.output : "") + (this.target != null ? " --target " + this.target : "") + (" " + this.input);
        };
        return TypeScriptCompileCommand;
    })(Command);
    compile.TypeScriptCompileCommand = TypeScriptCompileCommand;    
    var NodeCommand = (function (_super) {
        __extends(NodeCommand, _super);
        function NodeCommand(input) {
                _super.call(this);
            this.input = input;
        }
        NodeCommand.prototype.getOptions = function () {
            return "node" + (" " + this.input);
            ; ;
        };
        return NodeCommand;
    })(Command);
    compile.NodeCommand = NodeCommand;    
    var UglifyCommand = (function (_super) {
        __extends(UglifyCommand, _super);
        function UglifyCommand(input, output) {
                _super.call(this);
            this.input = input;
            this.output = output;
        }
        UglifyCommand.prototype.getOptions = function () {
            return "uglifyjs" + (this.output != null ? " -o " + this.output : "") + (" " + this.input);
        };
        return UglifyCommand;
    })(Command);
    compile.UglifyCommand = UglifyCommand;    
})(compile || (compile = {}));

var org;
(function (org) {
    (function (casalib) {
        
    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        
    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Timer = (function () {
                function Timer(delay, repeatCount) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof repeatCount === "undefined") { repeatCount = 0; }
                    this.timer = new com.opus.signals.Signal();
                    this.timerComplete = new com.opus.signals.Signal();
                    this.delay = delay;
                    this.repeatCount = repeatCount;
                    this.reset();
                }
                Timer.prototype.reset = function () {
                    this._currentCount = 0;
                    if(this._running == true) {
                        this.stop();
                    }
                };
                Timer.prototype.start = function () {
                    var _this = this;
                    if(this._running != true) {
                        this._running = true;
                        this.timerToken = setInterval(function () {
                            return _this.exe();
                        }, this.delay);
                    }
                };
                Timer.prototype.stop = function () {
                    clearInterval(this.timerToken);
                    this._running = false;
                };
                Object.defineProperty(Timer.prototype, "currentCount", {
                    get: function () {
                        return this._currentCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Timer.prototype, "running", {
                    get: function () {
                        return this._running;
                    },
                    enumerable: true,
                    configurable: true
                });
                Timer.prototype.exe = function () {
                    this._currentCount += 1;
                    this.timer.dispatch();
                    if(this._currentCount >= this.repeatCount) {
                        this.stop();
                        this.timerComplete.dispatch();
                    }
                };
                return Timer;
            })();
            time.Timer = Timer;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Interval = (function (_super) {
                __extends(Interval, _super);
                function Interval(delay, repeatCount, callBack, args) {
                    var _this = this;
                                _super.call(this, delay, repeatCount);
                    this.callBack = callBack;
                    this.args = args;
                    this.timer.add(function (x) {
                        return (_this._timerHandler());
                    });
                }
                Interval.setInterval = function setInterval(callBack, delay) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 2); _i++) {
                        args[_i] = arguments[_i + 2];
                    }
                    return new org.casalib.time.Interval(delay, 0, callBack, args);
                }
                Interval.setTimeout = function setTimeout(callBack, delay) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 2); _i++) {
                        args[_i] = arguments[_i + 2];
                    }
                    return new org.casalib.time.Interval(delay, 1, callBack, args);
                }
                Object.defineProperty(Interval.prototype, "callBack", {
                    get: function () {
                        return this._callBack;
                    },
                    set: function (cb) {
                        this._callBack = cb;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Interval.prototype, "args", {
                    get: function () {
                        return this._arguments;
                    },
                    set: function (args) {
                        this._arguments = args;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Interval.prototype, "destroyed", {
                    get: function () {
                        return this._isDestroyed;
                    },
                    enumerable: true,
                    configurable: true
                });
                Interval.prototype.destroy = function () {
                    this.reset();
                };
                Interval.prototype._timerHandler = function () {
                    this._callBack.apply(null, [
                        this._arguments
                    ]);
                };
                return Interval;
            })(org.casalib.time.Timer);
            time.Interval = Interval;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (process) {
            var Process = (function () {
                function Process() {
                    this.started = new com.opus.signals.Signal();
                    this.stopped = new com.opus.signals.Signal();
                    this.completed = new com.opus.signals.Signal();
                    this.priority = Process.NORM_PRIORITY;
                }
                Process.NORM_PRIORITY = 0;
                Process.prototype.start = function () {
                    this.running = true;
                    this._hasCompleted = false;
                    this.started.dispatch();
                };
                Process.prototype.stop = function () {
                    this.running = false;
                    this.stopped.dispatch();
                };
                Object.defineProperty(Process.prototype, "hasCompleted", {
                    get: function () {
                        return this._hasCompleted;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Process.prototype, "priority", {
                    get: function () {
                        return this._priority;
                    },
                    set: function (priority) {
                        this._priority = priority;
                    },
                    enumerable: true,
                    configurable: true
                });
                Process.prototype.destroy = function () {
                    if(this.running) {
                        this.stop();
                    }
                };
                Process.prototype.complete = function () {
                    this.running = false;
                    this._hasCompleted = true;
                    this.completed.dispatch();
                };
                return Process;
            })();
            process.Process = Process;            
        })(casalib.process || (casalib.process = {}));
        var process = casalib.process;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Sequence = (function (_super) {
                __extends(Sequence, _super);
                function Sequence(isLooping) {
                    if (typeof isLooping === "undefined") { isLooping = false; }
                    var _this = this;
                                _super.call(this);
                    this.looped = new com.opus.signals.Signal();
                    this.resumed = new com.opus.signals.Signal();
                    this.name = "Sequence1";
                    this.looping = isLooping;
                    this._sequence = [];
                    this._interval = org.casalib.time.Interval.setTimeout(function () {
                        return (_this._delayComplete());
                    }, 1);
                }
                Sequence.prototype.addTask = function (closure, delay, signal, position) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof signal === "undefined") { signal = null; }
                    if (typeof position === "undefined") { position = -1; }
                    this._sequence.splice((position == -1) ? this._sequence.length : position, 0, new org.casalib.time.Task(closure, delay, signal));
                };
                Sequence.prototype.removeTask = function (closure) {
                    var l = this._sequence.length;
                    while(l--) {
                        if(this._sequence[l].closure == closure) {
                            this._sequence[l] = null;
                            this._sequence.splice(l, 1);
                        }
                    }
                };
                Sequence.prototype.start = function () {
                    _super.prototype.start.call(this);
                    console.log("seq start");
                    this._removeCurrentListener();
                    this._currentTaskId = -1;
                    this._loops = 0;
                    this._interval.reset();
                    this._startDelay();
                    this.started.dispatch();
                };
                Sequence.prototype.stop = function () {
                    if(!this.running) {
                        return;
                    }
                    _super.prototype.stop.call(this);
                    this._interval.reset();
                    this.stopped.dispatch();
                };
                Sequence.prototype.resume = function () {
                    if(this.running) {
                        return;
                    }
                    if(this._currentTaskId == -1) {
                        this.start();
                        return;
                    }
                    _super.prototype.running = true;
                    if(this._hasDelayCompleted) {
                        this._startDelay();
                    } else {
                        this._interval.start();
                    }
                    this.resumed.dispatch();
                };
                Object.defineProperty(Sequence.prototype, "looping", {
                    get: function () {
                        return this._isLooping;
                    },
                    set: function (isLooping) {
                        this._isLooping = isLooping;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Sequence.prototype, "loops", {
                    get: function () {
                        return this._loops;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sequence.prototype.destroy = function () {
                    console.log("seq destroy");
                    this._removeCurrentListener();
                    this._interval.destroy();
                    this._sequence.splice(0);
                    _super.prototype.destroy.call(this);
                };
                Sequence.prototype._startDelay = function (e) {
                    if (typeof e === "undefined") { e = null; }
                    if(this._currentTaskId != -1) {
                        this._removeCurrentListener();
                    }
                    if(!this.running) {
                        return;
                    }
                    this._hasDelayCompleted = false;
                    if(++this._currentTaskId >= this._sequence.length) {
                        this._currentTaskId--;
                        this._removeCurrentListener();
                        this._currentTaskId = -1;
                        this._loops++;
                        if(this.looping) {
                            this._startDelay();
                            this.looped.dispatch();
                        } else {
                            this.complete();
                        }
                        return;
                    }
                    if(this._current.delay <= 0) {
                        this._delayComplete();
                    } else {
                        this._interval.reset();
                        this._interval.delay = this._current.delay;
                        this._interval.start();
                    }
                };
                Sequence.prototype._delayComplete = function () {
                    var _this = this;
                    this._hasDelayCompleted = true;
                    if(this._current.signal == null) {
                        this._current.closure();
                        this._startDelay();
                    } else {
                        this._current.signal.add(function () {
                            return (_this._startDelay());
                        });
                        this._current.closure();
                    }
                };
                Sequence.prototype._removeCurrentListener = function () {
                    if(this._currentTaskId == -1 || this._current == null) {
                        return;
                    }
                    if(this._current.signal != null) {
                        this._current.signal.remove(this._startDelay);
                    }
                };
                Object.defineProperty(Sequence.prototype, "_current", {
                    get: function () {
                        return this._sequence[this._currentTaskId];
                    },
                    enumerable: true,
                    configurable: true
                });
                return Sequence;
            })(org.casalib.process.Process);
            time.Sequence = Sequence;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var org;
(function (org) {
    (function (casalib) {
        (function (time) {
            var Task = (function () {
                function Task(closure, delay, signal) {
                    if (typeof delay === "undefined") { delay = 0; }
                    if (typeof signal === "undefined") { signal = null; }
                    this.closure = closure;
                    this.delay = delay;
                    this.signal = signal;
                }
                return Task;
            })();
            time.Task = Task;            
        })(casalib.time || (casalib.time = {}));
        var time = casalib.time;

    })(org.casalib || (org.casalib = {}));
    var casalib = org.casalib;

})(org || (org = {}));

var serverCompiler = new compile.TypeScriptCompileCommand("./HttpServer.ts");
serverCompiler.module = "node";
var appCompiler = new compile.TypeScriptCompileCommand("com/opus/app/App.ts", "../public/js/App.js");
appCompiler.target = "ES5";
var uglify = new compile.UglifyCommand("../public/js/App.js", "../public/js/App-min.js");
var runServer = new compile.NodeCommand("HttpServer.js");
var sequence = new org.casalib.time.Sequence();
sequence.addTask(function () {
    return (serverCompiler.exe());
}, 0, serverCompiler.executed);
sequence.addTask(function () {
    return (appCompiler.exe());
}, 0, appCompiler.executed);
sequence.addTask(function () {
    return (uglify.exe());
}, 0, uglify.executed);
sequence.addTask(function () {
    return (runServer.exe());
}, 0, runServer.executed);
sequence.start();
