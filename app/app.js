function prefix(str, prefix) {
	return prefix + str.split("\n").join(prefix);
}

var customResolveFactory = require("enhanced-resolve/test/lib/customResolveFactory");
var ConstFileSystem = require("enhanced-resolve/test/lib/ConstFileSystem");
var LatencyFileSystem = require("./LatencyFileSystem");
var TimedCacheFileSystem = require("./TimedCacheFileSystem");
var TestContents = require("./TestContents");

function syncFsToString(fs, path) {
	var stat = fs.statSync(path);
	if(stat.isFile()) {
		return path.split("/").pop();
	} else {
		var dir = fs.readdirSync(path);
		if(dir.length == 0) {
			return path.split("/").pop() + " (empty)";
		} else {
			dir = dir.map(function(d) {
				return syncFsToString(fs, path + "/" + d);
			});
			var last = dir.pop();
			dir = dir.map(function(d) {
				return "+--" + d.split("\n").join("\n|  ");
			});
			dir.push("+--" + last.split("\n").join("\n   "));
			return path.split("/").pop() + "\n" + dir.join("\n");
		}
	}
}

var resolve = null;
function initFilesystem(name, latency, timeout) {
	var syncFs = new ConstFileSystem(TestContents[name]);
	resolve = customResolveFactory(new TimedCacheFileSystem(new LatencyFileSystem(syncFs, latency), timeout));
	$(".filesystem").text(syncFsToString(syncFs, "/home"));
}

var jquery = require("jquery");
require("jquery-caret");
jquery(function($) {
	$("body").html(require("./content.jade")());

	function updateFilesystem() {
		initFilesystem($(".filesystem-chooser").val(), parseInt($(".latency-input").val(), 10), parseInt($(".timeout-input").val(), 10));
		oldText = "";
		checkUpdate();
	}
	updateFilesystem();

	$(".filesystem-chooser, .latency-input, .timeout-input").change(function() {
		updateFilesystem();
	});

	$(".request-input").bind("focus keyup click mouseup mousedown", function() {
		checkUpdate();
	});

	var currentCompletions = null;
	var currentCompletionPos = 0;
	$(".request-input").bind("keydown keypress", function(event) {
		if(event.which == 13) {
			if(currentCompletions) {
				applyCompletion(currentCompletions[currentCompletionPos], $(".request-input").caret().start);
			}
			event.preventDefault();
			return false;
		}
		if(event.which == 38) {
			if(currentCompletions && currentCompletionPos > 0) {
				currentCompletionPos--;
				$($(".completion-table tr").removeClass("success")[currentCompletionPos]).addClass("success");
			}
			event.preventDefault();
			return false;
		}
		if(event.which == 40) {
			if(currentCompletions && currentCompletionPos < currentCompletions.length-1) {
				currentCompletionPos++;
				$($(".completion-table tr").removeClass("success")[currentCompletionPos]).addClass("success");
			}
			event.preventDefault();
			return false;
		}

		checkUpdate();
	});

	var oldText = "";
	function getCompletionText() {
		var input = $(".request-input");
		var caret = input.caret();
		var text = input.val();
		var rawText = text;
		return text.substr(0, caret.start) + "*" + text.substr(caret.end);
	}
	function checkUpdate() {
		var input = $(".request-input");
		var caret = input.caret();
		var rawText = input.val();
		var text = getCompletionText();;
		if(oldText == text) return;
		oldText = text;
		resolve("/home/user/app", rawText, function(err, result) {
			if(err) return $(".result").text(err + "");
			$(".result").text(result.replace(/!/g, "!\n  "));
		});
		var table = $(".completion-table");
		resolve.complete("/home/user/app", text, function(err, completions) {
			table.html("");
			if(err) return;
			currentCompletions = completions;
			currentCompletionPos = 0;
			var body = $("<tbody>");
			completions.forEach(function(completion, idx) {
				var row = $("<tr>");
				// $("<td>").append($("<code>").text(completion.insert)).appendTo(row);
				$("<td>").append($("<code>").text(completion.seqment)).appendTo(row);
				$("<td>").append($("<code>").text(completion.result)).appendTo(row);
				row.click(function() {
					applyCompletion(completion, caret.start);
				});
				if(idx == 0)
					row.addClass("success");
				row.appendTo(body);
			});
			body.appendTo(table);
		});
	}
	function applyCompletion(completion, caret) {
		var input = $(".request-input");
		input.val(completion.result);
		input.focus();
		var pos = caret + completion.insert.length;
		input.caret({start: pos, end: pos});
	}
});


