exports.simple = {
	home: {
		user: {
			node_modules: {
				usermodule1: {
					"index.js": ""
				},
				usermodule2: {
					"package.json": JSON.stringify({
						main: "main"
					}),
					"main.js": ""
				},
				"usermodule3.js": ""
			},
			app: {
				lib: {
					"file.js": ""
				}
			}
		}
	}
};

exports.depth = {
	home: {
		user: {
			node_modules: {
				usermodule1: {
					"index.js": ""
				},
				usermodule2: {
					"package.json": JSON.stringify({
						main: "main"
					}),
					"main.js": ""
				},
				"usermodule3.js": ""
			},
			app: {
				node_modules: {

				},
				lib: {
					node_modules: {
					},
					web_modules: {
					},
					directory: {
						node_modules: {
						},
						"file.js": ""
					}
				}
			}
		}
	}
};

exports.modules = {
	home: {
		user: {
			node_modules: {
				usermodule1: {
					"index.js": ""
				},
				usermodule2: {
					"package.json": JSON.stringify({
						main: "main"
					}),
					"main.js": ""
				},
				"usermodule3.js": "",
				"raw-loader": {
					"package.json": JSON.stringify({
						loader: "loader",
						main: "main"
					}),
					"index.loader.js": "",
					"index.js": "",
					"main.js": "",
					"loader.js": ""
				}
			},
			app: {
				node_modules: {
					"enhanced-resolve": {
						"package.json": JSON.stringify({
							main: "lib/cachedFsResolve.js"
						}),
						lib: {
							"cachedFsResolve.js": "",
							"createThrottledFunction.js": "",
							"matchRegExpObject.js": "",
							"parse.js": "",
							"resolve.js": "",
							"stringify.js": ""
						},
						test: {
							"complete.js": "",
							"errors.js": "",
							fixtures: {
								"a.js": "",
								"abc.txt": "",
								"b.js": "",
								"c.js": "",
								"complex.js": "",
								"dirOrFile.js": "",
								"file.load1": "",
								"file.load2": "",
								"main1.js": "",
								"main2.js": "",
								"main3.js": "",
								"shortcutdir.js": ""
							},
							lib: {
								"AsyncFileSystem.js": "",
								"benchmark.js": "",
								"CachedFileSystem.js": "",
								"ConstFileSystem.js": "",
								"customResolveFactory.js": "",
								"DebugFileSystem.js": "",
								"LoggedFileSystem.js": "",
								"TestContents.js": "",
							},
							"parse.js": "",
							"resolve.js": "",
							"simple.js": "",
							"stringify.js": ""
						}
					},
				},
				lib: {
					node_modules: {
					},
					web_modules: {
					},
					directory: {
						node_modules: {
						},
						"file.js": ""
					}
				}
			}
		}
	}
};