function LatencyFileSystem(fs, latency) {
	this.fs = fs;
	this.latency = latency;
}
module.exports = LatencyFileSystem;

function asAsync(fn, callback) {
	try {
		var result = fn();
		setTimeout(function() {
			callback(null, result);
		}, this.latency);
	} catch(e) {
		setTimeout(function() {
			callback(e);
		}, this.latency);
	}
}

LatencyFileSystem.prototype.readdir = function(path, callback) {
	asAsync.call(this, function() {
		return this.fs.readdirSync(path);
	}.bind(this), callback);
}

LatencyFileSystem.prototype.readFile = function(path, encoding, callback) {
	asAsync.call(this, function() {
		return this.fs.readFileSync(path, encoding);
	}.bind(this), callback);
}

LatencyFileSystem.prototype.stat = function(path, callback) {
	asAsync.call(this, function() {
		return this.fs.statSync(path);
	}.bind(this), callback);
}