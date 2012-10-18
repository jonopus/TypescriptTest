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

///<reference path='../control/IRunnable.ts'/>
///<reference path='../../../com/opus/signals/signal.ts'/>

module org.casalib.process {
	/**
		Base process class. Process is not designed to be used on its own and needs to be extended to function.
		
		@author Aaron Clinger
		@version 02/11/10
	*/
	export class Process implements org.casalib.control.IRunnable {
		static NORM_PRIORITY:number = 0; /**< The default priority for all Process instances. */
		
		started:com.opus.signals.Signal = new com.opus.signals.Signal();
		stopped:com.opus.signals.Signal = new com.opus.signals.Signal();
		completed:com.opus.signals.Signal = new com.opus.signals.Signal();


		private _priority:number;
		private _hasCompleted:bool;
		running:bool;
		
		
		/**
			Creates a new Process.
		*/
		constructor() {
			this.priority = Process.NORM_PRIORITY;
		}
		
		/**
			@sends ProcessEvent#START - Dispatched when process starts.
		*/
		start() {
			this.running    = true;
			this._hasCompleted = false;
			
			this.started.dispatch();
		}
		
		/**
			@sends ProcessEvent#STOP - Dispatched when process is stopped.
		*/
		stop() {
			this.running = false;
			
			this.stopped.dispatch();
		}
		
		/**
			Determines if the process has completed <code>true</code>, or if it hasn't <code>false</code>.
		*/
		get hasCompleted():bool {
			return this._hasCompleted;
		}
		
		/**
			The priority relative to other processes. The higher priority processes will take precedence over lower priority processes in a {@link ProcessGroup}.
		*/
		get priority():number {
			return this._priority;
		}
		
		set priority(priority:number) {
			this._priority = priority;
		}
		
		destroy() {
			if (this.running){
				this.stop();
			}
		}
		
		/**
			@sends ProcessEvent#COMPLETE - Dispatched when process completes.
		*/
		complete() {
			this.running    = false;
			this._hasCompleted = true;
			
			this.completed.dispatch();
		}
	}
}