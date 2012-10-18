///<reference path="../../../jquery.d.ts" />
///<reference path="../../../createjs.d.ts" />
///<reference path='./'/>
///<reference path='../signals/Signal.ts'/>
///<reference path='./constants/Constants.ts'/>
///<reference path='../../../org/casalib/time/Sequence.ts'/>
///<reference path='../../millermedeiros/hasher/Hasher.ts'/>


module com.opus.app {
   export class App{
        name:string = "App - instance";
        
        startedup:com.opus.signals.Signal = new com.opus.signals.Signal();
        preloadComplete:com.opus.signals.Signal = new com.opus.signals.Signal();
        
        sequence:org.casalib.time.Sequence;
        hasher:hasher.Hasher;

        preload:createjs.PreloadJS;
        
        stage:createjs.Stage;
        bgImage:createjs.Container;
        ball:createjs.Shape;
        logo:createjs.Container;
        

        constructor(){
            this.hasher = new hasher.Hasher();
            console.log("this.hasher ", this.hasher);
            console.log("createjs ", createjs);
            console.log("DisplayObject ", createjs.DisplayObject);

            this.bgImage = new createjs.Container();
            this.bgImage.alpha = 0;

            this.ball = new createjs.Shape();
            this.ball.name = "ball";
            this.ball.graphics.setStrokeStyle(5, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.beginFill("#FF0000").drawCircle(0,0,50);
            this.ball.graphics.endStroke();
            this.ball.graphics.endFill();
            this.ball.graphics.setStrokeStyle(1, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.moveTo(0,0);
            this.ball.graphics.lineTo(0,50);
            this.ball.graphics.endStroke();
            this.ball.x = 200;
            this.ball.y = 50;
            this.ball.alpha = 0;

            this.logo = new createjs.Container();
            this.logo.alpha = 0;

            // top
            var shape = new createjs.Shape();
            shape.graphics.lf(["#1a3957","#174771","#266281","#387d99","#7ba8b5","#7ba8b5","#47889f","#28607f","#174972","#193957"],[0,0.098,0.2,0.298,0.408,0.6,0.698,0.8,0.898,1],-97.7,-19.8,103.5,2.2).p("ASggVQAbAbAAAmQAAAmgbAbQgbAbgmAAQgVAAgOAPQgOAOAAAVQAAAUAOAPQAOAPAVAAQBPAAA4g4QA4g4AAhPQAAhOg4g4Qg4g4hPAAQg4AAguAeQgGgNgMgIQgMgIgPAAQgUAAgPAPQgOAOAAAVIAACOQAAAmgbAbQgbAbgmAAQgmAAgbgbQgbgbAAgmIAAk/IArApQAcAcAdgdQAdgdgdgcIh6h0QgNgLgQgBQgRAAgMAMIh1BzQgcAcAdAdQAdAdAcgcIAngmIAAE9QAABPA4A4QA4A4BOAAQA0AAAugbIAACeQAAAUAOAPQAPAPAUAAQAVAAAOgPQAPgPAAgUIAAlEQAAgmAbgbQAbgbAmAAQAmAAAbAb").lf(["#1e405f","#184672","#226591","#387d99","#8ec1ce","#8ec1ce","#47889f","#397ea2","#174972","#193957"],[0,0.098,0.2,0.298,0.408,0.6,0.698,0.8,0.898,1],-99.6,-4.5,101.7,17.6).p("AEMhaQg4A4AABPQAAAxAXArIgDAAQgmAAgbgbQgbgbAAgmIAAjZQAAgVgOgOQgOgOgVAAQgVAAgOAOQgOAOAAAVIAACpQgQg+gzgoQg0gphCAAQgUAAgPAPQgPAPAAAUQAAAUAPAPQAPAOAUAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgbgbQgbgbAAgmIAAjZQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAOAAAVIAABTQgbgbgigPQgkgPgnAAQgVAAgOAPQgPAPAAAUQAAAUAPAPQAOAOAVAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAjZQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAOAAAVIAABFIgAAFIAACOQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAiOQAAgUgPgPQgPgOgUAAQgUAAgPAOQgPAPAAAUIAABFQgWg1gwggQgwghg7AAQgUAAgPAPQgPAPAAAUQAAAUAPAPQAOAOAVAAQAmAAAbAbQAbAbAAAmQAAAmgbAbQgbAbgmAAQgmAAgagbQgbgbAAgmIAAjZQAAgVgPgOQgPgOgUAAQgUAAgOAOQgPAOAAAVIAADZQAABPA4A4QA4A4BPAAQBBAAAzgoQAygnARg8QASA8AyAnQAzAoBAAAQAqAAAmgRQAjgRAbgdQAbAdAkARQAmARApAAQAzAAAsgZQArgZAZgrQAZArArAZQAsAZAzAAQBGAAA1gtQA1gtAMhEQAMBEA1AtQA1AtBGAAIE6AAQAUAAAPgPQAOgPAAgUQAAgUgOgPQgPgPgUAAIiQAAQgmAAgbgbQgbgbAAgmQAAgmAbgbQAbgbAmAAQAYAAAVALQAUAMANATIhHAAQgUAAgPAPQgOAOAAAVQAAAUAOAPQAPAOAUAAICHAAQAUAAAPgOQAOgPAAgUQAAhPg4g4Qg4g4hPAAQhOAAg4A4").f();
            shape.setTransform(136.1,46.9);
            this.logo.addChild(shape);

            // stroke
            var shape_1 = new createjs.Shape();
            shape_1.graphics.lf(["#3987a1","#f7fbfc","#43a0b6"],[0.18,0.565,1],-135.8,0,135.9,0).p("ARfjEQgwAAgrASQgZgQgeAAQgpAAgdAdQgdAdAAApIAACOQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAjcQAKADALAAQAcAAAYgQQAYgRAKgaQAKgZgFgaQgGgagUgTIh6h0QgbgaglAAQgmAAgaAaIh1B0QgTATgGAaQgFAaAKAZQALAaAXAQQAXAQAcAAQAJAAAIgCIAABFQgIgKgJgJQhHhHhjAAQhEAAg6AkQg4AjgfA6IAAhpQAAgpgdgdQgdgdgpAAQgpAAgdAdQgdAdAAApIAAASQg9gqhKAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgnAAgdAbQgcAagDAnQgqgQgtAAQgXAAgUAKQgFgkgcgYQgcgZglAAQgpAAgdAdQgdAdAAApIgADZQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAiOQAAgpgdgdQgdgdgpAAQgaAAgXANQgWANgNAWIgHgEQg8gqhLAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgpAAgdAdQgdAdAAApIAADZQAABjBHBHQBGBGBjAAQBSAABAgyQAVgPARgUQASAUATAPQBCAyBQAAQBOAAA/gvQBAAvBOAAQA/AAA5ghQAYgOATgSQASARAaAPQA4AhA/AAQBYAABDg5QASgPAPgTQANASAUAQQAhAcAoAPQAoAPArAAIE6AAQApAAAdgdQAZgZADghQAHAIAIAIQBGBHBjAAQAWAAAagFIAABWQAAApAdAdQAdAdApAAQApAAAdgdQAdgdAAgpIAAhdQATAJAXAAQBjAABGhGQBHhGAAhjQAAhkhHhGQhGhGhjAA").p("ARfABQASAAANANQANANAAASQAAASgNANQgNANgSAAQgWAAgVAJIAAg0QAAgSANgNQANgNASAA").p("ALflCQgJABgGADQgOAGgIANQgIANAAAPQgAgOgIgMQgIgNgOgFQgJgEgHgAIAugtIAtAr").p("AQThLQgeATgRAfQgSAgAAAkIABFEIgBAAIAAieQAAgNgHgMQgHgLgMgHQgMgHgNAAQgMAAgMAHQAggTASgfQATghAAgmIAAiOQAKAVAVAFQAUAGATgL").p("AITgDQAAgMgGgLQAVAiAAAnIg/AAQANgBALgGQAMgHAHgLQAHgLgBgO").p("AGQC9IihAAQAbgBAOgYQAGgLABgNQAAgNgGgLQATAhAgAUQAgATAlAB").p("AhwASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QASAKAYAAQASAAANAN").p("AnUAFQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QATAKAXAA").p("Ak6gpQAOgFAJgNQAIgMAAgPIAACFQAAAnAUAhQgPgXgbAAQgNAAgLAGQgLAGgHAKQAUgiAAgmQAAg5gogpQAKAKAPADQAOADAOgG").p("ABJAnQATgOAAgYIAAAuQAAANACAMQgEgUgSgM").p("AgAAwQAAgRgDgOQAGAQAOAJQgPAMgDATQACgMAAgN").p("AphhkIAACUQAAA1AjAoQgPgPgVAAQgUAAgPAPQAjgoAAg1IAAiOIABgF").p("AuIAGQAKgNAAgRIAABIQAAASAEAQQgFgNgMgJQgNgKgRAAQgQAAgNAKQgMAJgFAOQAEgRAAgSQAAgdgKgYQAHAPAPAIQAQAIARgEQASgEAMgO").p("AxBASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QATAKAXAAQASAAANAN").f();
            shape_1.setTransform(135.9,46.5);
            this.logo.addChild(shape_1);

            // shadow
            var shape_2 = new createjs.Shape();
            shape_2.graphics.f("rgba(0,0,0,0.498)").p("ARfjEQgxAAgrASQgYgQgeAAQgpAAgdAdQgdAdAAApIAACOQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAjcQAKADAKAAQAcAAAYgRQAYgRALgaQAKgZgGgaQgGgagUgTIh6h0QgbgagkAAQgmAAgaAaIh1B0QgTATgGAaQgGAaALAZQALAaAXAQQAYAQAcAAQAJAAAIgCIAABEQgIgJgJgJQhGhHhkAAQhEAAg6AkQg5AjgfA6IAAhpQAAgpgdgdQgdgdgpAAQgpAAgdAdQgdAdAAApIAAASQg9gqhKAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgnAAgcAbQgdAagDAmQgqgQgtAAQgXAAgUAKQgFgkgcgYQgcgZglAAQgpAAgdAdQgdAdAAApIgADZQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAiOQAAgpgdgdQgdgdgpAAQgaAAgXANQgWANgOAVIgHgEQg8gqhLAAQgXAAgUAKQgFgkgcgYQgcgZgmAAQgpAAgdAdQgdAdAAApIAADZQAABkBHBGQBGBGBjAAQBSAABBgyQAUgPARgUQASAUAUAPQBBAyBQAAQBPAAA/gvQA/AvBOAAQBAAAA4ghQAYgOAUgSQASARAaAPQA5AhA/AAQBYAABDg5QASgPAQgTQANASAUAQQAhAcAoAPQAoAPArAAIE6AAQApAAAdgdQAZgZADghQAHAIAIAIQBGBHBjAAQAWAAAagFIAABWQAAApAdAdQAdAdApAAQApAAAdgdQAdgdAAgpIAAhdQATAJAYAAQBjAABGhGQBHhGAAhjQAAhkhHhGQhGhGhjAA").p("ARfBWQgWAAgUAJIAAg0QAAgSANgNQANgNASAAQASAAANANQANANAAASQAAASgNANQgNANgSAA").p("ALQk+QgOAGgIANQgIANAAAPQgBgOgIgMQgIgNgOgFQgIgEgHgAIAtgtIAtArQgJABgFAD").p("APrhGQAUAGATgLQgeATgRAfQgSAgAAAkIAAFEIgAAAIAAieQAAgNgHgMQgHgLgMgHQgMgHgNAAQgMAAgMAHQAfgTASgfQATghAAgmIAAiOQAJAVAWAF").p("AINgaQAVAiAAAnIg/AAQANgBALgGQAMgHAHgLQAHgLgAgOQAAgMgGgL").p("AEZB0QASAhAgATQAgATAlABIihAAQAbgBAOgXQAHgLAAgNQAAgNgFgL").p("AkbhWIAACFQAAAnATAhQgPgXgaAAQgNAAgMAGQgLAGgHAKQAUgiAAgmQAAg5gogpQAKAKAPADQAOADANgGQAOgFAIgNQAIgMABgP").p("Ai4AwIAAg0QATAKAXAAQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgS").p("Am2ASQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgSIAAg0QASAKAXAAQASAAANAN").p("ABJAnQATgOAAgYIAAAuQAAANACAMQgEgUgSgM").p("AgCBIQACgMAAgNQAAgRgDgOQAGAQAOAJQgPAMgDAT").p("AphhkIAACUQAAA1AjAoQgPgPgVAAQgUAAgPAPQAjgoAAg1IAAiOIAAgF").p("AyIAwIAAg0QASAKAXAAQASAAANANQANANAAASQAAASgNANQgNANgSAAQgSAAgMgNQgNgNAAgS").p("AvRAwQAAgdgKgYQAHAPAPAIQAPAIARgEQASgEALgOQALgNAAgRIAABIQAAASAEAQQgFgNgLgJQgNgKgRAAQgRAAgNAKQgMAJgFAOQAEgRAAgS").f();
            shape_2.setTransform(137.5,49.7);
            this.logo.addChild(shape_2);
        }

        public startup(){
            console.log("startup ", this + ", ", this.name);
            
            this.sequence = new org.casalib.time.Sequence();
            this.sequence.addTask(()=>(this.loadImages()), 0, this.preloadComplete);
            this.sequence.addTask(()=>(this.createBgImage()));
            this.sequence.addTask(()=>(this.createStage()));
            this.sequence.addTask(()=>(this.addItemsToStage()));
            this.sequence.addTask(()=>(this.qwe()));
            this.sequence.addTask(()=>(this.asd()), 1000);
            this.sequence.addTask(()=>(this.zxc()), 1000);
            this.sequence.addTask(()=>(this.createSlide()), 1000);
            this.sequence.start();

            this.startedup.dispatch();
        }

        loadImages(){
            this.preload = new createjs.PreloadJS();
            this.preload.onProgress = ()=>(this.handleProgress());
            this.preload.onComplete = ()=>(this.handleComplete());
            this.preload.setMaxConnections(5);

            var images:string[] = [
                "assets/image4.jpg"
            ];

            for (var i = 0; i < images.length; i++){
                this.preload.loadFile(images[i], false);
            }

            this.preload.load();
        }

        handleProgress() {
            console.log('handleProgress '+this.preload.progress);
        }
        
        handleComplete() {
           console.log('handleComplete', event);

            if(this.getImage()){
                console.log('fire preloadComplete', this.preloadComplete);
                this.preloadComplete.dispatch();
            }
        }

        getImage(){
            var image = this.preload.getResult("assets/image4.jpg")
            if(image){
                return image.result;
            }else{
                return null;
            }
        }

        createBgImage(){
            console.log('createBgImage', this.getImage());

            if(this.getImage()){
                this.bgImage.addChild(new createjs.Bitmap(this.getImage()));
            }
        }

        createStage(){
            console.log('createStage');

            this.stage = new createjs.Stage(document.getElementById("canvas"));
            this.stage.autoClear = true;

            createjs.Ticker.setFPS(64);
            createjs.Ticker.addListener(x => (this.stage.update())); 
        }

        addItemsToStage(){
            console.log('addItemsToStage');
            console.log(this.bgImage);

            this.stage.addChild(
                this.bgImage,
                this.ball,
                this.logo
            );
        }

        qwe(){
            createjs.Tween.get(this.ball).to({alpha:1}, 1000, createjs.Ease.sineIn);
            createjs.Tween.get(this.logo).to({alpha:1}, 2000, createjs.Ease.sineIn);
            createjs.Tween.get(this.bgImage).to({alpha:1}, 2000, createjs.Ease.sineIn);

            createjs.Tween.get(this.ball).to({x:200, y:300, rotation:0}, 1000, createjs.Ease.sineInOut);
            createjs.Tween.get(this.logo).to({x:300, y:200, rotation:25}, 2000, createjs.Ease.sineInOut);
        }

        asd(){
            createjs.Tween.get(this.ball).to({x:300, y:300, rotation:90}, 1000, createjs.Ease.sineInOut);
        }

        zxc(){
            createjs.Tween.get(this.ball).to({x:200, y:200, rotation:180}, 1000, createjs.Ease.sineInOut);
        }

        createSlide(){
            var lines:any[] = [];
            for(var i=0; i<10; i++){
                var shape = new createjs.Shape();
                shape.graphics.beginFill("#FF0000")
                    .drawRect(0,0,20,20);

                shape.y = i*20;

                this.stage.addChild(shape);

                createjs.Tween.get(shape, {loop:true})
                    .wait(i*10)
                    .to({x:200}, 1000, createjs.Ease.sineInOut)
                    .to({x:0}, 1000, createjs.Ease.sineInOut);
            }
        }
    }
}