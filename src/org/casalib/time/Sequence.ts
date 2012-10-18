/*
	CASA Lib for ActionScript 3.0
	Copyright (c) 2011, Aaron Clinger & Contributors of CASA Lib
	All rights reserved.
	
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	
	- Redistributions of source code must retain the above copyright notice,
	  this list of conditions and the following disclaimer.
	
	- Redistributions in binary form must reproduce the above copyright notice,
	  this list of conditions and the following disclaimer in the documentation
	  and/or other materials provided with the distribution.
	
	- Neither the name of the CASA Lib nor the names of its contributors
	  may be used to endorse or promote products derived from this software
	  without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	POSSIBILITY OF SUCH DAMAGE.
*/
///<reference path='../signals/signal.ts'/>
///<reference path='../control/IResumable.ts'/>
///<reference path='./Interval.ts'/>
///<reference path='../process/Process.ts'/>

module org.casalib.time {
	export class Sequence extends org.casalib.process.Process implements org.casalib.control.IResumable {

		looped:com.opus.signals.Signal = new com.opus.signals.Signal();
		resumed:com.opus.signals.Signal = new com.opus.signals.Signal();

		private _isLooping:bool;
		private _hasDelayCompleted:bool;
		private _sequence:org.casalib.time.Task[];
		private _interval:org.casalib.time.Interval;
		private _currentTaskId:number;
		private _loops:number;
		name:string = "Sequence1";
		
		
		/**
			Creates a new Sequence.
			
			@param isLooping: Indicates if the Sequence repeats once completed <code>true</code>; or stops <code>false</code>.
		*/
		constructor(isLooping:bool = false) {
			super();

			this.looping   = isLooping;
			this._sequence = [];
			this._interval = org.casalib.time.Interval.setTimeout(()=>(this._delayComplete()), 1);
		}
		
		/**
			Adds a method to be called to the Sequence.
			
			@param closure: The to execute.
			@param delay: The time in milliseconds before the method will be called.
			@param scope: The event dispatcher scope in which to listen for the complete event.
			@param completeEventName: The name of the event the class waits to receive before continuing.
			@param position: Specifies the index of the insertion in the sequence order; defaults to the next position.
		*/
		addTask(closure:()=>any, delay:number = 0, signal:com.opus.signals.Signal = null, position:number = -1):void {
			this._sequence.splice((position == -1) ? this._sequence.length : position, 0, new org.casalib.time.Task(closure, delay, signal));
		}
		
		/**
			Removes a method from being called by the Sequence.
			
			@param closure: The to remove from execution.
		*/
		removeTask(closure:()=>any) {
			var l:number = this._sequence.length;
			
			while (l--) {
				if (this._sequence[l].closure == closure) {
					this._sequence[l] = null;
					this._sequence.splice(l, 1);
				}
			}
		}

		/**
			Starts the Sequence from the beginning.
			
			@sends SequenceEvent#START - Dispatched when Sequence starts.
		*/
		start() {
			super.start();
			
			console.log("seq start");
			this._removeCurrentListener();
			
			this._currentTaskId = -1;
			this._loops         = 0;
			
			this._interval.reset();
			this._startDelay();
			
			this.started.dispatch();
		}
		
		/**
			Stops the Sequence at its current position.
			
			@sends SequenceEvent#STOP - Dispatched when Sequence stops.
		*/
		stop() {
			if (!this.running)
				return;
			
			super.stop();
			
			this._interval.reset();
			
			this.stopped.dispatch();
		}
		
		/**
			Resumes sequence from {@link #stop stopped} position.
			
			@sends SequenceEvent#RESUME - Dispatched when Sequence is resumed.
		*/
		resume() {
			if (this.running){
				return;
			}

			if (this._currentTaskId == -1) {
				this.start();
				return;
			}
			
			super.running = true;
			
			if (this._hasDelayCompleted){
				this._startDelay();
			}else{
				this._interval.start();
			}

			this.resumed.dispatch();
		}
		
		/**
			Indicates if the Sequence repeats once completed <code>true</code>; or stops <code>false</code>.
		*/
		get looping():bool {
			return this._isLooping;
		}
		
		set looping(isLooping:bool) {
			this._isLooping = isLooping;
		}
		
		/**
			The number of times the sequence has run since it {@link #start started}.
		*/
		get loops():number {
			return this._loops;
		}
		
		destroy():void {
			
			console.log("seq destroy");
			this._removeCurrentListener();
			this._interval.destroy();
			this._sequence.splice(0);
			
			super.destroy();
		}
		
		/**
			@sends SequenceEvent#LOOP - Dispatched when Sequence is completed and is looping.
			@sends SequenceEvent#COMPLETE - Dispatched when Sequence has completed.
		*/
		private _startDelay(e:Event = null):void {
			if (this._currentTaskId != -1){
			
				this._removeCurrentListener();
			}
			
			if (!this.running)
				return;
			
			this._hasDelayCompleted = false;
			
			if (++this._currentTaskId >= this._sequence.length) {
				this._currentTaskId--;
				
			
				this._removeCurrentListener();
				
				this._currentTaskId = -1;
				this._loops++;
				
				if (this.looping) {
					this._startDelay();
					
					this.looped.dispatch();
				} else {
					this.complete();
				}
				
				return;
			}
			
			if (this._current.delay <= 0)
				this._delayComplete();
			else {
				this._interval.reset();
				this._interval.delay = this._current.delay;
				this._interval.start();
			}
		}
		
		private _delayComplete():void {
			this._hasDelayCompleted = true;
			
			if (this._current.signal == null) {
				this._current.closure();
				this._startDelay();
			} else {
				this._current.signal.add(()=>(this._startDelay()));
				this._current.closure();
			}
		}
		
		private _removeCurrentListener():void {
			if (this._currentTaskId == -1 || this._current == null){
				return;
			}

			if (this._current.signal != null){
				this._current.signal.remove(this._startDelay);
			}
			
		}
		
		private get _current():org.casalib.time.Task {
			return this._sequence[this._currentTaskId];
		}
	}
}

module org.casalib.time {
	export class Task {
		closure:()=>any;
		delay:number;
		signal:com.opus.signals.Signal;
		
		
		constructor(closure:()=>any, delay:number = 0, signal:com.opus.signals.Signal = null) {
			this.closure           = closure;
			this.delay             = delay;
			this.signal            = signal;
		}
	}
}