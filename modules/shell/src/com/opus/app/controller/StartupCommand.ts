///<reference path='../../../../../../../lib/org/puremvc/typescript/patterns/facade/Facade.ts'/>
///<reference path='../../../../../../../lib/org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../../../lib/org/puremvc/typescript/patterns/command/MacroCommand.ts'/>

module opus {
   export class StartupCommand extends puremvc.MacroCommand{
		public execute(notification:puremvc.INotification):void{
			console.log("StartupCommand");
		}
    }
}