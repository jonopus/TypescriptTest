///<reference path='./'/>

module com.opus.signals {
    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    export class Signal{
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        _bindings = [];
        _prevParams = null;

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION:string = '::VERSION_NUMBER::';

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize:bool = false;

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate:bool = true;

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active:bool = true;

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener(listener, isOnce = null, listenerContext = null, priority = null) {

            var prevIndex = this._indexOfListener(listener, listenerContext);
            var binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        }

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding(binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        }

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener(listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        }

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has(listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        }

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add(listener, listenerContext = null, priority = null) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        }

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce(listener, listenerContext = null, priority = null) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        }

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove(listener, context = null) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        }

        /**
         * Remove all listeners from the Signal.
         */
        removeAll() {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        }

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners() {
            return this._bindings.length;
        }

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt() {
            this._shouldPropagate = false;
        }

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch(params = null) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        }

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget(){
            this._prevParams = null;
        }

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose() {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        }

        /**
         * @return {string} String representation of the object.
         */
        toString() {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }
    }

    export class SignalBinding{

    	constructor(signal, listener, isOnce, listenerContext, priority){
    		this._listener = listener;
	        this._isOnce = isOnce;
	        this.context = listenerContext;
	        this._signal = signal;
	        this._priority = priority || 0;
    	}

		/**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        _listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        _isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        context;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        _signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        _priority;
    

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active:bool = true;

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params = null;

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute(paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        }

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach() {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        }

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound() {
            return (!!this._signal && !!this._listener);
        }

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener() {
            return this._listener;
        }

        /**
         * Delete instance properties
         * @private
         */
        _destroy() {
            delete this._signal;
            delete this._listener;
            delete this.context;
        }

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce() {
            return this._isOnce;
        }

        /**
         * @return {string} String representation of the object.
         */
        toString() {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }
    }
}