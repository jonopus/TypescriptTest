///<reference path='../../../../../../lib/org/puremvc/typescript/patterns/facade/Facade.ts'/>
///<reference path='controller/StartupCommand.ts'/>

module opus {
   export class ApplicationFacade extends puremvc.Facade{
		public static APPLICATION_KEY:string = "opus.ApplicationFacade";
		public static STARTUP:string = "opus.ApplicationFacade.startup";
		public static SHUTDOWN:string = "opus.ApplicationFacade.shutdown";
        
		public initialized:bool;

        constructor(){
        	super();    
		}

		public static getInstance(){
			if(this.instance == null){
				this.instance = new opus.ApplicationFacade();
			}

			return this.instance;
		}
		
		public startup():void {
			if (!this.initialized){
				this.initialized = true;
				this.registerCommand(opus.ApplicationFacade.STARTUP, opus.StartupCommand);
				this.sendNotification(opus.ApplicationFacade.STARTUP );
			}
		}

		public shutdown():void {
			this.sendNotification(opus.ApplicationFacade.SHUTDOWN);
		}
    }
}