var createThrottledFunction = require("enhanced-resolve/lib/createThrottledFunction");

function TimedCacheFileSystem(fs, timeout) {
	this.fs = fs;
	this.stat = createThrottledFunction(this.fs.stat.bind(this.fs), timeout, {});
	this.readdir = createThrottledFunction(this.fs.readdir.bind(this.fs), timeout, {});
	this.readFile = createThrottledFunction(this.fs.readFile.bind(this.fs), timeout, {});
}
module.exports = TimedCacheFileSystem;
