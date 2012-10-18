///<reference path='./'/>
///<reference path='./com/opus/signals/signal.ts'/>

var require:any
var exec:any = require('child_process').exec;
var child:any = require('child_process').child;

module compile{
	export class Command {
		
		executed:com.opus.signals.Signal;

		constructor(){
			this.executed = new com.opus.signals.Signal();
		}

		getOptions():string{
			return "";
		}

		exe(){
			var options = this.getOptions();

			console.log('exe: ' + options);

			var child = exec(options);
			child.addListener("close", x => this.result());
		}

		result(){
			this.executed.dispatch();
		}
	}

	export class TypeScriptCompileCommand extends Command {
		module: string;
		declarations: bool;
		target: string;

		constructor(public input:string, public output:string = null){
			super();
		}
		
		getOptions(){
			return "tsc" 
				+ (this.declarations ? " --declarations" : "")
				+ (this.module != null ? " --module " + this.module : "")
				+ (this.output != null ? " --out " + this.output : "")
				+ (this.target != null ? " --target " + this.target : "")
				+ (" " + this.input)
			;
		}
	}

	export class NodeCommand extends Command {
		constructor(public input:string){
			super();
		}
		
		getOptions(){
			return "node"
				+ (" " + this.input);
			;
		}
	}

	export class UglifyCommand extends Command {
		constructor(public input:string, public output:string){
			super();
		}
		
		getOptions(){
			return "uglifyjs"
				+ (this.output != null ? " -o " + this.output : "")
				+ (" " + this.input)
			;
		}
	}
}