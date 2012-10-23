/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
module puremvc
{
	"use strict";
	
	/**
	 * A base <code>IProxy</code> implementation. 
	 *
	 * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
	 * <UL>
	 * <LI>Implement a common method which returns the name of the Proxy.
	 * <LI>Provide methods for setting and getting the data object.
	 *
	 * Additionally, <code>IProxy</code>s typically:
	 * <UL>
	 * <LI>Maintain references to one or more pieces of model data.
	 * <LI>Provide methods for manipulating that data.
	 * <LI>Generate <code>INotifications</code> when their model data changes.
	 * <LI>Expose their name as a <code>public static const</code> called <code>NAME</code>, if they are not instantiated multiple times.
	 * <LI>Encapsulate interaction with local or remote services used to fetch and persist model data.
	 *
	 */
	export class Proxy
		extends Notifier
		implements IProxy, INotifier
	{
		/**
		 * The data object controlled by the <code>Proxy</code>.
		 *
		 * @protected
		 */
		private proxyName:string;

		/**
		 * The name of the <code>Proxy</code>.
		 *
		 * @protected
		 */
		private data:Object;

		/**
		 *
		 * Constructs a <code>Proxy</code> instance.
		 *
		 * @param {String} proxyName
		 * 		The name of the <code>Proxy</code> instance.
		 *
		 * @param {Object} data
		 * 		An initial data object to be held by the <code>Proxy</code>.
		 */
		constructor( proxyName:string=null, data:Object=null )
		{
			super();

			this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;

			if( data != null )
				this.setData(data);
		}

		/**
		 * Get the name of the <code>Proxy></code> instance.
		 *
		 * @return
		 * 		The name of the <code>Proxy></code> instance.
		 */
		public getProxyName():string
		{
			return this.proxyName;
		}		

		/**
		 * Set the data of the <code>Proxy></code> instance.
		 *
		 * @param data
		 * 		The data to set for the <code>Proxy></code> instance.
		 */
		public setData( data:Object ):void
		{
			this.data = data;
		}

		/**
		 * Get the data of the <code>Proxy></code> instance.
		 *
		 * @return
		 * 		The data held in the <code>Proxy</code> instance.
		 */
		public getData():Object
		{
			return this.data;
		}

		/**
		 * Called by the Model when the <code>Proxy</code> is registered. This method has to be
		 * overridden by the subclass to know when the instance is registered.
		 */
		public onRegister():void
		{

		}

		/**
		 * Called by the Model when the <code>Proxy</code> is removed. This method has to be
		 * overridden by the subclass to know when the instance is removed.
		 */
		public onRemove():void
		{

		}

		/**
		 * The default name of the <code>Proxy</code>
		 * 
		 * @type {String}
		 * @constant
		 */
		 public static NAME:string = 'Proxy';
	}
}