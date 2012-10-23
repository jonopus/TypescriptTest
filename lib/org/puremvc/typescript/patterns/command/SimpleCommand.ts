/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

//Objs("puremvc.Notifier");
//Objs("puremvc.ICommand);
//Objs("puremvc.INotifier);

module puremvc
{
	"use strict";

	/**
	 * A base <code>ICommand</code> implementation.
	 * 
	 * Your subclass should override the <code>execute</code> method where your business logic will
	 * handle the <code>INotification</code>.
	 */
	export class SimpleCommand
		extends Notifier
		implements ICommand, INotifier
	{
		/**
		 * Fulfill the use-case initiated by the given <code>INotification</code>.
		 * 
		 * In the Command Pattern, an application use-case typically begins with some user action,
		 * which results in an <code>INotification</code> being broadcast, which is handled by
		 * business logic in the <code>execute</code> method of an <code>ICommand</code>.
		 * 
		 * @param notification
		 * 		The <code>INotification</code> to handle.
		 */
		public execute( notification:INotification ):void
		{

		}
	}
}