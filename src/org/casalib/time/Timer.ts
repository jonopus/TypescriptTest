///<reference path='../../../com/opus/signals/signal.ts'/>
///<reference path='../core/IDestroyable.ts'/>
///<reference path='../control/IRunnable.ts'/>

module org.casalib.time {
	//org.casalib.core.IDestroyable,
	export class Timer implements org.casalib.control.IRunnable{
		private _currentCount : number;
		private _running : bool;
		delay : number;
		repeatCount : number;
		timerToken:number;

		timer:com.opus.signals.Signal = new com.opus.signals.Signal();
		timerComplete:com.opus.signals.Signal = new com.opus.signals.Signal();

		constructor (delay:number = 0, repeatCount:number = 0){
			this.delay = delay;
			this.repeatCount = repeatCount;
			this.reset();
		}

		reset(){
			this._currentCount = 0;
			if(this._running == true){
				this.stop();
			}
		}

		start(){
			if(this._running != true){
				this._running = true;
				this.timerToken = setInterval(() => this.exe(), this.delay);
			}
		}

		stop(){
			clearInterval(this.timerToken);
			this._running = false;
		}
		
		get currentCount(){
			return this._currentCount;
		}
		
		get running(){
			return this._running;
		}

		exe(){
			this._currentCount += 1;
			this.timer.dispatch();
			
			if(this._currentCount >= this.repeatCount){
				this.stop();
				this.timerComplete.dispatch();
			}
		};
	}
}