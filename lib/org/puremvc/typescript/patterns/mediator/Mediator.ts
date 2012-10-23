/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";

	/**
	 * A base <code>IMediator</code> implementation. 
	 * 
	 * Typically, a <code>Mediator</code> will be written to serve one specific control or group
	 * controls and so, will not have a need to be dynamically named.
	 */
	export class Mediator
		extends Notifier
		implements IMediator, INotifier
	{
		/**
		 * The name of the <code>Mediator</code>.
		 *
		 * @protected
		 */
		private mediatorName:string;

		/**
		 * The <code>Mediator</code>'s view component.
		 *
		 * @protected
		 */
		private viewComponent:Object;

		/**
		 * Constructs a <code>Mediator</code> instance.
		 *
		 * @param mediatorName
		 * 		The name of the <code>Mediator</code>.
		 *
		 * @param viewComponent
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		constructor( mediatorName:string=null, viewComponent:Object=null )
		{
			super();

			this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
			this.viewComponent = viewComponent;	
		}

		/**
		 * Get the <code>Mediator</code> instance name.
		 *
		 * @return
		 * 		The <code>Mediator</code> instance name
		 */		
		public getMediatorName():string
		{	
			return this.mediatorName;
		}

		/**
		 * Get the <code>Mediator</code>'s view component.
		 *
		 * Additionally, an implicit getter will usually be defined in the subclass that casts the
		 * view object to a type, like this:
		 * 
		 * <code>
		 *		public getMenu():Menu
		 *		{
		 *			return <Menu> this.viewComponent;
		 *		}
		 * </code>
		 * 
		 * @return
		 * 		The <code>Mediator</code>'s view component.
		 */
		public getViewComponent():Object
		{	
			return this.viewComponent;
		}

		/**
		 * Set the <code>IMediator</code>'s view component.
		 * 
		 * @param viewComponent
		 * 		The default view component to set for this <code>Mediator</code>.
		 */
		public setViewComponent( viewComponent:Object ):void
		{
			this.viewComponent = viewComponent;
		}

		/**
		 * List the <code>INotification</code> names this <code>IMediator</code> is interested in
		 * being notified of.
		 *
		 * @return
		 * 		The list of notifications names in which is interested the <code>Mediator</code>.
		 */
		public listNotificationInterests():string[]
		{
			return new string[];
		}

		/**
		 * Handle <code>INotification</code>s.
		 * 
		 *
		 * Typically this will be handled in a switch statement, with one 'case' entry per
		 * <code>INotification</code> the <code>Mediator</code> is interested in.
		 *
		 * @param note
		 * 		The notification instance to be handled.
		 */ 
		public handleNotification( notification:INotification ):void
		{

		}

		/**
		 * Called by the View when the Mediator is registered. This method has to be overridden
		 * by the subclass to know when the instance is registered.
		 */ 
		public onRegister():void
		{

		}

		/**
		 * Called by the View when the Mediator is removed. This method has to be overridden
		 * by the subclass to know when the instance is removed.
		 */ 
		public onRemove():void
		{

		}

		/**
		 * Default name of the <code>Mediator</code>.
		 *
		 * @constant
		 */
		public static NAME:string = 'Mediator';
	}
}