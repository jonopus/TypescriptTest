///<reference path='./'/>
///<reference path='./compile.ts'/>
///<reference path='./org/casalib/time/Sequence.ts'/>

var serverCompiler:compile.TypeScriptCompileCommand = new compile.TypeScriptCompileCommand("./HttpServer.ts");
serverCompiler.module = "node";

var appCompiler:compile.TypeScriptCompileCommand = new compile.TypeScriptCompileCommand("com/opus/app/App.ts", "../public/js/App.js");
appCompiler.target = "ES5";

var uglify:compile.UglifyCommand = new compile.UglifyCommand("../public/js/App.js", "../public/js/App-min.js");

var runServer:compile.NodeCommand = new compile.NodeCommand("HttpServer.js");





var sequence:org.casalib.time.Sequence = new org.casalib.time.Sequence();
//sequence.addTask(()=>(serverCompiler.exe()), 0, serverCompiler.executed);
sequence.addTask(()=>(appCompiler.exe()), 0, appCompiler.executed);
//sequence.addTask(()=>(uglify.exe()), 0, uglify.executed);
sequence.addTask(()=>(runServer.exe()), 0, runServer.executed);
sequence.start();