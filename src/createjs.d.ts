declare module createjs {



    export class DisplayObject{
    	
    }
    export class Container extends createjs.DisplayObject{
		alpha:number;
		//cacheCanvas:HTMLCanvasElement;
		cacheID:number;
		compositeOperation:string;
		//filters:createjs.Filter[];
		hitArea:createjs.DisplayObject;
		id:number;
		mask:Shape;
		mouseEnabled:bool;
		name:string;
		parent:createjs.DisplayObject;
		regX:number;
		regY:number;
		rotation:number;
		scaleX:number;
		scaleY:number;
		//shadow:createjs.Shadow;
		skewX:number;
		skewY:number;
		snapToPixel:bool;
		suppressCrossDomainErrors:bool;
		visible:bool;
		x:number;
		y:number;
    }

    export class Stage extends createjs.Container{

    }
    
    export class Shape extends createjs.DisplayObject{
		alpha:number;
		//cacheCanvas:HTMLCanvasElement;
		cacheID:number;
		compositeOperation:string;
		//filters:createjs.Filter[];
		hitArea:createjs.DisplayObject;
		id:number;
		mask:Shape;
		mouseEnabled:bool;
		name:string;
		parent:createjs.DisplayObject;
		regX:number;
		regY:number;
		rotation:number;
		scaleX:number;
		scaleY:number;
		//shadow:createjs.Shadow;
		skewX:number;
		skewY:number;
		snapToPixel:bool;
		suppressCrossDomainErrors:bool;
		visible:bool;
		x:number;
		y:number;
    	graphics:createjs.Graphics;
    	clone(p: bool);
    	draw(ctx:any, ignoreCache:bool);
		ignoreCache:bool;
		isVisible:bool;
		toString:string;
    }
    
    export class Graphics {
    	BASE_64;
		STROKE_CAPS_MAP:string[];
		STROKE_JOINTS_MAP:string[];
		
		arc(x:number,y:number, radius:number, startAngle:number, endAngle:number, anticlockwise:bool ):createjs.Graphics;
		arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):createjs.Graphics;
		beginBitmapFill(image:any, repetition:string ):createjs.Graphics;
		beginBitmapStroke(image:any, repetition:string ):createjs.Graphics;
		beginFill(color:string):createjs.Graphics;
		beginLinearGradientFill(colors:string[], ratios:string[], x0:number, y0:number, x1:number, y1:number):createjs.Graphics;
		beginLinearGradientStroke(colors:any, ratios:any, x0:any, y0:any, x1:any, y1:any):createjs.Graphics;
		beginRadialGradientFill(colors:string[], ratios:number[], x0:number, y0:number, r0:number, x1:number, y1:number, r1:number):createjs.Graphics;
		beginRadialGradientStroke(colors:any, ratios:any, x0:any, y0:any, r0:any, x1:any, y1:any, r1:any,):createjs.Graphics;
		beginStroke(color:any):createjs.Graphics;
		bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):createjs.Graphics;
		clear():createjs.Graphics;
		clone():createjs.Graphics;
		closePath():createjs.Graphics;
		decodePath(str:string):createjs.Graphics;
		draw(ctx:CanvasRenderingContext2D);
		drawAsPath(ctx:CanvasRenderingContext2D);
		drawCircle(x:number, y:number, radius:number):createjs.Graphics;
		drawEllipse(x:number, y:number, w:number, h:number):createjs.Graphics;
		drawPolyStar(x:number, y:number, radius:number, sides:number, pointSize:number, angle:number):createjs.Graphics;
		drawRoundRect(x:number, y:number, w:number, h:number, radius:number):createjs.Graphics;
		drawRoundRectComplex(x:number, y:number, w:number, h:number, radiusTL:number, radiusTR:number, radiusBR:number, radiusBL:number):createjs.Graphics;
		endFill():createjs.Graphics;
		endStroke():createjs.Graphics;
		static getHSL(hue:number, saturation:number, lightness:number, alpha:number);
		static getRGB(r:number, g:number, b:number, alpha:number);
		lineTo(x:number, y:number):createjs.Graphics;
		moveTo(x:number, y:number):createjs.Graphics;
		quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):createjs.Graphics;
		rect(x:number, y:number, w:number, h:number):createjs.Graphics;
		setStrokeStyle(thickness:any, caps:any, joints:any, miter:any):createjs.Graphics;
		toString():string;

		mt:any;
		lt:any;
		at:any;
		bt:any;
		qt:any;
		a:any;
		r:any;
		cp:any;
		c:any;
		f:any;
		lf:any;
		rf:any;
		bf:any;
		ef:any;
		ss:any;
		s:any;
		ls:any;
		rs:any;
		bs:any;
		es:any;
		dr:any;
		rr:any;
		rc:any;
		dc:any;
		de:any;
		dp:any;
		p:any;
    }
    
    export class Ticker {

    }
    
    export class Tween {

    }
    
    export class Ease {

    }
    
    export class AbstractLoader {

    }
    
    export class PreloadJS extends createjs.AbstractLoader {

    }
/*
    

    export interface Stage {
        addListener(event: string, listener: Function);
        on(event: string, listener: Function): any;
        once(event: string, listener: Function): void;
        removeListener(event: string, listener: Function): void;
        removeAllListener(event: string): void;
        setMaxListeners(n: number): void;
        listeners(event: string): { Function; }[];
        emit(event: string, arg1?: any, arg2?: any): void;
    }

    export var EventEmitter: NodeEventEmitter;*/
}