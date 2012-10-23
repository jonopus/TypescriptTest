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

///<reference path='../core/IDestroyable.ts'/>
///<reference path='../control/IRunnable.ts'/>
///<reference path='./Timer.ts'/>

module org.casalib.time {
	
	/**
		To be used instead of <code>flash.utils.setInterval</code> and <code>flash.utils.setTimeout</code> functions.
		
		Advantages over <code>setInterval</code>/<code>setTimeout</code>:
		<ul>
			<li>Ability to stop and start intervals without redefining.</li>
			<li>Change the time (<code>delay</code>), {@link Interval#callBack call back} and {@link Interval#arguments arguments} without redefining.</li>
			<li>Included <code>repeatCount</code> for intervals that only need to fire finitely.</li>
			<li>{@link Interval#setInterval} and {@link Interval#setTimeout} return an object instead of interval id for better OOP structure.</li>
			<li>Built in events/event dispatcher.</li>
		</ul>
		
		@author Aaron Clinger
		@author Mike Creighton
		@version 02/11/10
		@example
			<code>
				package {
					import org.casalib.display.CasaMovieClip;
					import org.casalib.time.Interval;
					
					
					public class MyExample extends CasaMovieClip {
						protected var _interval:Interval;
						
						
						MyExample() {
							super();
							
							this._interval = Interval.setInterval(this._repeatingFunction, 1000, "CASA");
							this._interval.repeatCount = 3;
							this._interval.start();
						}
						
						protected function _repeatingFunction(name:String):void {
							trace(name);
						}
					}
				}
			</code>
	*/

	//org.casalib.core.IDestroyable,
	export class Interval extends org.casalib.time.Timer implements org.casalib.control.IRunnable {
		private _callBack:()=>any;
		private _arguments:any[];
		private _isDestroyed:bool;
		//private _listenerManager:ListenerManager;
		
		
		/**
			Runs a function at a specified periodic interval.
			
			@param callBack: The function to execute after specified delay.
			@param delay: The time in milliseconds between calls.
			@param arguments: The arguments to be passed to the call back function when executed.
			@return: An {@link Interval} reference.
		*/
		static setInterval(callBack:()=>any, delay:number, ...args:any[]):org.casalib.time.Interval {
			return new org.casalib.time.Interval(delay, 0, callBack, args);
		}
		
		/**
			Runs a function at a specified periodic interval. Acts identically like {@link Interval#setInterval} except <code>setTimeout</code> defaults <code>repeatCount</code> to <code>1</code>.
			
			@param callBack: The function to execute after specified delay.
			@param delay: The time in milliseconds between calls.
			@param arguments: The arguments to be passed to the call back function when executed.
			@return: An {@link Interval} reference.
		*/
		static setTimeout(callBack:()=>any, delay:number, ...args:any[]):org.casalib.time.Interval {
			return new org.casalib.time.Interval(delay, 1, callBack, args);
		}
		
		/**
			@exclude
		*/
		constructor(delay:number, repeatCount:number, callBack:()=>any, args:any[]) {
			super(delay, repeatCount);
			
			this.callBack         = callBack;
			this.args        = args;

			this.timer.add(x => (this._timerHandler()))
		}
		
		/**
			The function to execute after specified delay.
		*/
		get callBack():()=>any {
			return this._callBack;
		}
		
		set callBack(cb:()=>any) {
			this._callBack = cb;
		}
		
		/**
			The arguments to be passed to the call back function when executed.
		*/
		get args():any[] {
			return this._arguments;
		}
		
		set args(args:any[]) {
			this._arguments = args;
		}
		
		get destroyed():Boolean {
			return this._isDestroyed;
		}
		
		destroy() {
			this.reset();
		}
		
		private _timerHandler() {
			this._callBack.apply(null, [this._arguments]);
		}
	}
}