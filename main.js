/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "257620ab9e005dea9400";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/aos/dist/aos.css":
/*!***************************************!*\
  !*** ./node_modules/aos/dist/aos.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!./aos.css */ "./node_modules/css-loader/index.js!./node_modules/aos/dist/aos.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../css-loader!./aos.css */ "./node_modules/css-loader/index.js!./node_modules/aos/dist/aos.css", function() {
		var newContent = __webpack_require__(/*! !../../css-loader!./aos.css */ "./node_modules/css-loader/index.js!./node_modules/aos/dist/aos.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/aos/dist/aos.js":
/*!**************************************!*\
  !*** ./node_modules/aos/dist/aos.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t="Expected a function",n=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,l=u||d||Function("return this")(),f=Object.prototype.toString,m=Math.max,p=Math.min,b=function(){return l.Date.now()};function v(e,n,o){var i,a,r,c,s,u,d=0,l=!1,f=!1,v=!0;if("function"!=typeof e)throw new TypeError(t);function y(t){var n=i,o=a;return i=a=void 0,d=t,c=e.apply(o,n)}function h(e){var t=e-u;return void 0===u||t>=n||t<0||f&&e-d>=r}function k(){var e=b();if(h(e))return x(e);s=setTimeout(k,function(e){var t=n-(e-u);return f?p(t,r-(e-d)):t}(e))}function x(e){return s=void 0,v&&i?y(e):(i=a=void 0,c)}function O(){var e=b(),t=h(e);if(i=arguments,a=this,u=e,t){if(void 0===s)return function(e){return d=e,s=setTimeout(k,n),l?y(e):c}(u);if(f)return s=setTimeout(k,n),y(u)}return void 0===s&&(s=setTimeout(k,n)),c}return n=w(n)||0,g(o)&&(l=!!o.leading,r=(f="maxWait"in o)?m(w(o.maxWait)||0,n):r,v="trailing"in o?!!o.trailing:v),O.cancel=function(){void 0!==s&&clearTimeout(s),d=0,i=u=a=s=void 0},O.flush=function(){return void 0===s?c:x(b())},O}function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&f.call(e)==o}(e))return n;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var u=r.test(e);return u||c.test(e)?s(e.slice(2),u?2:8):a.test(e)?n:+e}var y=function(e,n,o){var i=!0,a=!0;if("function"!=typeof e)throw new TypeError(t);return g(o)&&(i="leading"in o?!!o.leading:i,a="trailing"in o?!!o.trailing:a),v(e,n,{leading:i,maxWait:n,trailing:a})},h="Expected a function",k=NaN,x="[object Symbol]",O=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,E=/^0b[01]+$/i,N=/^0o[0-7]+$/i,z=parseInt,C="object"==typeof e&&e&&e.Object===Object&&e,A="object"==typeof self&&self&&self.Object===Object&&self,q=C||A||Function("return this")(),L=Object.prototype.toString,T=Math.max,M=Math.min,S=function(){return q.Date.now()};function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function H(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&L.call(e)==x}(e))return k;if(D(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=D(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(O,"");var n=E.test(e);return n||N.test(e)?z(e.slice(2),n?2:8):j.test(e)?k:+e}var $=function(e,t,n){var o,i,a,r,c,s,u=0,d=!1,l=!1,f=!0;if("function"!=typeof e)throw new TypeError(h);function m(t){var n=o,a=i;return o=i=void 0,u=t,r=e.apply(a,n)}function p(e){var n=e-s;return void 0===s||n>=t||n<0||l&&e-u>=a}function b(){var e=S();if(p(e))return v(e);c=setTimeout(b,function(e){var n=t-(e-s);return l?M(n,a-(e-u)):n}(e))}function v(e){return c=void 0,f&&o?m(e):(o=i=void 0,r)}function g(){var e=S(),n=p(e);if(o=arguments,i=this,s=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(b,t),d?m(e):r}(s);if(l)return c=setTimeout(b,t),m(s)}return void 0===c&&(c=setTimeout(b,t)),r}return t=H(t)||0,D(n)&&(d=!!n.leading,a=(l="maxWait"in n)?T(H(n.maxWait)||0,t):a,f="trailing"in n?!!n.trailing:f),g.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=s=i=c=void 0},g.flush=function(){return void 0===c?r:v(S())},g},W=function(){};function P(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes);if(function e(t){var n=void 0,o=void 0;for(n=0;n<t.length;n+=1){if((o=t[n]).dataset&&o.dataset.aos)return!0;if(o.children&&e(o.children))return!0}return!1}(t.concat(n)))return W()})}function Y(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}var _={isSupported:function(){return!!Y()},ready:function(e,t){var n=window.document,o=new(Y())(P);W=t,o.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},K=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,G=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,J=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,Q=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;function R(){return navigator.userAgent||navigator.vendor||window.opera||""}var U=new(function(){function e(){B(this,e)}return F(e,[{key:"phone",value:function(){var e=R();return!(!K.test(e)&&!G.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=R();return!(!J.test(e)&&!Q.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}},{key:"ie11",value:function(){return"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style}}]),e}()),V=function(e,t){var n=void 0;return U.ie11()?(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,{detail:t}):n=new CustomEvent(e,{detail:t}),document.dispatchEvent(n)},X=function(e){return e.forEach(function(e,t){return function(e,t){var n=e.options,o=e.position,i=e.node,a=(e.data,function(){e.animated&&(function(e,t){t&&t.forEach(function(t){return e.classList.remove(t)})}(i,n.animatedClassNames),V("aos:out",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!1)});n.mirror&&t>=o.out&&!n.once?a():t>=o.in?e.animated||(function(e,t){t&&t.forEach(function(t){return e.classList.add(t)})}(i,n.animatedClassNames),V("aos:in",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!0):e.animated&&!n.once&&a()}(e,window.pageYOffset)})},Z=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}},ee=function(e,t,n){var o=e.getAttribute("data-aos-"+t);if(void 0!==o){if("true"===o)return!0;if("false"===o)return!1}return o||n},te=function(e,t){return e.forEach(function(e,n){var o=ee(e.node,"mirror",t.mirror),i=ee(e.node,"once",t.once),a=ee(e.node,"id"),r=t.useClassNames&&e.node.getAttribute("data-aos"),c=[t.animatedClassName].concat(r?r.split(" "):[]).filter(function(e){return"string"==typeof e});t.initClassName&&e.node.classList.add(t.initClassName),e.position={in:function(e,t,n){var o=window.innerHeight,i=ee(e,"anchor"),a=ee(e,"anchor-placement"),r=Number(ee(e,"offset",a?0:t)),c=a||n,s=e;i&&document.querySelectorAll(i)&&(s=document.querySelectorAll(i)[0]);var u=Z(s).top-o;switch(c){case"top-bottom":break;case"center-bottom":u+=s.offsetHeight/2;break;case"bottom-bottom":u+=s.offsetHeight;break;case"top-center":u+=o/2;break;case"center-center":u+=o/2+s.offsetHeight/2;break;case"bottom-center":u+=o/2+s.offsetHeight;break;case"top-top":u+=o;break;case"bottom-top":u+=o+s.offsetHeight;break;case"center-top":u+=o+s.offsetHeight/2}return u+r}(e.node,t.offset,t.anchorPlacement),out:o&&function(e,t){window.innerHeight;var n=ee(e,"anchor"),o=ee(e,"offset",t),i=e;return n&&document.querySelectorAll(n)&&(i=document.querySelectorAll(n)[0]),Z(i).top+i.offsetHeight-o}(e.node,t.offset)},e.options={once:i,mirror:o,animatedClassNames:c,id:a}}),e},ne=function(){var e=document.querySelectorAll("[data-aos]");return Array.prototype.map.call(e,function(e){return{node:e}})},oe=[],ie=!1,ae={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,mirror:!1,anchorPlacement:"top-bottom",startEvent:"DOMContentLoaded",animatedClassName:"aos-animate",initClassName:"aos-init",useClassNames:!1,disableMutationObserver:!1,throttleDelay:99,debounceDelay:50},re=function(){return document.all&&!window.atob},ce=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&(ie=!0),ie&&(oe=te(oe,ae),X(oe),window.addEventListener("scroll",y(function(){X(oe,ae.once)},ae.throttleDelay)))},se=function(){if(oe=ne(),de(ae.disable)||re())return ue();ce()},ue=function(){oe.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay"),ae.initClassName&&e.node.classList.remove(ae.initClassName),ae.animatedClassName&&e.node.classList.remove(ae.animatedClassName)})},de=function(e){return!0===e||"mobile"===e&&U.mobile()||"phone"===e&&U.phone()||"tablet"===e&&U.tablet()||"function"==typeof e&&!0===e()};return{init:function(e){return ae=I(ae,e),oe=ne(),ae.disableMutationObserver||_.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),ae.disableMutationObserver=!0),ae.disableMutationObserver||_.ready("[data-aos]",se),de(ae.disable)||re()?ue():(document.querySelector("body").setAttribute("data-aos-easing",ae.easing),document.querySelector("body").setAttribute("data-aos-duration",ae.duration),document.querySelector("body").setAttribute("data-aos-delay",ae.delay),-1===["DOMContentLoaded","load"].indexOf(ae.startEvent)?document.addEventListener(ae.startEvent,function(){ce(!0)}):window.addEventListener("load",function(){ce(!0)}),"DOMContentLoaded"===ae.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1&&ce(!0),window.addEventListener("resize",$(ce,ae.debounceDelay,!0)),window.addEventListener("orientationchange",$(ce,ae.debounceDelay,!0)),oe)},refresh:ce,refreshHard:se}});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/aos/dist/aos.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/aos/dist/aos.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "[data-aos][data-aos][data-aos-duration=\"50\"],body[data-aos-duration=\"50\"] [data-aos]{transition-duration:50ms}[data-aos][data-aos][data-aos-delay=\"50\"],body[data-aos-delay=\"50\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"50\"].aos-animate,body[data-aos-delay=\"50\"] [data-aos].aos-animate{transition-delay:50ms}[data-aos][data-aos][data-aos-duration=\"100\"],body[data-aos-duration=\"100\"] [data-aos]{transition-duration:.1s}[data-aos][data-aos][data-aos-delay=\"100\"],body[data-aos-delay=\"100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"100\"].aos-animate,body[data-aos-delay=\"100\"] [data-aos].aos-animate{transition-delay:.1s}[data-aos][data-aos][data-aos-duration=\"150\"],body[data-aos-duration=\"150\"] [data-aos]{transition-duration:.15s}[data-aos][data-aos][data-aos-delay=\"150\"],body[data-aos-delay=\"150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"150\"].aos-animate,body[data-aos-delay=\"150\"] [data-aos].aos-animate{transition-delay:.15s}[data-aos][data-aos][data-aos-duration=\"200\"],body[data-aos-duration=\"200\"] [data-aos]{transition-duration:.2s}[data-aos][data-aos][data-aos-delay=\"200\"],body[data-aos-delay=\"200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"200\"].aos-animate,body[data-aos-delay=\"200\"] [data-aos].aos-animate{transition-delay:.2s}[data-aos][data-aos][data-aos-duration=\"250\"],body[data-aos-duration=\"250\"] [data-aos]{transition-duration:.25s}[data-aos][data-aos][data-aos-delay=\"250\"],body[data-aos-delay=\"250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"250\"].aos-animate,body[data-aos-delay=\"250\"] [data-aos].aos-animate{transition-delay:.25s}[data-aos][data-aos][data-aos-duration=\"300\"],body[data-aos-duration=\"300\"] [data-aos]{transition-duration:.3s}[data-aos][data-aos][data-aos-delay=\"300\"],body[data-aos-delay=\"300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"300\"].aos-animate,body[data-aos-delay=\"300\"] [data-aos].aos-animate{transition-delay:.3s}[data-aos][data-aos][data-aos-duration=\"350\"],body[data-aos-duration=\"350\"] [data-aos]{transition-duration:.35s}[data-aos][data-aos][data-aos-delay=\"350\"],body[data-aos-delay=\"350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"350\"].aos-animate,body[data-aos-delay=\"350\"] [data-aos].aos-animate{transition-delay:.35s}[data-aos][data-aos][data-aos-duration=\"400\"],body[data-aos-duration=\"400\"] [data-aos]{transition-duration:.4s}[data-aos][data-aos][data-aos-delay=\"400\"],body[data-aos-delay=\"400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"400\"].aos-animate,body[data-aos-delay=\"400\"] [data-aos].aos-animate{transition-delay:.4s}[data-aos][data-aos][data-aos-duration=\"450\"],body[data-aos-duration=\"450\"] [data-aos]{transition-duration:.45s}[data-aos][data-aos][data-aos-delay=\"450\"],body[data-aos-delay=\"450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"450\"].aos-animate,body[data-aos-delay=\"450\"] [data-aos].aos-animate{transition-delay:.45s}[data-aos][data-aos][data-aos-duration=\"500\"],body[data-aos-duration=\"500\"] [data-aos]{transition-duration:.5s}[data-aos][data-aos][data-aos-delay=\"500\"],body[data-aos-delay=\"500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"500\"].aos-animate,body[data-aos-delay=\"500\"] [data-aos].aos-animate{transition-delay:.5s}[data-aos][data-aos][data-aos-duration=\"550\"],body[data-aos-duration=\"550\"] [data-aos]{transition-duration:.55s}[data-aos][data-aos][data-aos-delay=\"550\"],body[data-aos-delay=\"550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"550\"].aos-animate,body[data-aos-delay=\"550\"] [data-aos].aos-animate{transition-delay:.55s}[data-aos][data-aos][data-aos-duration=\"600\"],body[data-aos-duration=\"600\"] [data-aos]{transition-duration:.6s}[data-aos][data-aos][data-aos-delay=\"600\"],body[data-aos-delay=\"600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"600\"].aos-animate,body[data-aos-delay=\"600\"] [data-aos].aos-animate{transition-delay:.6s}[data-aos][data-aos][data-aos-duration=\"650\"],body[data-aos-duration=\"650\"] [data-aos]{transition-duration:.65s}[data-aos][data-aos][data-aos-delay=\"650\"],body[data-aos-delay=\"650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"650\"].aos-animate,body[data-aos-delay=\"650\"] [data-aos].aos-animate{transition-delay:.65s}[data-aos][data-aos][data-aos-duration=\"700\"],body[data-aos-duration=\"700\"] [data-aos]{transition-duration:.7s}[data-aos][data-aos][data-aos-delay=\"700\"],body[data-aos-delay=\"700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"700\"].aos-animate,body[data-aos-delay=\"700\"] [data-aos].aos-animate{transition-delay:.7s}[data-aos][data-aos][data-aos-duration=\"750\"],body[data-aos-duration=\"750\"] [data-aos]{transition-duration:.75s}[data-aos][data-aos][data-aos-delay=\"750\"],body[data-aos-delay=\"750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"750\"].aos-animate,body[data-aos-delay=\"750\"] [data-aos].aos-animate{transition-delay:.75s}[data-aos][data-aos][data-aos-duration=\"800\"],body[data-aos-duration=\"800\"] [data-aos]{transition-duration:.8s}[data-aos][data-aos][data-aos-delay=\"800\"],body[data-aos-delay=\"800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"800\"].aos-animate,body[data-aos-delay=\"800\"] [data-aos].aos-animate{transition-delay:.8s}[data-aos][data-aos][data-aos-duration=\"850\"],body[data-aos-duration=\"850\"] [data-aos]{transition-duration:.85s}[data-aos][data-aos][data-aos-delay=\"850\"],body[data-aos-delay=\"850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"850\"].aos-animate,body[data-aos-delay=\"850\"] [data-aos].aos-animate{transition-delay:.85s}[data-aos][data-aos][data-aos-duration=\"900\"],body[data-aos-duration=\"900\"] [data-aos]{transition-duration:.9s}[data-aos][data-aos][data-aos-delay=\"900\"],body[data-aos-delay=\"900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"900\"].aos-animate,body[data-aos-delay=\"900\"] [data-aos].aos-animate{transition-delay:.9s}[data-aos][data-aos][data-aos-duration=\"950\"],body[data-aos-duration=\"950\"] [data-aos]{transition-duration:.95s}[data-aos][data-aos][data-aos-delay=\"950\"],body[data-aos-delay=\"950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"950\"].aos-animate,body[data-aos-delay=\"950\"] [data-aos].aos-animate{transition-delay:.95s}[data-aos][data-aos][data-aos-duration=\"1000\"],body[data-aos-duration=\"1000\"] [data-aos]{transition-duration:1s}[data-aos][data-aos][data-aos-delay=\"1000\"],body[data-aos-delay=\"1000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1000\"].aos-animate,body[data-aos-delay=\"1000\"] [data-aos].aos-animate{transition-delay:1s}[data-aos][data-aos][data-aos-duration=\"1050\"],body[data-aos-duration=\"1050\"] [data-aos]{transition-duration:1.05s}[data-aos][data-aos][data-aos-delay=\"1050\"],body[data-aos-delay=\"1050\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1050\"].aos-animate,body[data-aos-delay=\"1050\"] [data-aos].aos-animate{transition-delay:1.05s}[data-aos][data-aos][data-aos-duration=\"1100\"],body[data-aos-duration=\"1100\"] [data-aos]{transition-duration:1.1s}[data-aos][data-aos][data-aos-delay=\"1100\"],body[data-aos-delay=\"1100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1100\"].aos-animate,body[data-aos-delay=\"1100\"] [data-aos].aos-animate{transition-delay:1.1s}[data-aos][data-aos][data-aos-duration=\"1150\"],body[data-aos-duration=\"1150\"] [data-aos]{transition-duration:1.15s}[data-aos][data-aos][data-aos-delay=\"1150\"],body[data-aos-delay=\"1150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1150\"].aos-animate,body[data-aos-delay=\"1150\"] [data-aos].aos-animate{transition-delay:1.15s}[data-aos][data-aos][data-aos-duration=\"1200\"],body[data-aos-duration=\"1200\"] [data-aos]{transition-duration:1.2s}[data-aos][data-aos][data-aos-delay=\"1200\"],body[data-aos-delay=\"1200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1200\"].aos-animate,body[data-aos-delay=\"1200\"] [data-aos].aos-animate{transition-delay:1.2s}[data-aos][data-aos][data-aos-duration=\"1250\"],body[data-aos-duration=\"1250\"] [data-aos]{transition-duration:1.25s}[data-aos][data-aos][data-aos-delay=\"1250\"],body[data-aos-delay=\"1250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1250\"].aos-animate,body[data-aos-delay=\"1250\"] [data-aos].aos-animate{transition-delay:1.25s}[data-aos][data-aos][data-aos-duration=\"1300\"],body[data-aos-duration=\"1300\"] [data-aos]{transition-duration:1.3s}[data-aos][data-aos][data-aos-delay=\"1300\"],body[data-aos-delay=\"1300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1300\"].aos-animate,body[data-aos-delay=\"1300\"] [data-aos].aos-animate{transition-delay:1.3s}[data-aos][data-aos][data-aos-duration=\"1350\"],body[data-aos-duration=\"1350\"] [data-aos]{transition-duration:1.35s}[data-aos][data-aos][data-aos-delay=\"1350\"],body[data-aos-delay=\"1350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1350\"].aos-animate,body[data-aos-delay=\"1350\"] [data-aos].aos-animate{transition-delay:1.35s}[data-aos][data-aos][data-aos-duration=\"1400\"],body[data-aos-duration=\"1400\"] [data-aos]{transition-duration:1.4s}[data-aos][data-aos][data-aos-delay=\"1400\"],body[data-aos-delay=\"1400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1400\"].aos-animate,body[data-aos-delay=\"1400\"] [data-aos].aos-animate{transition-delay:1.4s}[data-aos][data-aos][data-aos-duration=\"1450\"],body[data-aos-duration=\"1450\"] [data-aos]{transition-duration:1.45s}[data-aos][data-aos][data-aos-delay=\"1450\"],body[data-aos-delay=\"1450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1450\"].aos-animate,body[data-aos-delay=\"1450\"] [data-aos].aos-animate{transition-delay:1.45s}[data-aos][data-aos][data-aos-duration=\"1500\"],body[data-aos-duration=\"1500\"] [data-aos]{transition-duration:1.5s}[data-aos][data-aos][data-aos-delay=\"1500\"],body[data-aos-delay=\"1500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1500\"].aos-animate,body[data-aos-delay=\"1500\"] [data-aos].aos-animate{transition-delay:1.5s}[data-aos][data-aos][data-aos-duration=\"1550\"],body[data-aos-duration=\"1550\"] [data-aos]{transition-duration:1.55s}[data-aos][data-aos][data-aos-delay=\"1550\"],body[data-aos-delay=\"1550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1550\"].aos-animate,body[data-aos-delay=\"1550\"] [data-aos].aos-animate{transition-delay:1.55s}[data-aos][data-aos][data-aos-duration=\"1600\"],body[data-aos-duration=\"1600\"] [data-aos]{transition-duration:1.6s}[data-aos][data-aos][data-aos-delay=\"1600\"],body[data-aos-delay=\"1600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1600\"].aos-animate,body[data-aos-delay=\"1600\"] [data-aos].aos-animate{transition-delay:1.6s}[data-aos][data-aos][data-aos-duration=\"1650\"],body[data-aos-duration=\"1650\"] [data-aos]{transition-duration:1.65s}[data-aos][data-aos][data-aos-delay=\"1650\"],body[data-aos-delay=\"1650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1650\"].aos-animate,body[data-aos-delay=\"1650\"] [data-aos].aos-animate{transition-delay:1.65s}[data-aos][data-aos][data-aos-duration=\"1700\"],body[data-aos-duration=\"1700\"] [data-aos]{transition-duration:1.7s}[data-aos][data-aos][data-aos-delay=\"1700\"],body[data-aos-delay=\"1700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1700\"].aos-animate,body[data-aos-delay=\"1700\"] [data-aos].aos-animate{transition-delay:1.7s}[data-aos][data-aos][data-aos-duration=\"1750\"],body[data-aos-duration=\"1750\"] [data-aos]{transition-duration:1.75s}[data-aos][data-aos][data-aos-delay=\"1750\"],body[data-aos-delay=\"1750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1750\"].aos-animate,body[data-aos-delay=\"1750\"] [data-aos].aos-animate{transition-delay:1.75s}[data-aos][data-aos][data-aos-duration=\"1800\"],body[data-aos-duration=\"1800\"] [data-aos]{transition-duration:1.8s}[data-aos][data-aos][data-aos-delay=\"1800\"],body[data-aos-delay=\"1800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1800\"].aos-animate,body[data-aos-delay=\"1800\"] [data-aos].aos-animate{transition-delay:1.8s}[data-aos][data-aos][data-aos-duration=\"1850\"],body[data-aos-duration=\"1850\"] [data-aos]{transition-duration:1.85s}[data-aos][data-aos][data-aos-delay=\"1850\"],body[data-aos-delay=\"1850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1850\"].aos-animate,body[data-aos-delay=\"1850\"] [data-aos].aos-animate{transition-delay:1.85s}[data-aos][data-aos][data-aos-duration=\"1900\"],body[data-aos-duration=\"1900\"] [data-aos]{transition-duration:1.9s}[data-aos][data-aos][data-aos-delay=\"1900\"],body[data-aos-delay=\"1900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1900\"].aos-animate,body[data-aos-delay=\"1900\"] [data-aos].aos-animate{transition-delay:1.9s}[data-aos][data-aos][data-aos-duration=\"1950\"],body[data-aos-duration=\"1950\"] [data-aos]{transition-duration:1.95s}[data-aos][data-aos][data-aos-delay=\"1950\"],body[data-aos-delay=\"1950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"1950\"].aos-animate,body[data-aos-delay=\"1950\"] [data-aos].aos-animate{transition-delay:1.95s}[data-aos][data-aos][data-aos-duration=\"2000\"],body[data-aos-duration=\"2000\"] [data-aos]{transition-duration:2s}[data-aos][data-aos][data-aos-delay=\"2000\"],body[data-aos-delay=\"2000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2000\"].aos-animate,body[data-aos-delay=\"2000\"] [data-aos].aos-animate{transition-delay:2s}[data-aos][data-aos][data-aos-duration=\"2050\"],body[data-aos-duration=\"2050\"] [data-aos]{transition-duration:2.05s}[data-aos][data-aos][data-aos-delay=\"2050\"],body[data-aos-delay=\"2050\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2050\"].aos-animate,body[data-aos-delay=\"2050\"] [data-aos].aos-animate{transition-delay:2.05s}[data-aos][data-aos][data-aos-duration=\"2100\"],body[data-aos-duration=\"2100\"] [data-aos]{transition-duration:2.1s}[data-aos][data-aos][data-aos-delay=\"2100\"],body[data-aos-delay=\"2100\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2100\"].aos-animate,body[data-aos-delay=\"2100\"] [data-aos].aos-animate{transition-delay:2.1s}[data-aos][data-aos][data-aos-duration=\"2150\"],body[data-aos-duration=\"2150\"] [data-aos]{transition-duration:2.15s}[data-aos][data-aos][data-aos-delay=\"2150\"],body[data-aos-delay=\"2150\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2150\"].aos-animate,body[data-aos-delay=\"2150\"] [data-aos].aos-animate{transition-delay:2.15s}[data-aos][data-aos][data-aos-duration=\"2200\"],body[data-aos-duration=\"2200\"] [data-aos]{transition-duration:2.2s}[data-aos][data-aos][data-aos-delay=\"2200\"],body[data-aos-delay=\"2200\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2200\"].aos-animate,body[data-aos-delay=\"2200\"] [data-aos].aos-animate{transition-delay:2.2s}[data-aos][data-aos][data-aos-duration=\"2250\"],body[data-aos-duration=\"2250\"] [data-aos]{transition-duration:2.25s}[data-aos][data-aos][data-aos-delay=\"2250\"],body[data-aos-delay=\"2250\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2250\"].aos-animate,body[data-aos-delay=\"2250\"] [data-aos].aos-animate{transition-delay:2.25s}[data-aos][data-aos][data-aos-duration=\"2300\"],body[data-aos-duration=\"2300\"] [data-aos]{transition-duration:2.3s}[data-aos][data-aos][data-aos-delay=\"2300\"],body[data-aos-delay=\"2300\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2300\"].aos-animate,body[data-aos-delay=\"2300\"] [data-aos].aos-animate{transition-delay:2.3s}[data-aos][data-aos][data-aos-duration=\"2350\"],body[data-aos-duration=\"2350\"] [data-aos]{transition-duration:2.35s}[data-aos][data-aos][data-aos-delay=\"2350\"],body[data-aos-delay=\"2350\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2350\"].aos-animate,body[data-aos-delay=\"2350\"] [data-aos].aos-animate{transition-delay:2.35s}[data-aos][data-aos][data-aos-duration=\"2400\"],body[data-aos-duration=\"2400\"] [data-aos]{transition-duration:2.4s}[data-aos][data-aos][data-aos-delay=\"2400\"],body[data-aos-delay=\"2400\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2400\"].aos-animate,body[data-aos-delay=\"2400\"] [data-aos].aos-animate{transition-delay:2.4s}[data-aos][data-aos][data-aos-duration=\"2450\"],body[data-aos-duration=\"2450\"] [data-aos]{transition-duration:2.45s}[data-aos][data-aos][data-aos-delay=\"2450\"],body[data-aos-delay=\"2450\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2450\"].aos-animate,body[data-aos-delay=\"2450\"] [data-aos].aos-animate{transition-delay:2.45s}[data-aos][data-aos][data-aos-duration=\"2500\"],body[data-aos-duration=\"2500\"] [data-aos]{transition-duration:2.5s}[data-aos][data-aos][data-aos-delay=\"2500\"],body[data-aos-delay=\"2500\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2500\"].aos-animate,body[data-aos-delay=\"2500\"] [data-aos].aos-animate{transition-delay:2.5s}[data-aos][data-aos][data-aos-duration=\"2550\"],body[data-aos-duration=\"2550\"] [data-aos]{transition-duration:2.55s}[data-aos][data-aos][data-aos-delay=\"2550\"],body[data-aos-delay=\"2550\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2550\"].aos-animate,body[data-aos-delay=\"2550\"] [data-aos].aos-animate{transition-delay:2.55s}[data-aos][data-aos][data-aos-duration=\"2600\"],body[data-aos-duration=\"2600\"] [data-aos]{transition-duration:2.6s}[data-aos][data-aos][data-aos-delay=\"2600\"],body[data-aos-delay=\"2600\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2600\"].aos-animate,body[data-aos-delay=\"2600\"] [data-aos].aos-animate{transition-delay:2.6s}[data-aos][data-aos][data-aos-duration=\"2650\"],body[data-aos-duration=\"2650\"] [data-aos]{transition-duration:2.65s}[data-aos][data-aos][data-aos-delay=\"2650\"],body[data-aos-delay=\"2650\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2650\"].aos-animate,body[data-aos-delay=\"2650\"] [data-aos].aos-animate{transition-delay:2.65s}[data-aos][data-aos][data-aos-duration=\"2700\"],body[data-aos-duration=\"2700\"] [data-aos]{transition-duration:2.7s}[data-aos][data-aos][data-aos-delay=\"2700\"],body[data-aos-delay=\"2700\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2700\"].aos-animate,body[data-aos-delay=\"2700\"] [data-aos].aos-animate{transition-delay:2.7s}[data-aos][data-aos][data-aos-duration=\"2750\"],body[data-aos-duration=\"2750\"] [data-aos]{transition-duration:2.75s}[data-aos][data-aos][data-aos-delay=\"2750\"],body[data-aos-delay=\"2750\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2750\"].aos-animate,body[data-aos-delay=\"2750\"] [data-aos].aos-animate{transition-delay:2.75s}[data-aos][data-aos][data-aos-duration=\"2800\"],body[data-aos-duration=\"2800\"] [data-aos]{transition-duration:2.8s}[data-aos][data-aos][data-aos-delay=\"2800\"],body[data-aos-delay=\"2800\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2800\"].aos-animate,body[data-aos-delay=\"2800\"] [data-aos].aos-animate{transition-delay:2.8s}[data-aos][data-aos][data-aos-duration=\"2850\"],body[data-aos-duration=\"2850\"] [data-aos]{transition-duration:2.85s}[data-aos][data-aos][data-aos-delay=\"2850\"],body[data-aos-delay=\"2850\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2850\"].aos-animate,body[data-aos-delay=\"2850\"] [data-aos].aos-animate{transition-delay:2.85s}[data-aos][data-aos][data-aos-duration=\"2900\"],body[data-aos-duration=\"2900\"] [data-aos]{transition-duration:2.9s}[data-aos][data-aos][data-aos-delay=\"2900\"],body[data-aos-delay=\"2900\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2900\"].aos-animate,body[data-aos-delay=\"2900\"] [data-aos].aos-animate{transition-delay:2.9s}[data-aos][data-aos][data-aos-duration=\"2950\"],body[data-aos-duration=\"2950\"] [data-aos]{transition-duration:2.95s}[data-aos][data-aos][data-aos-delay=\"2950\"],body[data-aos-delay=\"2950\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"2950\"].aos-animate,body[data-aos-delay=\"2950\"] [data-aos].aos-animate{transition-delay:2.95s}[data-aos][data-aos][data-aos-duration=\"3000\"],body[data-aos-duration=\"3000\"] [data-aos]{transition-duration:3s}[data-aos][data-aos][data-aos-delay=\"3000\"],body[data-aos-delay=\"3000\"] [data-aos]{transition-delay:0s}[data-aos][data-aos][data-aos-delay=\"3000\"].aos-animate,body[data-aos-delay=\"3000\"] [data-aos].aos-animate{transition-delay:3s}[data-aos]{pointer-events:none}[data-aos].aos-animate{pointer-events:auto}[data-aos][data-aos][data-aos-easing=linear],body[data-aos-easing=linear] [data-aos]{transition-timing-function:cubic-bezier(.25,.25,.75,.75)}[data-aos][data-aos][data-aos-easing=ease],body[data-aos-easing=ease] [data-aos]{transition-timing-function:ease}[data-aos][data-aos][data-aos-easing=ease-in],body[data-aos-easing=ease-in] [data-aos]{transition-timing-function:ease-in}[data-aos][data-aos][data-aos-easing=ease-out],body[data-aos-easing=ease-out] [data-aos]{transition-timing-function:ease-out}[data-aos][data-aos][data-aos-easing=ease-in-out],body[data-aos-easing=ease-in-out] [data-aos]{transition-timing-function:ease-in-out}[data-aos][data-aos][data-aos-easing=ease-in-back],body[data-aos-easing=ease-in-back] [data-aos]{transition-timing-function:cubic-bezier(.6,-.28,.735,.045)}[data-aos][data-aos][data-aos-easing=ease-out-back],body[data-aos-easing=ease-out-back] [data-aos]{transition-timing-function:cubic-bezier(.175,.885,.32,1.275)}[data-aos][data-aos][data-aos-easing=ease-in-out-back],body[data-aos-easing=ease-in-out-back] [data-aos]{transition-timing-function:cubic-bezier(.68,-.55,.265,1.55)}[data-aos][data-aos][data-aos-easing=ease-in-sine],body[data-aos-easing=ease-in-sine] [data-aos]{transition-timing-function:cubic-bezier(.47,0,.745,.715)}[data-aos][data-aos][data-aos-easing=ease-out-sine],body[data-aos-easing=ease-out-sine] [data-aos]{transition-timing-function:cubic-bezier(.39,.575,.565,1)}[data-aos][data-aos][data-aos-easing=ease-in-out-sine],body[data-aos-easing=ease-in-out-sine] [data-aos]{transition-timing-function:cubic-bezier(.445,.05,.55,.95)}[data-aos][data-aos][data-aos-easing=ease-in-quad],body[data-aos-easing=ease-in-quad] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-quad],body[data-aos-easing=ease-out-quad] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-quad],body[data-aos-easing=ease-in-out-quad] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}[data-aos][data-aos][data-aos-easing=ease-in-cubic],body[data-aos-easing=ease-in-cubic] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-cubic],body[data-aos-easing=ease-out-cubic] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-cubic],body[data-aos-easing=ease-in-out-cubic] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}[data-aos][data-aos][data-aos-easing=ease-in-quart],body[data-aos-easing=ease-in-quart] [data-aos]{transition-timing-function:cubic-bezier(.55,.085,.68,.53)}[data-aos][data-aos][data-aos-easing=ease-out-quart],body[data-aos-easing=ease-out-quart] [data-aos]{transition-timing-function:cubic-bezier(.25,.46,.45,.94)}[data-aos][data-aos][data-aos-easing=ease-in-out-quart],body[data-aos-easing=ease-in-out-quart] [data-aos]{transition-timing-function:cubic-bezier(.455,.03,.515,.955)}@media screen{html:not(.no-js) [data-aos^=fade][data-aos^=fade]{opacity:0;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}html:not(.no-js) [data-aos^=fade][data-aos^=fade].aos-animate{opacity:1;-webkit-transform:none;transform:none}html:not(.no-js) [data-aos=fade-up]{-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}html:not(.no-js) [data-aos=fade-down]{-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0)}html:not(.no-js) [data-aos=fade-right]{-webkit-transform:translate3d(-100px,0,0);transform:translate3d(-100px,0,0)}html:not(.no-js) [data-aos=fade-left]{-webkit-transform:translate3d(100px,0,0);transform:translate3d(100px,0,0)}html:not(.no-js) [data-aos=fade-up-right]{-webkit-transform:translate3d(-100px,100px,0);transform:translate3d(-100px,100px,0)}html:not(.no-js) [data-aos=fade-up-left]{-webkit-transform:translate3d(100px,100px,0);transform:translate3d(100px,100px,0)}html:not(.no-js) [data-aos=fade-down-right]{-webkit-transform:translate3d(-100px,-100px,0);transform:translate3d(-100px,-100px,0)}html:not(.no-js) [data-aos=fade-down-left]{-webkit-transform:translate3d(100px,-100px,0);transform:translate3d(100px,-100px,0)}html:not(.no-js) [data-aos^=zoom][data-aos^=zoom]{opacity:0;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}html:not(.no-js) [data-aos^=zoom][data-aos^=zoom].aos-animate{opacity:1;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}html:not(.no-js) [data-aos=zoom-in]{-webkit-transform:scale(.6);transform:scale(.6)}html:not(.no-js) [data-aos=zoom-in-up]{-webkit-transform:translate3d(0,100px,0) scale(.6);transform:translate3d(0,100px,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-down]{-webkit-transform:translate3d(0,-100px,0) scale(.6);transform:translate3d(0,-100px,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-right]{-webkit-transform:translate3d(-100px,0,0) scale(.6);transform:translate3d(-100px,0,0) scale(.6)}html:not(.no-js) [data-aos=zoom-in-left]{-webkit-transform:translate3d(100px,0,0) scale(.6);transform:translate3d(100px,0,0) scale(.6)}html:not(.no-js) [data-aos=zoom-out]{-webkit-transform:scale(1.2);transform:scale(1.2)}html:not(.no-js) [data-aos=zoom-out-up]{-webkit-transform:translate3d(0,100px,0) scale(1.2);transform:translate3d(0,100px,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-down]{-webkit-transform:translate3d(0,-100px,0) scale(1.2);transform:translate3d(0,-100px,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-right]{-webkit-transform:translate3d(-100px,0,0) scale(1.2);transform:translate3d(-100px,0,0) scale(1.2)}html:not(.no-js) [data-aos=zoom-out-left]{-webkit-transform:translate3d(100px,0,0) scale(1.2);transform:translate3d(100px,0,0) scale(1.2)}html:not(.no-js) [data-aos^=slide][data-aos^=slide]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;visibility:hidden}html:not(.no-js) [data-aos^=slide][data-aos^=slide].aos-animate{visibility:visible;-webkit-transform:translateZ(0);transform:translateZ(0)}html:not(.no-js) [data-aos=slide-up]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}html:not(.no-js) [data-aos=slide-down]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}html:not(.no-js) [data-aos=slide-right]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}html:not(.no-js) [data-aos=slide-left]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}html:not(.no-js) [data-aos^=flip][data-aos^=flip]{-webkit-backface-visibility:hidden;backface-visibility:hidden;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}html:not(.no-js) [data-aos=flip-left]{-webkit-transform:perspective(2500px) rotateY(-100deg);transform:perspective(2500px) rotateY(-100deg)}html:not(.no-js) [data-aos=flip-left].aos-animate{-webkit-transform:perspective(2500px) rotateY(0);transform:perspective(2500px) rotateY(0)}html:not(.no-js) [data-aos=flip-right]{-webkit-transform:perspective(2500px) rotateY(100deg);transform:perspective(2500px) rotateY(100deg)}html:not(.no-js) [data-aos=flip-right].aos-animate{-webkit-transform:perspective(2500px) rotateY(0);transform:perspective(2500px) rotateY(0)}html:not(.no-js) [data-aos=flip-up]{-webkit-transform:perspective(2500px) rotateX(-100deg);transform:perspective(2500px) rotateX(-100deg)}html:not(.no-js) [data-aos=flip-up].aos-animate{-webkit-transform:perspective(2500px) rotateX(0);transform:perspective(2500px) rotateX(0)}html:not(.no-js) [data-aos=flip-down]{-webkit-transform:perspective(2500px) rotateX(100deg);transform:perspective(2500px) rotateX(100deg)}html:not(.no-js) [data-aos=flip-down].aos-animate{-webkit-transform:perspective(2500px) rotateX(0);transform:perspective(2500px) rotateX(0)}}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/css/style.css":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader!./src/css/style.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    outline: none;\r\n}\r\n\r\nbody {\r\n    font-family: 'Roboto', sans-serif;\r\n    color: #d0d0d0;\r\n    background-color: #eee;\r\n}\r\n\r\na {\r\n    text-decoration: none;\r\n    color: #d0d0d0;\r\n}\r\n\r\n.container {\r\n    max-width: 1020px;\r\n    margin: 0 auto;\r\n    padding: 0 20px;\r\n}\r\n\r\n.flex-content {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n}\r\n\r\n.clearfix:before, .clearfix:after {\r\n    content: \"\";\r\n    display: table;\r\n}\r\n.clearfix:after { clear:both; }\r\n\r\n/*************************preheader/header**************************/\r\n\r\n.preheader {\r\n    background-color: #3b3b3d;\r\n    padding: 10px 0;\r\n}\r\n\r\n\r\n.contact-info__mail-info p, .contact-info__phone-number p{\r\n    padding-left: 20px;\r\n    margin-left: 20px;\r\n    font-size: 20px;\r\n    color: rgb(255, 255, 255);\r\n    font-weight: lighter;\r\n}\r\n\r\n.social {\r\n    max-width: 200px;\r\n}\r\n\r\nheader {\r\n    background-color: #222831;\r\n    padding: 10px 0;\r\n}\r\n\r\n.logo {\r\n    width: 400px;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.logo i {\r\n    font-size: 60px;\r\n    margin-right: 10px;\r\n}\r\n.logo p {\r\n    font-size: 18px;\r\n    line-height: 24px;\r\n}\r\n.logo span {\r\n    font-size: 30px;\r\n    margin-left: -1px;\r\n}\r\n\r\n.header__menu {\r\n    max-width: 450px;\r\n    margin-right: 20px;\r\n}\r\n.header__menu li {\r\n    font-weight: lighter;\r\n    font-size: 20px;\r\n    list-style: none;\r\n    margin-left: 30px;\r\n}\r\n\r\n.call-button {\r\n    cursor: pointer;\r\n    padding: 8px 15px;\r\n    padding-left: 35px;\r\n    background: -moz-linear-gradient( 45deg, rgb(253,240,122) 0%, rgb(254,244,151) 48%, rgb(254,247,179) 100%);\r\n    background: -webkit-linear-gradient( 45deg, rgb(253,240,122) 0%, rgb(254,244,151) 48%, rgb(254,247,179) 100%);\r\n    background: -ms-linear-gradient( 45deg, rgb(253,240,122) 0%, rgb(254,244,151) 48%, rgb(254,247,179) 100%);\r\n    background: linear-gradient( 45deg, rgb(253,240,122) 0%, rgb(254,244,151) 48%, rgb(254,247,179) 100%);\r\n    border-radius: 25px;\r\n    transition: box-shadow 0.1s;\r\n}\r\n.call-button p {\r\n    white-space: nowrap;\r\n    color: #504f48;\r\n    font-weight: 500;\r\n}\r\n.call-button:hover {\r\n    box-shadow: 0 0 8px #e6e6e6f0;\r\n}\r\n\r\n/******************section-slider*******************/\r\n\r\n.section-slider {\r\n    min-height: 650px;\r\n    background-color: cyan;\r\n}\r\n\r\n\r\n/******************section1*******************/\r\n\r\n.section-1 {\r\n    background-color: #46494c;\r\n    padding: 25px 0;\r\n    text-align: center;\r\n}\r\n\r\n.about-us-h {\r\n    display: inline-block;\r\n    margin: 0 auto;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 25px;\r\n    color: #46494c;\r\n    padding: 8px;\r\n    background-color: #eeeeee;\r\n}\r\n\r\n.about-icons {\r\n    margin-top: 40px;\r\n    color: #fff;\r\n    font-size: 14px;\r\n    font-weight: 400;\r\n}\r\n\r\n.about-icons__step {\r\n    text-align: left;\r\n    min-width: 205px;\r\n}\r\n.about-icons__step-img {\r\n    float: left;\r\n    height: 100px;\r\n    width: 90px;\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/icons/section1/icon1.png */ "./src/img/icons/section1/icon1.png")) + ");\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: contain;\r\n    margin-right: 15px;\r\n}\r\n.about-icons__step-2 {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/icons/section1/icon2.png */ "./src/img/icons/section1/icon2.png")) + ");\r\n    background-size: contain;\r\n    background-repeat: no-repeat;\r\n}\r\n.about-icons__step-3 {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/icons/section1/icon3.png */ "./src/img/icons/section1/icon3.png")) + ");\r\n    height: 120px;\r\n}\r\n\r\n\r\n.about-icons__step .content{\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    position: relative;\r\n    padding-top: 15px;\r\n    min-width: 100px;\r\n}\r\n.about-icons__step h4 {\r\n    font-size: 16px;\r\n    font-weight: bold;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n\r\n.about-arrow {\r\n    width: 70px;\r\n    height: 30px;\r\n    background: url(" + escape(__webpack_require__(/*! ../img/icons/section1/arrow.png */ "./src/img/icons/section1/arrow.png")) + ");\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: contain;\r\n    margin: 0 10px;\r\n}\r\n\r\n\r\n/***********************section-2(section-catalog)*************************/\r\n\r\n.section-catalog {\r\n    padding: 20px 0;\r\n}\r\n\r\n.section-catalog h1 {\r\n    text-align: center;\r\n    font-size: 40px;\r\n    color: #46494c;\r\n    font-weight: bold;\r\n}\r\n\r\n.catalog-cards {\r\n    margin: 30px auto;\r\n\r\n}\r\n\r\n.catalog-cards__card {\r\n    position: relative;\r\n    height: 450px;\r\n    width: 300px;\r\n    padding: 20px;\r\n    background-color: #fff;\r\n    box-shadow: 5px 5px 10px #2e2e2e55;\r\n}\r\n\r\n.catalog-cards__card .img {\r\n    margin: 0  auto;\r\n    width: 255px;\r\n    height: 250px;\r\n    background-repeat: no-repeat;\r\n    background-position: center;\r\n}\r\n\r\n.catalog-cards__card .img-1 {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/catalog-card1.jpg */ "./src/img/catalog-card1.jpg")) + ");\r\n}\r\n.catalog-cards__card .img-2 {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/catalog-card2.jpg */ "./src/img/catalog-card2.jpg")) + ");\r\n}\r\n.catalog-cards__card .img-3 {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/catalog-card3.jpg */ "./src/img/catalog-card3.jpg")) + ");\r\n}\r\n\r\n.catalog-cards__card h3 {\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n    color: #5f5f5f;\r\n    padding: 12px 15px;\r\n    margin-right: 10px;\r\n    background-color: #d0d0d0d0;\r\n    transform: translate(-10px, -18px);\r\n    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);\r\n    text-shadow: 1px 1px 5px #5f5f5ff0;\r\n}\r\n\r\n.catalog-cards__card p {\r\n    font-size: 14px;\r\n    color: #5f5f5f;\r\n    font-style: italic;\r\n    padding: 5px 7px;\r\n}\r\n\r\n.order-button {\r\n    font-size: 16px;\r\n    font-weight: 400;\r\n    padding: 5px 10px;\r\n    background-color: #fffc73;\r\n    border: none;\r\n    box-shadow: 0 3px 0 #b8b654;\r\n    color: #4a4a4a;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    bottom: 20px;\r\n    right: 20px;\r\n}\r\n\r\n/***********************section-3/section-information***********************/\r\n\r\n.section-3 {\r\n    background-color: #fdf07a;\r\n    padding: 60px 0;\r\n}\r\n.section-3 .container {\r\n    position: relative;\r\n}\r\n\r\n.information {\r\n    position: absolute;\r\n    padding: 20px 40px;\r\n    border-left: solid 6px black;\r\n    left: 40px;\r\n    top: 50%;\r\n    transform: translateY(-50%);\r\n}\r\n\r\n.information p{\r\n    max-width: 500px;\r\n    font-size: 24px;\r\n    color: rgb(42, 44, 46);\r\n    font-style: italic;\r\n}\r\n\r\n.call-form {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n    height: 100%;\r\n    width: 260px;\r\n    float: right;\r\n    align-items: center;\r\n    font-weight: 500;\r\n    font-style: italic;\r\n}\r\n\r\n.call-form input {\r\n    width: 100%;\r\n    border: none;\r\n    background-color: #ffffffb0;\r\n    padding: 7px 15px;\r\n    margin-bottom: 30px;\r\n}\r\n.call-form input:nth-last-child(1) {\r\n    box-shadow: 0 0 10px #383933a0;\r\n    cursor: pointer;\r\n    margin-bottom: 0;\r\n    width: auto;\r\n    padding: 5px 15px;\r\n    padding-left: 35px;\r\n    font-weight: 500;\r\n    font-style: italic;\r\n    color: #fdf07a;\r\n    background-color: #383933;\r\n}\r\n\r\n/*****************************section-4/section-templates**********************************/\r\n.section-4 {\r\n    padding-bottom: 60px;\r\n}\r\n\r\n.section-4 section {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin: 30px 0;\r\n    /*align-items: center;*/\r\n}\r\n\r\n.section-4 section:nth-child(even) {\r\n    flex-direction: row-reverse;\r\n}\r\n\r\n.section-4 section:nth-child(even) .section-templates__content {\r\n    text-align: right;\r\n    padding: 70px 30px 0 100px;\r\n}\r\n\r\n.big-image {\r\n    position: relative;\r\n    height: 300px;\r\n    flex-grow: 4;\r\n    background-color: cyan;\r\n    background-position: left center;\r\n    background-repeat: no-repeat;\r\n    transition: all 1s;\r\n}\r\n\r\n.big-image:hover {\r\n    height: 500px;\r\n}\r\n.big-image:hover .fas {\r\n    opacity: 0.4;\r\n}\r\n\r\n.big-image .fas {\r\n    position: absolute;\r\n    right: 20px;\r\n    bottom: 20px;\r\n    font-size: 40px;\r\n    transition: opacity 0.5s;\r\n}\r\n.section-4 section:nth-child(even) .big-image .fas {\r\n    left: 20px;\r\n}\r\n\r\n.section-templates__content {\r\n    max-width: 600px;\r\n    padding: 70px 100px 0 30px;\r\n    text-align: left;\r\n}\r\n\r\n.section-templates__content h3 {\r\n    font-size: 30px;\r\n    color: rgb(56, 57, 51);\r\n    font-weight: 500;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.section-templates__content p {\r\n    font-size: 18px;\r\n    color: rgb(56, 57, 51);\r\n    font-style: italic;\r\n}\r\n\r\n.section-templates__section-1 .big-image {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/big-image1.jpg */ "./src/img/big-image1.jpg")) + ");\r\n}\r\n.section-templates__section-2 .big-image {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/big-image2.jpg */ "./src/img/big-image2.jpg")) + ");\r\n}\r\n.section-templates__section-3 .big-image {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/big-image3.jpg */ "./src/img/big-image3.jpg")) + ");\r\n}\r\n\r\n/***********************section-5/section-recall****************************/\r\n.section-recall {\r\n    background-color: #e8e8e8;\r\n    padding-bottom: 80px;\r\n\r\n}\r\n\r\n.section-recall h1 {\r\n    text-align: center;\r\n    width: 70%;\r\n    margin: 0 auto;\r\n    margin-bottom: 40px;\r\n    padding: 7px 0;\r\n\r\n    font-size: 40px;\r\n    color: rgb(255, 255, 255);\r\n    font-weight: bold;\r\n    text-shadow: 0px -2px 0px rgba(193, 192, 192, 0.86);\r\n    background-color: #3b3b3d;\r\n\r\n    background-color: rgba(59, 59, 61, 0.3);\r\n    box-shadow: 0 3px 15px 2px rgba(52, 52, 54, 0.30),0 -4px 0 0 rgba(30, 30, 31, 0.004);\r\n    transform: translateY(-20px);\r\n}\r\n\r\n.recalls {\r\n    display: flex;\r\n    justify-content: space-around;\r\n\r\n}\r\n\r\n.recall {\r\n    padding: 30px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    background-color: white;\r\n    border: solid 1px #d1d0d0;\r\n    max-width: 470px;\r\n    align-items: center;\r\n}\r\n\r\n.recall__avatar {\r\n    height: 100px;\r\n    width: 100px;\r\n    border-radius: 50px;\r\n    background-color: cyan;\r\n    margin-bottom: 10px;\r\n\r\n    background-size: cover;\r\n    background-position: center;\r\n}\r\n\r\n.recall h3 {\r\n    font-size: 18px;\r\n    color: rgb(0, 0, 0);\r\n    margin-bottom: 25px;\r\n}\r\n\r\n.recall p {\r\n    font-size: 16px;\r\n    color: rgb(0, 0, 0);\r\n    font-style: italic;\r\n    text-align: center;\r\n    line-height: 24px;\r\n}\r\n\r\n.recall:nth-child(1) .recall__avatar {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/recall_avatar1.jpg */ "./src/img/recall_avatar1.jpg")) + ");\r\n}\r\n.recall:nth-child(2) .recall__avatar {\r\n    background-image: url(" + escape(__webpack_require__(/*! ../img/recall_avatar2.jpg */ "./src/img/recall_avatar2.jpg")) + ");\r\n}\r\n\r\n/***********************footer****************************/\r\n\r\nfooter {\r\n    background-color: #3b3b3d;\r\n    padding: 30px 0;\r\n\r\n}\r\n\r\nfooter .container {\r\n    display: flex;\r\n    justify-content: space-around;\r\n}\r\n\r\nfooter .container > div {\r\n    width: 30%;\r\n}\r\n\r\n.footer-logo {\r\n    width: 300px;\r\n}\r\n\r\n.footer-logo ul {\r\n    padding-left: 20px;\r\n    font-size: 16px;\r\n    line-height: 1.2;\r\n    font-weight: 400;\r\n}\r\n\r\nfooter .logo i{\r\n    font-size: 70px;\r\n}\r\nfooter .logo p {\r\n    font-size: 24px;\r\n    line-height: 32px;\r\n}\r\nfooter .logo span {\r\n    font-size: 40px;\r\n}\r\n\r\n.footer-cell-form {\r\n    padding: 20px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-around;\r\n}\r\n\r\n.footer-cell-form input {\r\n    padding: 7px;\r\n    padding-left: 10px;\r\n    background-color: #f6f6f6a0;\r\n    border: none;\r\n    border-radius: 20px;\r\n}\r\n\r\nfooter .footer-contact {\r\n    margin-left: 60px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-around;\r\n}\r\n\r\n/***********************section-post-footer*******************************/\r\n.section-post-footer {\r\n    padding: 7px 0;\r\n}\r\n\r\n.section-post-footer p {\r\n    font-size: 16px;\r\n    color: #323234;\r\n    text-align: center;\r\n}\r\n.section-post-footer a {\r\n    margin: 0 auto;\r\n    cursor: pointer;\r\n    color: #217de4;\r\n    text-decoration: underline;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/css/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/css/style.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/css/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/img/big-image1.jpg":
/*!********************************!*\
  !*** ./src/img/big-image1.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "42b6b7a1aa38792a2a6a3bf1c4008068.jpg";

/***/ }),

/***/ "./src/img/big-image2.jpg":
/*!********************************!*\
  !*** ./src/img/big-image2.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c86f924c81e4e82bc54d4ff9677dc297.jpg";

/***/ }),

/***/ "./src/img/big-image3.jpg":
/*!********************************!*\
  !*** ./src/img/big-image3.jpg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9f893246f160001be523331f8f26fa6b.jpg";

/***/ }),

/***/ "./src/img/catalog-card1.jpg":
/*!***********************************!*\
  !*** ./src/img/catalog-card1.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2c749b03e148cb59fbd0edf8c1e4fb9e.jpg";

/***/ }),

/***/ "./src/img/catalog-card2.jpg":
/*!***********************************!*\
  !*** ./src/img/catalog-card2.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "135aaf31e48847726b4b216129d5ba0f.jpg";

/***/ }),

/***/ "./src/img/catalog-card3.jpg":
/*!***********************************!*\
  !*** ./src/img/catalog-card3.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b9b0d362f8170df5ce085f9d2ced06e1.jpg";

/***/ }),

/***/ "./src/img/icons/section1/arrow.png":
/*!******************************************!*\
  !*** ./src/img/icons/section1/arrow.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3c259c682aa009a81164b7fda84a1139.png";

/***/ }),

/***/ "./src/img/icons/section1/icon1.png":
/*!******************************************!*\
  !*** ./src/img/icons/section1/icon1.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "70d6c1c41d127eb67cc17ef22f6ed29d.png";

/***/ }),

/***/ "./src/img/icons/section1/icon2.png":
/*!******************************************!*\
  !*** ./src/img/icons/section1/icon2.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fab3cc144fa561a1fa7510b36a83f5f3.png";

/***/ }),

/***/ "./src/img/icons/section1/icon3.png":
/*!******************************************!*\
  !*** ./src/img/icons/section1/icon3.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5cbf34b625ed40144aba3a78fe74541b.png";

/***/ }),

/***/ "./src/img/recall_avatar1.jpg":
/*!************************************!*\
  !*** ./src/img/recall_avatar1.jpg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c908556427087bf5a205a28dbc6f30f1.jpg";

/***/ }),

/***/ "./src/img/recall_avatar2.jpg":
/*!************************************!*\
  !*** ./src/img/recall_avatar2.jpg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a749c732f90f30658f028ff12441102d.jpg";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aos/dist/aos.css */ "./node_modules/aos/dist/aos.css");
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_2__);





aos__WEBPACK_IMPORTED_MODULE_1___default.a.init();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fvcy9kaXN0L2Fvcy5jc3M/ZTZkZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW9zL2Rpc3QvYW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hb3MvZGlzdC9hb3MuY3NzIiwid2VicGFjazovLy8uL3NyYy9jc3Mvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvdXJsL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3Mvc3R5bGUuY3NzPzU3ZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9iaWctaW1hZ2UxLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1nL2JpZy1pbWFnZTIuanBnIiwid2VicGFjazovLy8uL3NyYy9pbWcvYmlnLWltYWdlMy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9jYXRhbG9nLWNhcmQxLmpwZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1nL2NhdGFsb2ctY2FyZDIuanBnIiwid2VicGFjazovLy8uL3NyYy9pbWcvY2F0YWxvZy1jYXJkMy5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9pY29ucy9zZWN0aW9uMS9hcnJvdy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9pY29ucy9zZWN0aW9uMS9pY29uMS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9pY29ucy9zZWN0aW9uMS9pY29uMi5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9pY29ucy9zZWN0aW9uMS9pY29uMy5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9yZWNhbGxfYXZhdGFyMS5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltZy9yZWNhbGxfYXZhdGFyMi5qcGciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7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Rix5QkFBeUIscUZBQXFGLG9CQUFvQiw2R0FBNkcsc0JBQXNCLDJGQUEyRix3QkFBd0IscUZBQXFGLG9CQUFvQiw2R0FBNkcscUJBQXFCLDJGQUEyRix5QkFBeUIscUZBQXFGLG9CQUFvQiw2R0FBNkcsc0JBQXNCLDJGQUEyRix3QkFBd0IscUZBQXFGLG9CQUFvQiw2R0FBNkcscUJBQXFCLDJGQUEyRix5QkFBeUIscUZBQXFGLG9CQUFvQiw2R0FBNkcsc0JBQXNCLDZGQUE2Rix1QkFBdUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csb0JBQW9CLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix1QkFBdUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csb0JBQW9CLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVCLDZGQUE2Rix5QkFBeUIsdUZBQXVGLG9CQUFvQiwrR0FBK0csc0JBQXNCLDZGQUE2RiwwQkFBMEIsdUZBQXVGLG9CQUFvQiwrR0FBK0csdUJBQXVC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QUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBLEtBQUssS0FBd0MsRUFBRSxFQUU3Qzs7QUFFRixRQUFRLHNCQUFpQjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVyxFQUFFO0FBQ3JELHdDQUF3QyxXQUFXLEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBLDhEQUE4RDtBQUM5RDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7QUNsQkEsY0FBYyxtQkFBTyxDQUFDLDBHQUFzRDs7QUFFNUUsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDBHQUFzRDtBQUN6RSxtQkFBbUIsbUJBQU8sQ0FBQywwR0FBc0Q7O0FBRWpGLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7OztBQzVDQSxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBeUI7O0FBRUg7QUFDSTs7QUFFMUIsMENBQUcsUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjU3NjIwYWI5ZTAwNWRlYTk0MDBcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2Fvcy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2Fvcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vYW9zLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOmUuQU9TPXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6e30sdD1cIkV4cGVjdGVkIGEgZnVuY3Rpb25cIixuPU5hTixvPVwiW29iamVjdCBTeW1ib2xdXCIsaT0vXlxccyt8XFxzKyQvZyxhPS9eWy0rXTB4WzAtOWEtZl0rJC9pLHI9L14wYlswMV0rJC9pLGM9L14wb1swLTddKyQvaSxzPXBhcnNlSW50LHU9XCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuT2JqZWN0PT09T2JqZWN0JiZlLGQ9XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLGw9dXx8ZHx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLGY9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxtPU1hdGgubWF4LHA9TWF0aC5taW4sYj1mdW5jdGlvbigpe3JldHVybiBsLkRhdGUubm93KCl9O2Z1bmN0aW9uIHYoZSxuLG8pe3ZhciBpLGEscixjLHMsdSxkPTAsbD0hMSxmPSExLHY9ITA7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKHQpO2Z1bmN0aW9uIHkodCl7dmFyIG49aSxvPWE7cmV0dXJuIGk9YT12b2lkIDAsZD10LGM9ZS5hcHBseShvLG4pfWZ1bmN0aW9uIGgoZSl7dmFyIHQ9ZS11O3JldHVybiB2b2lkIDA9PT11fHx0Pj1ufHx0PDB8fGYmJmUtZD49cn1mdW5jdGlvbiBrKCl7dmFyIGU9YigpO2lmKGgoZSkpcmV0dXJuIHgoZSk7cz1zZXRUaW1lb3V0KGssZnVuY3Rpb24oZSl7dmFyIHQ9bi0oZS11KTtyZXR1cm4gZj9wKHQsci0oZS1kKSk6dH0oZSkpfWZ1bmN0aW9uIHgoZSl7cmV0dXJuIHM9dm9pZCAwLHYmJmk/eShlKTooaT1hPXZvaWQgMCxjKX1mdW5jdGlvbiBPKCl7dmFyIGU9YigpLHQ9aChlKTtpZihpPWFyZ3VtZW50cyxhPXRoaXMsdT1lLHQpe2lmKHZvaWQgMD09PXMpcmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBkPWUscz1zZXRUaW1lb3V0KGssbiksbD95KGUpOmN9KHUpO2lmKGYpcmV0dXJuIHM9c2V0VGltZW91dChrLG4pLHkodSl9cmV0dXJuIHZvaWQgMD09PXMmJihzPXNldFRpbWVvdXQoayxuKSksY31yZXR1cm4gbj13KG4pfHwwLGcobykmJihsPSEhby5sZWFkaW5nLHI9KGY9XCJtYXhXYWl0XCJpbiBvKT9tKHcoby5tYXhXYWl0KXx8MCxuKTpyLHY9XCJ0cmFpbGluZ1wiaW4gbz8hIW8udHJhaWxpbmc6diksTy5jYW5jZWw9ZnVuY3Rpb24oKXt2b2lkIDAhPT1zJiZjbGVhclRpbWVvdXQocyksZD0wLGk9dT1hPXM9dm9pZCAwfSxPLmZsdXNoPWZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PXM/Yzp4KGIoKSl9LE99ZnVuY3Rpb24gZyhlKXt2YXIgdD10eXBlb2YgZTtyZXR1cm4hIWUmJihcIm9iamVjdFwiPT10fHxcImZ1bmN0aW9uXCI9PXQpfWZ1bmN0aW9uIHcoZSl7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpcmV0dXJuIGU7aWYoZnVuY3Rpb24oZSl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIGV8fGZ1bmN0aW9uKGUpe3JldHVybiEhZSYmXCJvYmplY3RcIj09dHlwZW9mIGV9KGUpJiZmLmNhbGwoZSk9PW99KGUpKXJldHVybiBuO2lmKGcoZSkpe3ZhciB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIGUudmFsdWVPZj9lLnZhbHVlT2YoKTplO2U9Zyh0KT90K1wiXCI6dH1pZihcInN0cmluZ1wiIT10eXBlb2YgZSlyZXR1cm4gMD09PWU/ZTorZTtlPWUucmVwbGFjZShpLFwiXCIpO3ZhciB1PXIudGVzdChlKTtyZXR1cm4gdXx8Yy50ZXN0KGUpP3MoZS5zbGljZSgyKSx1PzI6OCk6YS50ZXN0KGUpP246K2V9dmFyIHk9ZnVuY3Rpb24oZSxuLG8pe3ZhciBpPSEwLGE9ITA7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKHQpO3JldHVybiBnKG8pJiYoaT1cImxlYWRpbmdcImluIG8/ISFvLmxlYWRpbmc6aSxhPVwidHJhaWxpbmdcImluIG8/ISFvLnRyYWlsaW5nOmEpLHYoZSxuLHtsZWFkaW5nOmksbWF4V2FpdDpuLHRyYWlsaW5nOmF9KX0saD1cIkV4cGVjdGVkIGEgZnVuY3Rpb25cIixrPU5hTix4PVwiW29iamVjdCBTeW1ib2xdXCIsTz0vXlxccyt8XFxzKyQvZyxqPS9eWy0rXTB4WzAtOWEtZl0rJC9pLEU9L14wYlswMV0rJC9pLE49L14wb1swLTddKyQvaSx6PXBhcnNlSW50LEM9XCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJmUuT2JqZWN0PT09T2JqZWN0JiZlLEE9XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLHE9Q3x8QXx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLEw9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxUPU1hdGgubWF4LE09TWF0aC5taW4sUz1mdW5jdGlvbigpe3JldHVybiBxLkRhdGUubm93KCl9O2Z1bmN0aW9uIEQoZSl7dmFyIHQ9dHlwZW9mIGU7cmV0dXJuISFlJiYoXCJvYmplY3RcIj09dHx8XCJmdW5jdGlvblwiPT10KX1mdW5jdGlvbiBIKGUpe2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXJldHVybiBlO2lmKGZ1bmN0aW9uKGUpe3JldHVyblwic3ltYm9sXCI9PXR5cGVvZiBlfHxmdW5jdGlvbihlKXtyZXR1cm4hIWUmJlwib2JqZWN0XCI9PXR5cGVvZiBlfShlKSYmTC5jYWxsKGUpPT14fShlKSlyZXR1cm4gaztpZihEKGUpKXt2YXIgdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnZhbHVlT2Y/ZS52YWx1ZU9mKCk6ZTtlPUQodCk/dCtcIlwiOnR9aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpcmV0dXJuIDA9PT1lP2U6K2U7ZT1lLnJlcGxhY2UoTyxcIlwiKTt2YXIgbj1FLnRlc3QoZSk7cmV0dXJuIG58fE4udGVzdChlKT96KGUuc2xpY2UoMiksbj8yOjgpOmoudGVzdChlKT9rOitlfXZhciAkPWZ1bmN0aW9uKGUsdCxuKXt2YXIgbyxpLGEscixjLHMsdT0wLGQ9ITEsbD0hMSxmPSEwO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihoKTtmdW5jdGlvbiBtKHQpe3ZhciBuPW8sYT1pO3JldHVybiBvPWk9dm9pZCAwLHU9dCxyPWUuYXBwbHkoYSxuKX1mdW5jdGlvbiBwKGUpe3ZhciBuPWUtcztyZXR1cm4gdm9pZCAwPT09c3x8bj49dHx8bjwwfHxsJiZlLXU+PWF9ZnVuY3Rpb24gYigpe3ZhciBlPVMoKTtpZihwKGUpKXJldHVybiB2KGUpO2M9c2V0VGltZW91dChiLGZ1bmN0aW9uKGUpe3ZhciBuPXQtKGUtcyk7cmV0dXJuIGw/TShuLGEtKGUtdSkpOm59KGUpKX1mdW5jdGlvbiB2KGUpe3JldHVybiBjPXZvaWQgMCxmJiZvP20oZSk6KG89aT12b2lkIDAscil9ZnVuY3Rpb24gZygpe3ZhciBlPVMoKSxuPXAoZSk7aWYobz1hcmd1bWVudHMsaT10aGlzLHM9ZSxuKXtpZih2b2lkIDA9PT1jKXJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdT1lLGM9c2V0VGltZW91dChiLHQpLGQ/bShlKTpyfShzKTtpZihsKXJldHVybiBjPXNldFRpbWVvdXQoYix0KSxtKHMpfXJldHVybiB2b2lkIDA9PT1jJiYoYz1zZXRUaW1lb3V0KGIsdCkpLHJ9cmV0dXJuIHQ9SCh0KXx8MCxEKG4pJiYoZD0hIW4ubGVhZGluZyxhPShsPVwibWF4V2FpdFwiaW4gbik/VChIKG4ubWF4V2FpdCl8fDAsdCk6YSxmPVwidHJhaWxpbmdcImluIG4/ISFuLnRyYWlsaW5nOmYpLGcuY2FuY2VsPWZ1bmN0aW9uKCl7dm9pZCAwIT09YyYmY2xlYXJUaW1lb3V0KGMpLHU9MCxvPXM9aT1jPXZvaWQgMH0sZy5mbHVzaD1mdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT1jP3I6dihTKCkpfSxnfSxXPWZ1bmN0aW9uKCl7fTtmdW5jdGlvbiBQKGUpe2UmJmUuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlLmFkZGVkTm9kZXMpLG49QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZS5yZW1vdmVkTm9kZXMpO2lmKGZ1bmN0aW9uIGUodCl7dmFyIG49dm9pZCAwLG89dm9pZCAwO2ZvcihuPTA7bjx0Lmxlbmd0aDtuKz0xKXtpZigobz10W25dKS5kYXRhc2V0JiZvLmRhdGFzZXQuYW9zKXJldHVybiEwO2lmKG8uY2hpbGRyZW4mJmUoby5jaGlsZHJlbikpcmV0dXJuITB9cmV0dXJuITF9KHQuY29uY2F0KG4pKSlyZXR1cm4gVygpfSl9ZnVuY3Rpb24gWSgpe3JldHVybiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcnx8d2luZG93LldlYktpdE11dGF0aW9uT2JzZXJ2ZXJ8fHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyfXZhciBfPXtpc1N1cHBvcnRlZDpmdW5jdGlvbigpe3JldHVybiEhWSgpfSxyZWFkeTpmdW5jdGlvbihlLHQpe3ZhciBuPXdpbmRvdy5kb2N1bWVudCxvPW5ldyhZKCkpKFApO1c9dCxvLm9ic2VydmUobi5kb2N1bWVudEVsZW1lbnQse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwLHJlbW92ZWROb2RlczohMH0pfX0sQj1mdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9LEY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl07by5lbnVtZXJhYmxlPW8uZW51bWVyYWJsZXx8ITEsby5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbyYmKG8ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG8ua2V5LG8pfX1yZXR1cm4gZnVuY3Rpb24odCxuLG8pe3JldHVybiBuJiZlKHQucHJvdG90eXBlLG4pLG8mJmUodCxvKSx0fX0oKSxJPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciBuPWFyZ3VtZW50c1t0XTtmb3IodmFyIG8gaW4gbilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobixvKSYmKGVbb109bltvXSl9cmV0dXJuIGV9LEs9LyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLEc9LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2ksSj0vKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2ksUT0vMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaTtmdW5jdGlvbiBSKCl7cmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnR8fG5hdmlnYXRvci52ZW5kb3J8fHdpbmRvdy5vcGVyYXx8XCJcIn12YXIgVT1uZXcoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7Qih0aGlzLGUpfXJldHVybiBGKGUsW3trZXk6XCJwaG9uZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9UigpO3JldHVybiEoIUsudGVzdChlKSYmIUcudGVzdChlLnN1YnN0cigwLDQpKSl9fSx7a2V5OlwibW9iaWxlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1SKCk7cmV0dXJuISghSi50ZXN0KGUpJiYhUS50ZXN0KGUuc3Vic3RyKDAsNCkpKX19LHtrZXk6XCJ0YWJsZXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1vYmlsZSgpJiYhdGhpcy5waG9uZSgpfX0se2tleTpcImllMTFcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwiLW1zLXNjcm9sbC1saW1pdFwiaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlJiZcIi1tcy1pbWUtYWxpZ25cImluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZX19XSksZX0oKSksVj1mdW5jdGlvbihlLHQpe3ZhciBuPXZvaWQgMDtyZXR1cm4gVS5pZTExKCk/KG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKSkuaW5pdEN1c3RvbUV2ZW50KGUsITAsITAse2RldGFpbDp0fSk6bj1uZXcgQ3VzdG9tRXZlbnQoZSx7ZGV0YWlsOnR9KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG4pfSxYPWZ1bmN0aW9uKGUpe3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24oZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgbj1lLm9wdGlvbnMsbz1lLnBvc2l0aW9uLGk9ZS5ub2RlLGE9KGUuZGF0YSxmdW5jdGlvbigpe2UuYW5pbWF0ZWQmJihmdW5jdGlvbihlLHQpe3QmJnQuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZS5jbGFzc0xpc3QucmVtb3ZlKHQpfSl9KGksbi5hbmltYXRlZENsYXNzTmFtZXMpLFYoXCJhb3M6b3V0XCIsaSksZS5vcHRpb25zLmlkJiZWKFwiYW9zOmluOlwiK2Uub3B0aW9ucy5pZCxpKSxlLmFuaW1hdGVkPSExKX0pO24ubWlycm9yJiZ0Pj1vLm91dCYmIW4ub25jZT9hKCk6dD49by5pbj9lLmFuaW1hdGVkfHwoZnVuY3Rpb24oZSx0KXt0JiZ0LmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuY2xhc3NMaXN0LmFkZCh0KX0pfShpLG4uYW5pbWF0ZWRDbGFzc05hbWVzKSxWKFwiYW9zOmluXCIsaSksZS5vcHRpb25zLmlkJiZWKFwiYW9zOmluOlwiK2Uub3B0aW9ucy5pZCxpKSxlLmFuaW1hdGVkPSEwKTplLmFuaW1hdGVkJiYhbi5vbmNlJiZhKCl9KGUsd2luZG93LnBhZ2VZT2Zmc2V0KX0pfSxaPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD0wLG49MDtlJiYhaXNOYU4oZS5vZmZzZXRMZWZ0KSYmIWlzTmFOKGUub2Zmc2V0VG9wKTspdCs9ZS5vZmZzZXRMZWZ0LShcIkJPRFlcIiE9ZS50YWdOYW1lP2Uuc2Nyb2xsTGVmdDowKSxuKz1lLm9mZnNldFRvcC0oXCJCT0RZXCIhPWUudGFnTmFtZT9lLnNjcm9sbFRvcDowKSxlPWUub2Zmc2V0UGFyZW50O3JldHVybnt0b3A6bixsZWZ0OnR9fSxlZT1mdW5jdGlvbihlLHQsbil7dmFyIG89ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFvcy1cIit0KTtpZih2b2lkIDAhPT1vKXtpZihcInRydWVcIj09PW8pcmV0dXJuITA7aWYoXCJmYWxzZVwiPT09bylyZXR1cm4hMX1yZXR1cm4gb3x8bn0sdGU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKGUsbil7dmFyIG89ZWUoZS5ub2RlLFwibWlycm9yXCIsdC5taXJyb3IpLGk9ZWUoZS5ub2RlLFwib25jZVwiLHQub25jZSksYT1lZShlLm5vZGUsXCJpZFwiKSxyPXQudXNlQ2xhc3NOYW1lcyYmZS5ub2RlLmdldEF0dHJpYnV0ZShcImRhdGEtYW9zXCIpLGM9W3QuYW5pbWF0ZWRDbGFzc05hbWVdLmNvbmNhdChyP3Iuc3BsaXQoXCIgXCIpOltdKS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV9KTt0LmluaXRDbGFzc05hbWUmJmUubm9kZS5jbGFzc0xpc3QuYWRkKHQuaW5pdENsYXNzTmFtZSksZS5wb3NpdGlvbj17aW46ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPXdpbmRvdy5pbm5lckhlaWdodCxpPWVlKGUsXCJhbmNob3JcIiksYT1lZShlLFwiYW5jaG9yLXBsYWNlbWVudFwiKSxyPU51bWJlcihlZShlLFwib2Zmc2V0XCIsYT8wOnQpKSxjPWF8fG4scz1lO2kmJmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaSkmJihzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoaSlbMF0pO3ZhciB1PVoocykudG9wLW87c3dpdGNoKGMpe2Nhc2VcInRvcC1ib3R0b21cIjpicmVhaztjYXNlXCJjZW50ZXItYm90dG9tXCI6dSs9cy5vZmZzZXRIZWlnaHQvMjticmVhaztjYXNlXCJib3R0b20tYm90dG9tXCI6dSs9cy5vZmZzZXRIZWlnaHQ7YnJlYWs7Y2FzZVwidG9wLWNlbnRlclwiOnUrPW8vMjticmVhaztjYXNlXCJjZW50ZXItY2VudGVyXCI6dSs9by8yK3Mub2Zmc2V0SGVpZ2h0LzI7YnJlYWs7Y2FzZVwiYm90dG9tLWNlbnRlclwiOnUrPW8vMitzLm9mZnNldEhlaWdodDticmVhaztjYXNlXCJ0b3AtdG9wXCI6dSs9bzticmVhaztjYXNlXCJib3R0b20tdG9wXCI6dSs9bytzLm9mZnNldEhlaWdodDticmVhaztjYXNlXCJjZW50ZXItdG9wXCI6dSs9bytzLm9mZnNldEhlaWdodC8yfXJldHVybiB1K3J9KGUubm9kZSx0Lm9mZnNldCx0LmFuY2hvclBsYWNlbWVudCksb3V0Om8mJmZ1bmN0aW9uKGUsdCl7d2luZG93LmlubmVySGVpZ2h0O3ZhciBuPWVlKGUsXCJhbmNob3JcIiksbz1lZShlLFwib2Zmc2V0XCIsdCksaT1lO3JldHVybiBuJiZkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG4pJiYoaT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG4pWzBdKSxaKGkpLnRvcCtpLm9mZnNldEhlaWdodC1vfShlLm5vZGUsdC5vZmZzZXQpfSxlLm9wdGlvbnM9e29uY2U6aSxtaXJyb3I6byxhbmltYXRlZENsYXNzTmFtZXM6YyxpZDphfX0pLGV9LG5lPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWFvc11cIik7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlLGZ1bmN0aW9uKGUpe3JldHVybntub2RlOmV9fSl9LG9lPVtdLGllPSExLGFlPXtvZmZzZXQ6MTIwLGRlbGF5OjAsZWFzaW5nOlwiZWFzZVwiLGR1cmF0aW9uOjQwMCxkaXNhYmxlOiExLG9uY2U6ITEsbWlycm9yOiExLGFuY2hvclBsYWNlbWVudDpcInRvcC1ib3R0b21cIixzdGFydEV2ZW50OlwiRE9NQ29udGVudExvYWRlZFwiLGFuaW1hdGVkQ2xhc3NOYW1lOlwiYW9zLWFuaW1hdGVcIixpbml0Q2xhc3NOYW1lOlwiYW9zLWluaXRcIix1c2VDbGFzc05hbWVzOiExLGRpc2FibGVNdXRhdGlvbk9ic2VydmVyOiExLHRocm90dGxlRGVsYXk6OTksZGVib3VuY2VEZWxheTo1MH0scmU9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuYWxsJiYhd2luZG93LmF0b2J9LGNlPWZ1bmN0aW9uKCl7YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSYmKGllPSEwKSxpZSYmKG9lPXRlKG9lLGFlKSxYKG9lKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHkoZnVuY3Rpb24oKXtYKG9lLGFlLm9uY2UpfSxhZS50aHJvdHRsZURlbGF5KSkpfSxzZT1mdW5jdGlvbigpe2lmKG9lPW5lKCksZGUoYWUuZGlzYWJsZSl8fHJlKCkpcmV0dXJuIHVlKCk7Y2UoKX0sdWU9ZnVuY3Rpb24oKXtvZS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7ZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYW9zXCIpLGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWFvcy1lYXNpbmdcIiksZS5ub2RlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYW9zLWR1cmF0aW9uXCIpLGUubm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWFvcy1kZWxheVwiKSxhZS5pbml0Q2xhc3NOYW1lJiZlLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShhZS5pbml0Q2xhc3NOYW1lKSxhZS5hbmltYXRlZENsYXNzTmFtZSYmZS5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoYWUuYW5pbWF0ZWRDbGFzc05hbWUpfSl9LGRlPWZ1bmN0aW9uKGUpe3JldHVybiEwPT09ZXx8XCJtb2JpbGVcIj09PWUmJlUubW9iaWxlKCl8fFwicGhvbmVcIj09PWUmJlUucGhvbmUoKXx8XCJ0YWJsZXRcIj09PWUmJlUudGFibGV0KCl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJiEwPT09ZSgpfTtyZXR1cm57aW5pdDpmdW5jdGlvbihlKXtyZXR1cm4gYWU9SShhZSxlKSxvZT1uZSgpLGFlLmRpc2FibGVNdXRhdGlvbk9ic2VydmVyfHxfLmlzU3VwcG9ydGVkKCl8fChjb25zb2xlLmluZm8oJ1xcbiAgICAgIGFvczogTXV0YXRpb25PYnNlcnZlciBpcyBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgYnJvd3NlcixcXG4gICAgICBjb2RlIG11dGF0aW9ucyBvYnNlcnZpbmcgaGFzIGJlZW4gZGlzYWJsZWQuXFxuICAgICAgWW91IG1heSBoYXZlIHRvIGNhbGwgXCJyZWZyZXNoSGFyZCgpXCIgYnkgeW91cnNlbGYuXFxuICAgICcpLGFlLmRpc2FibGVNdXRhdGlvbk9ic2VydmVyPSEwKSxhZS5kaXNhYmxlTXV0YXRpb25PYnNlcnZlcnx8Xy5yZWFkeShcIltkYXRhLWFvc11cIixzZSksZGUoYWUuZGlzYWJsZSl8fHJlKCk/dWUoKTooZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuc2V0QXR0cmlidXRlKFwiZGF0YS1hb3MtZWFzaW5nXCIsYWUuZWFzaW5nKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFvcy1kdXJhdGlvblwiLGFlLmR1cmF0aW9uKSxkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFvcy1kZWxheVwiLGFlLmRlbGF5KSwtMT09PVtcIkRPTUNvbnRlbnRMb2FkZWRcIixcImxvYWRcIl0uaW5kZXhPZihhZS5zdGFydEV2ZW50KT9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFlLnN0YXJ0RXZlbnQsZnVuY3Rpb24oKXtjZSghMCl9KTp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe2NlKCEwKX0pLFwiRE9NQ29udGVudExvYWRlZFwiPT09YWUuc3RhcnRFdmVudCYmW1wiY29tcGxldGVcIixcImludGVyYWN0aXZlXCJdLmluZGV4T2YoZG9jdW1lbnQucmVhZHlTdGF0ZSk+LTEmJmNlKCEwKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCQoY2UsYWUuZGVib3VuY2VEZWxheSwhMCkpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwkKGNlLGFlLmRlYm91bmNlRGVsYXksITApKSxvZSl9LHJlZnJlc2g6Y2UscmVmcmVzaEhhcmQ6c2V9fSk7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiW2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246NTBtc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiNTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTo1MG1zfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjFzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxMDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouMXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjE1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjE1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouMTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouMTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjJzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyMDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouMnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjI1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjI1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouMjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouMjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIzMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjNzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIzMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjMwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjMwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouM3N9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjM1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjM1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouMzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIzNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIzNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjM1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjM1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouMzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI0MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI0MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjRzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI0MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI0MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjQwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjQwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjQ1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjQ1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouNDVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI0NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI0NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjQ1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjQ1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNDVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI1MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI1MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjUwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjUwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjU1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjU1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouNTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI1NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI1NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjU1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjU1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI2MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjZzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI2MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjYwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjYwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjY1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjY1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouNjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI2NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI2NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjY1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjY1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI3MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI3MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjdzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI3MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI3MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjcwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjcwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouN3N9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjc1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjc1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouNzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI3NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI3NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjc1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjc1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouNzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI4MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjhzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI4MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjgwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjgwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouOHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjg1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjg1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouODVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI4NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI4NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjg1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjg1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouODVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCI5MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246LjlzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI5MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjkwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjkwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouOXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjk1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjk1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjouOTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCI5NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCI5NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjk1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjk1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheTouOTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTAwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTAwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEwMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEwMDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMDAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjFzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMDUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTA1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjA1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTA1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEwNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEwNTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMDUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuMDVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMTAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTEwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjFzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxMTAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTEwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTEwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjExMDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS4xc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTE1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjExNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS4xNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjExNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMTUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxMTUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTE1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjE1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTIwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjEyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS4yc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTIwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEyMDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMjAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuMnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjEyNTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMjUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuMjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxMjUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTI1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTI1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEyNTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS4yNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjEzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMzAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuM3N9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMzAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxMzAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTMwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjNzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxMzUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTM1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjM1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTM1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjEzNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjEzNTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxMzUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuMzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxNDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTQwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjRzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTQwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTQwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE0MDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS40c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTQ1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjE0NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS40NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE0NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNDUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNDUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTQ1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjQ1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTUwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjE1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS41c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTUwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE1MDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNTAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjE1NTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxNTUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuNTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNTUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTU1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTU1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE1NTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS41NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjE2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxNjAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuNnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNjAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNjAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTYwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjZzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxNjUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTY1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjY1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTY1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE2NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE2NTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNjUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuNjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxNzAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTcwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjdzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNzAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTcwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTcwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE3MDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS43c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTc1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjE3NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS43NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE3NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxNzUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxNzUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTc1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjc1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTgwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjE4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246MS44c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTgwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE4MDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxODAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuOHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjE4NTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxODUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuODVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxODUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTg1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTg1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE4NTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6MS44NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjE5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxOTAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjEuOXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxOTAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIxOTAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMTkwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToxLjlzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIxOTUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMTk1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoxLjk1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMTk1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjE5NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjE5NTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIxOTUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjEuOTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjAwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjAwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIwMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIwMDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMDAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjJzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMDUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjA1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjA1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjA1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIwNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIwNTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMDUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuMDVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMTAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjEwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjFzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyMTAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjEwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjEwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIxMDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi4xc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjE1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjIxNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi4xNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIxNTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMTUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyMTUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjE1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjE1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjIwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjIyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi4yc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjIwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIyMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIyMDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMjAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuMnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjIyNTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMjUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuMjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyMjUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjI1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjI1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIyNTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi4yNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjIzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMzAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuM3N9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIzMDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMzAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyMzAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjMwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjNzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyMzUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjM1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjM1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjM1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjIzNTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjIzNTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyMzUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuMzVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyNDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjQwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjRzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjQwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjQwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI0MDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi40c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjQ1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjI0NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi40NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI0NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNDUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNDUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjQ1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjQ1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjUwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjI1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi41c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjUwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI1MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI1MDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNTAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuNXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjI1NTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyNTUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuNTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNTUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjU1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjU1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI1NTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi41NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjI2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyNjAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuNnN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI2MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNjAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNjAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjYwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjZzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyNjUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjY1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjY1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjY1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI2NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI2NTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNjUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuNjVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyNzAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjcwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjdzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNzAwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjcwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjcwMFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI3MDBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi43c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjc1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjI3NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi43NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI3NTBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyNzUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyNzUwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjc1MFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjc1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjgwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZHVyYXRpb249XFxcIjI4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZHVyYXRpb246Mi44c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjgwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI4MDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI4MDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyODAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuOHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjI4NTBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyODUwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuODVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyODUwXFxcIl0sYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjg1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kZWxheTowc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjg1MFxcXCJdLmFvcy1hbmltYXRlLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI4NTBcXFwiXSBbZGF0YS1hb3NdLmFvcy1hbmltYXRle3RyYW5zaXRpb24tZGVsYXk6Mi44NXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZHVyYXRpb249XFxcIjI5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyOTAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWR1cmF0aW9uOjIuOXN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI5MDBcXFwiXSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyOTAwXFxcIl0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLWRlbGF5OjBzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWRlbGF5PVxcXCIyOTAwXFxcIl0uYW9zLWFuaW1hdGUsYm9keVtkYXRhLWFvcy1kZWxheT1cXFwiMjkwMFxcXCJdIFtkYXRhLWFvc10uYW9zLWFuaW1hdGV7dHJhbnNpdGlvbi1kZWxheToyLjlzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIyOTUwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMjk1MFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjoyLjk1c31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMjk1MFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjI5NTBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjI5NTBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIyOTUwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjIuOTVzfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWR1cmF0aW9uPVxcXCIzMDAwXFxcIl0sYm9keVtkYXRhLWFvcy1kdXJhdGlvbj1cXFwiMzAwMFxcXCJdIFtkYXRhLWFvc117dHJhbnNpdGlvbi1kdXJhdGlvbjozc31bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1kZWxheT1cXFwiMzAwMFxcXCJdLGJvZHlbZGF0YS1hb3MtZGVsYXk9XFxcIjMwMDBcXFwiXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tZGVsYXk6MHN9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZGVsYXk9XFxcIjMwMDBcXFwiXS5hb3MtYW5pbWF0ZSxib2R5W2RhdGEtYW9zLWRlbGF5PVxcXCIzMDAwXFxcIl0gW2RhdGEtYW9zXS5hb3MtYW5pbWF0ZXt0cmFuc2l0aW9uLWRlbGF5OjNzfVtkYXRhLWFvc117cG9pbnRlci1ldmVudHM6bm9uZX1bZGF0YS1hb3NdLmFvcy1hbmltYXRle3BvaW50ZXItZXZlbnRzOmF1dG99W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWxpbmVhcl0sYm9keVtkYXRhLWFvcy1lYXNpbmc9bGluZWFyXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjUsLjI1LC43NSwuNzUpfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlXSxib2R5W2RhdGEtYW9zLWVhc2luZz1lYXNlXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2V9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW5dLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW5dIFtkYXRhLWFvc117dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbn1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXRdLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2Utb3V0XSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmVhc2Utb3V0fVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLW91dF0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXRdIFtkYXRhLWFvc117dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246ZWFzZS1pbi1vdXR9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW4tYmFja10sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1iYWNrXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNiwtLjI4LC43MzUsLjA0NSl9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWVhc2Utb3V0LWJhY2tdLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2Utb3V0LWJhY2tdIFtkYXRhLWFvc117dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC4xNzUsLjg4NSwuMzIsMS4yNzUpfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLW91dC1iYWNrXSxib2R5W2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLW91dC1iYWNrXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNjgsLS41NSwuMjY1LDEuNTUpfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLXNpbmVdLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW4tc2luZV0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjQ3LDAsLjc0NSwuNzE1KX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXQtc2luZV0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXQtc2luZV0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjM5LC41NzUsLjU2NSwxKX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtc2luZV0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtc2luZV0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjQ0NSwuMDUsLjU1LC45NSl9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW4tcXVhZF0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1xdWFkXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNTUsLjA4NSwuNjgsLjUzKX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXQtcXVhZF0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXQtcXVhZF0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjI1LC40NiwuNDUsLjk0KX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtcXVhZF0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtcXVhZF0gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjQ1NSwuMDMsLjUxNSwuOTU1KX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1jdWJpY10sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1jdWJpY10gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjU1LC4wODUsLjY4LC41Myl9W2RhdGEtYW9zXVtkYXRhLWFvc11bZGF0YS1hb3MtZWFzaW5nPWVhc2Utb3V0LWN1YmljXSxib2R5W2RhdGEtYW9zLWVhc2luZz1lYXNlLW91dC1jdWJpY10gW2RhdGEtYW9zXXt0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjpjdWJpYy1iZXppZXIoLjI1LC40NiwuNDUsLjk0KX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtY3ViaWNdLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2UtaW4tb3V0LWN1YmljXSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNDU1LC4wMywuNTE1LC45NTUpfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLXF1YXJ0XSxib2R5W2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLXF1YXJ0XSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguNTUsLjA4NSwuNjgsLjUzKX1bZGF0YS1hb3NdW2RhdGEtYW9zXVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1vdXQtcXVhcnRdLGJvZHlbZGF0YS1hb3MtZWFzaW5nPWVhc2Utb3V0LXF1YXJ0XSBbZGF0YS1hb3Nde3RyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOmN1YmljLWJlemllciguMjUsLjQ2LC40NSwuOTQpfVtkYXRhLWFvc11bZGF0YS1hb3NdW2RhdGEtYW9zLWVhc2luZz1lYXNlLWluLW91dC1xdWFydF0sYm9keVtkYXRhLWFvcy1lYXNpbmc9ZWFzZS1pbi1vdXQtcXVhcnRdIFtkYXRhLWFvc117dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246Y3ViaWMtYmV6aWVyKC40NTUsLjAzLC41MTUsLjk1NSl9QG1lZGlhIHNjcmVlbntodG1sOm5vdCgubm8tanMpIFtkYXRhLWFvc149ZmFkZV1bZGF0YS1hb3NePWZhZGVde29wYWNpdHk6MDt0cmFuc2l0aW9uLXByb3BlcnR5Om9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTpvcGFjaXR5LHRyYW5zZm9ybTt0cmFuc2l0aW9uLXByb3BlcnR5Om9wYWNpdHksdHJhbnNmb3JtLC13ZWJraXQtdHJhbnNmb3JtfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zXj1mYWRlXVtkYXRhLWFvc149ZmFkZV0uYW9zLWFuaW1hdGV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmV9aHRtbDpub3QoLm5vLWpzKSBbZGF0YS1hb3M9ZmFkZS11cF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1mYWRlLWRvd25dey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsLTEwMHB4LDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC0xMDBweCwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1mYWRlLXJpZ2h0XXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTAwcHgsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMHB4LDAsMCl9aHRtbDpub3QoLm5vLWpzKSBbZGF0YS1hb3M9ZmFkZS1sZWZ0XXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDBweCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDBweCwwLDApfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZhZGUtdXAtcmlnaHRdey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMDBweCwxMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMHB4LDEwMHB4LDApfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZhZGUtdXAtbGVmdF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwcHgsMTAwcHgsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMHB4LDEwMHB4LDApfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZhZGUtZG93bi1yaWdodF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMHB4LC0xMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMHB4LC0xMDBweCwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1mYWRlLWRvd24tbGVmdF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwcHgsLTEwMHB4LDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDBweCwtMTAwcHgsMCl9aHRtbDpub3QoLm5vLWpzKSBbZGF0YS1hb3NePXpvb21dW2RhdGEtYW9zXj16b29tXXtvcGFjaXR5OjA7dHJhbnNpdGlvbi1wcm9wZXJ0eTpvcGFjaXR5LC13ZWJraXQtdHJhbnNmb3JtO3RyYW5zaXRpb24tcHJvcGVydHk6b3BhY2l0eSx0cmFuc2Zvcm07dHJhbnNpdGlvbi1wcm9wZXJ0eTpvcGFjaXR5LHRyYW5zZm9ybSwtd2Via2l0LXRyYW5zZm9ybX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvc149em9vbV1bZGF0YS1hb3NePXpvb21dLmFvcy1hbmltYXRle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVaKDApIHNjYWxlKDEpO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApIHNjYWxlKDEpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20taW5dey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKC42KTt0cmFuc2Zvcm06c2NhbGUoLjYpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20taW4tdXBdey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwcHgsMCkgc2NhbGUoLjYpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApIHNjYWxlKC42KX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz16b29tLWluLWRvd25dey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsLTEwMHB4LDApIHNjYWxlKC42KTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwcHgsMCkgc2NhbGUoLjYpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20taW4tcmlnaHRdey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKC0xMDBweCwwLDApIHNjYWxlKC42KTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMHB4LDAsMCkgc2NhbGUoLjYpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20taW4tbGVmdF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwcHgsMCwwKSBzY2FsZSguNik7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMHB4LDAsMCkgc2NhbGUoLjYpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20tb3V0XXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIpO3RyYW5zZm9ybTpzY2FsZSgxLjIpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20tb3V0LXVwXXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApIHNjYWxlKDEuMik7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAwcHgsMCkgc2NhbGUoMS4yKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz16b29tLW91dC1kb3duXXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC0xMDBweCwwKSBzY2FsZSgxLjIpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC0xMDBweCwwKSBzY2FsZSgxLjIpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20tb3V0LXJpZ2h0XXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTAwcHgsMCwwKSBzY2FsZSgxLjIpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgtMTAwcHgsMCwwKSBzY2FsZSgxLjIpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPXpvb20tb3V0LWxlZnRdey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMHB4LDAsMCkgc2NhbGUoMS4yKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMTAwcHgsMCwwKSBzY2FsZSgxLjIpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zXj1zbGlkZV1bZGF0YS1hb3NePXNsaWRlXXt0cmFuc2l0aW9uLXByb3BlcnR5Oi13ZWJraXQtdHJhbnNmb3JtO3RyYW5zaXRpb24tcHJvcGVydHk6dHJhbnNmb3JtO3RyYW5zaXRpb24tcHJvcGVydHk6dHJhbnNmb3JtLC13ZWJraXQtdHJhbnNmb3JtO3Zpc2liaWxpdHk6aGlkZGVufWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zXj1zbGlkZV1bZGF0YS1hb3NePXNsaWRlXS5hb3MtYW5pbWF0ZXt2aXNpYmlsaXR5OnZpc2libGU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWigwKTt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1zbGlkZS11cF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDAlLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMCUsMCl9aHRtbDpub3QoLm5vLWpzKSBbZGF0YS1hb3M9c2xpZGUtZG93bl17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwJSwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwJSwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1zbGlkZS1yaWdodF17LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMCUsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoLTEwMCUsMCwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1zbGlkZS1sZWZ0XXstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgxMDAlLDAsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDEwMCUsMCwwKX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvc149ZmxpcF1bZGF0YS1hb3NePWZsaXBdey13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47dHJhbnNpdGlvbi1wcm9wZXJ0eTotd2Via2l0LXRyYW5zZm9ybTt0cmFuc2l0aW9uLXByb3BlcnR5OnRyYW5zZm9ybTt0cmFuc2l0aW9uLXByb3BlcnR5OnRyYW5zZm9ybSwtd2Via2l0LXRyYW5zZm9ybX1odG1sOm5vdCgubm8tanMpIFtkYXRhLWFvcz1mbGlwLWxlZnRdey13ZWJraXQtdHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWSgtMTAwZGVnKTt0cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVZKC0xMDBkZWcpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtbGVmdF0uYW9zLWFuaW1hdGV7LXdlYmtpdC10cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVZKDApO3RyYW5zZm9ybTpwZXJzcGVjdGl2ZSgyNTAwcHgpIHJvdGF0ZVkoMCl9aHRtbDpub3QoLm5vLWpzKSBbZGF0YS1hb3M9ZmxpcC1yaWdodF17LXdlYmtpdC10cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVZKDEwMGRlZyk7dHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWSgxMDBkZWcpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtcmlnaHRdLmFvcy1hbmltYXRley13ZWJraXQtdHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWSgwKTt0cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVZKDApfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtdXBdey13ZWJraXQtdHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWCgtMTAwZGVnKTt0cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVYKC0xMDBkZWcpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtdXBdLmFvcy1hbmltYXRley13ZWJraXQtdHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWCgwKTt0cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVYKDApfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtZG93bl17LXdlYmtpdC10cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVYKDEwMGRlZyk7dHJhbnNmb3JtOnBlcnNwZWN0aXZlKDI1MDBweCkgcm90YXRlWCgxMDBkZWcpfWh0bWw6bm90KC5uby1qcykgW2RhdGEtYW9zPWZsaXAtZG93bl0uYW9zLWFuaW1hdGV7LXdlYmtpdC10cmFuc2Zvcm06cGVyc3BlY3RpdmUoMjUwMHB4KSByb3RhdGVYKDApO3RyYW5zZm9ybTpwZXJzcGVjdGl2ZSgyNTAwcHgpIHJvdGF0ZVgoMCl9fVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciBlc2NhcGUgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanNcIik7XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIioge1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIG91dGxpbmU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XFxyXFxuICAgIGNvbG9yOiAjZDBkMGQwO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgICBjb2xvcjogI2QwZDBkMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogMTAyMHB4O1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmxleC1jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJmaXg6YmVmb3JlLCAuY2xlYXJmaXg6YWZ0ZXIge1xcclxcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gICAgZGlzcGxheTogdGFibGU7XFxyXFxufVxcclxcbi5jbGVhcmZpeDphZnRlciB7IGNsZWFyOmJvdGg7IH1cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKioqKnByZWhlYWRlci9oZWFkZXIqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXHJcXG5cXHJcXG4ucHJlaGVhZGVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNiM2IzZDtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uY29udGFjdC1pbmZvX19tYWlsLWluZm8gcCwgLmNvbnRhY3QtaW5mb19fcGhvbmUtbnVtYmVyIHB7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XFxyXFxufVxcclxcblxcclxcbi5zb2NpYWwge1xcclxcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyODMxO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5sb2dvIHtcXHJcXG4gICAgd2lkdGg6IDQwMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4ubG9nbyBpIHtcXHJcXG4gICAgZm9udC1zaXplOiA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcbi5sb2dvIHAge1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcclxcbn1cXHJcXG4ubG9nbyBzcGFuIHtcXHJcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogLTFweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcl9fbWVudSB7XFxyXFxuICAgIG1heC13aWR0aDogNDUwcHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG59XFxyXFxuLmhlYWRlcl9fbWVudSBsaSB7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2FsbC1idXR0b24ge1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDhweCAxNXB4O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDM1cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KCA0NWRlZywgcmdiKDI1MywyNDAsMTIyKSAwJSwgcmdiKDI1NCwyNDQsMTUxKSA0OCUsIHJnYigyNTQsMjQ3LDE3OSkgMTAwJSk7XFxyXFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCA0NWRlZywgcmdiKDI1MywyNDAsMTIyKSAwJSwgcmdiKDI1NCwyNDQsMTUxKSA0OCUsIHJnYigyNTQsMjQ3LDE3OSkgMTAwJSk7XFxyXFxuICAgIGJhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQoIDQ1ZGVnLCByZ2IoMjUzLDI0MCwxMjIpIDAlLCByZ2IoMjU0LDI0NCwxNTEpIDQ4JSwgcmdiKDI1NCwyNDcsMTc5KSAxMDAlKTtcXHJcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCA0NWRlZywgcmdiKDI1MywyNDAsMTIyKSAwJSwgcmdiKDI1NCwyNDQsMTUxKSA0OCUsIHJnYigyNTQsMjQ3LDE3OSkgMTAwJSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XFxyXFxuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMC4xcztcXHJcXG59XFxyXFxuLmNhbGwtYnV0dG9uIHAge1xcclxcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgICBjb2xvcjogIzUwNGY0ODtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG59XFxyXFxuLmNhbGwtYnV0dG9uOmhvdmVyIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDhweCAjZTZlNmU2ZjA7XFxyXFxufVxcclxcblxcclxcbi8qKioqKioqKioqKioqKioqKipzZWN0aW9uLXNsaWRlcioqKioqKioqKioqKioqKioqKiovXFxyXFxuXFxyXFxuLnNlY3Rpb24tc2xpZGVyIHtcXHJcXG4gICAgbWluLWhlaWdodDogNjUwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGN5YW47XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qKioqKioqKioqKioqKioqKipzZWN0aW9uMSoqKioqKioqKioqKioqKioqKiovXFxyXFxuXFxyXFxuLnNlY3Rpb24tMSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NjQ5NGM7XFxyXFxuICAgIHBhZGRpbmc6IDI1cHggMDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYWJvdXQtdXMtaCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjVweDtcXHJcXG4gICAgY29sb3I6ICM0NjQ5NGM7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcXHJcXG59XFxyXFxuXFxyXFxuLmFib3V0LWljb25zIHtcXHJcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmFib3V0LWljb25zX19zdGVwIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgbWluLXdpZHRoOiAyMDVweDtcXHJcXG59XFxyXFxuLmFib3V0LWljb25zX19zdGVwLWltZyB7XFxyXFxuICAgIGZsb2F0OiBsZWZ0O1xcclxcbiAgICBoZWlnaHQ6IDEwMHB4O1xcclxcbiAgICB3aWR0aDogOTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvaWNvbnMvc2VjdGlvbjEvaWNvbjEucG5nXCIpKSArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcXHJcXG59XFxyXFxuLmFib3V0LWljb25zX19zdGVwLTIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9pY29ucy9zZWN0aW9uMS9pY29uMi5wbmdcIikpICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxufVxcclxcbi5hYm91dC1pY29uc19fc3RlcC0zIHtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvaWNvbnMvc2VjdGlvbjEvaWNvbjMucG5nXCIpKSArIFwiKTtcXHJcXG4gICAgaGVpZ2h0OiAxMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmFib3V0LWljb25zX19zdGVwIC5jb250ZW50e1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxMDBweDtcXHJcXG59XFxyXFxuLmFib3V0LWljb25zX19zdGVwIGg0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uYWJvdXQtYXJyb3cge1xcclxcbiAgICB3aWR0aDogNzBweDtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9pY29ucy9zZWN0aW9uMS9hcnJvdy5wbmdcIikpICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXHJcXG4gICAgbWFyZ2luOiAwIDEwcHg7XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qKioqKioqKioqKioqKioqKioqKioqKnNlY3Rpb24tMihzZWN0aW9uLWNhdGFsb2cpKioqKioqKioqKioqKioqKioqKioqKioqKi9cXHJcXG5cXHJcXG4uc2VjdGlvbi1jYXRhbG9nIHtcXHJcXG4gICAgcGFkZGluZzogMjBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VjdGlvbi1jYXRhbG9nIGgxIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IDQwcHg7XFxyXFxuICAgIGNvbG9yOiAjNDY0OTRjO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhdGFsb2ctY2FyZHMge1xcclxcbiAgICBtYXJnaW46IDMwcHggYXV0bztcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmNhdGFsb2ctY2FyZHNfX2NhcmQge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGhlaWdodDogNDUwcHg7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgcGFkZGluZzogMjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gICAgYm94LXNoYWRvdzogNXB4IDVweCAxMHB4ICMyZTJlMmU1NTtcXHJcXG59XFxyXFxuXFxyXFxuLmNhdGFsb2ctY2FyZHNfX2NhcmQgLmltZyB7XFxyXFxuICAgIG1hcmdpbjogMCAgYXV0bztcXHJcXG4gICAgd2lkdGg6IDI1NXB4O1xcclxcbiAgICBoZWlnaHQ6IDI1MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jYXRhbG9nLWNhcmRzX19jYXJkIC5pbWctMSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2NhdGFsb2ctY2FyZDEuanBnXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuLmNhdGFsb2ctY2FyZHNfX2NhcmQgLmltZy0yIHtcXHJcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi9pbWcvY2F0YWxvZy1jYXJkMi5qcGdcIikpICsgXCIpO1xcclxcbn1cXHJcXG4uY2F0YWxvZy1jYXJkc19fY2FyZCAuaW1nLTMge1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9jYXRhbG9nLWNhcmQzLmpwZ1wiKSkgKyBcIik7XFxyXFxufVxcclxcblxcclxcbi5jYXRhbG9nLWNhcmRzX19jYXJkIGgzIHtcXHJcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgY29sb3I6ICM1ZjVmNWY7XFxyXFxuICAgIHBhZGRpbmc6IDEycHggMTVweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDBkMGQwZDA7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMHB4LCAtMThweCk7XFxyXFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNXB4IHJnYmEoMCwwLDAsMC4zKTtcXHJcXG4gICAgdGV4dC1zaGFkb3c6IDFweCAxcHggNXB4ICM1ZjVmNWZmMDtcXHJcXG59XFxyXFxuXFxyXFxuLmNhdGFsb2ctY2FyZHNfX2NhcmQgcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gICAgY29sb3I6ICM1ZjVmNWY7XFxyXFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gICAgcGFkZGluZzogNXB4IDdweDtcXHJcXG59XFxyXFxuXFxyXFxuLm9yZGVyLWJ1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcXHJcXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZjNzM7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAzcHggMCAjYjhiNjU0O1xcclxcbiAgICBjb2xvcjogIzRhNGE0YTtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJvdHRvbTogMjBweDtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi8qKioqKioqKioqKioqKioqKioqKioqKnNlY3Rpb24tMy9zZWN0aW9uLWluZm9ybWF0aW9uKioqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuXFxyXFxuLnNlY3Rpb24tMyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGYwN2E7XFxyXFxuICAgIHBhZGRpbmc6IDYwcHggMDtcXHJcXG59XFxyXFxuLnNlY3Rpb24tMyAuY29udGFpbmVyIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4uaW5mb3JtYXRpb24ge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHBhZGRpbmc6IDIwcHggNDBweDtcXHJcXG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDZweCBibGFjaztcXHJcXG4gICAgbGVmdDogNDBweDtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuLmluZm9ybWF0aW9uIHB7XFxyXFxuICAgIG1heC13aWR0aDogNTAwcHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gICAgY29sb3I6IHJnYig0MiwgNDQsIDQ2KTtcXHJcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4uY2FsbC1mb3JtIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHdpZHRoOiAyNjBweDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxufVxcclxcblxcclxcbi5jYWxsLWZvcm0gaW5wdXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmYjA7XFxyXFxuICAgIHBhZGRpbmc6IDdweCAxNXB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbn1cXHJcXG4uY2FsbC1mb3JtIGlucHV0Om50aC1sYXN0LWNoaWxkKDEpIHtcXHJcXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggIzM4MzkzM2EwO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxyXFxuICAgIHdpZHRoOiBhdXRvO1xcclxcbiAgICBwYWRkaW5nOiA1cHggMTVweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAzNXB4O1xcclxcbiAgICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIGNvbG9yOiAjZmRmMDdhO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzOTMzO1xcclxcbn1cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKipzZWN0aW9uLTQvc2VjdGlvbi10ZW1wbGF0ZXMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbi5zZWN0aW9uLTQge1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogNjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tNCBzZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBtYXJnaW46IDMwcHggMDtcXHJcXG4gICAgLyphbGlnbi1pdGVtczogY2VudGVyOyovXFxyXFxufVxcclxcblxcclxcbi5zZWN0aW9uLTQgc2VjdGlvbjpudGgtY2hpbGQoZXZlbikge1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxufVxcclxcblxcclxcbi5zZWN0aW9uLTQgc2VjdGlvbjpudGgtY2hpbGQoZXZlbikgLnNlY3Rpb24tdGVtcGxhdGVzX19jb250ZW50IHtcXHJcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxuICAgIHBhZGRpbmc6IDcwcHggMzBweCAwIDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYmlnLWltYWdlIHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBoZWlnaHQ6IDMwMHB4O1xcclxcbiAgICBmbGV4LWdyb3c6IDQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGN5YW47XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgY2VudGVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcclxcbiAgICB0cmFuc2l0aW9uOiBhbGwgMXM7XFxyXFxufVxcclxcblxcclxcbi5iaWctaW1hZ2U6aG92ZXIge1xcclxcbiAgICBoZWlnaHQ6IDUwMHB4O1xcclxcbn1cXHJcXG4uYmlnLWltYWdlOmhvdmVyIC5mYXMge1xcclxcbiAgICBvcGFjaXR5OiAwLjQ7XFxyXFxufVxcclxcblxcclxcbi5iaWctaW1hZ2UgLmZhcyB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgcmlnaHQ6IDIwcHg7XFxyXFxuICAgIGJvdHRvbTogMjBweDtcXHJcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcclxcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXM7XFxyXFxufVxcclxcbi5zZWN0aW9uLTQgc2VjdGlvbjpudGgtY2hpbGQoZXZlbikgLmJpZy1pbWFnZSAuZmFzIHtcXHJcXG4gICAgbGVmdDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tdGVtcGxhdGVzX19jb250ZW50IHtcXHJcXG4gICAgbWF4LXdpZHRoOiA2MDBweDtcXHJcXG4gICAgcGFkZGluZzogNzBweCAxMDBweCAwIDMwcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxufVxcclxcblxcclxcbi5zZWN0aW9uLXRlbXBsYXRlc19fY29udGVudCBoMyB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXHJcXG4gICAgY29sb3I6IHJnYig1NiwgNTcsIDUxKTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tdGVtcGxhdGVzX19jb250ZW50IHAge1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGNvbG9yOiByZ2IoNTYsIDU3LCA1MSk7XFxyXFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tdGVtcGxhdGVzX19zZWN0aW9uLTEgLmJpZy1pbWFnZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2JpZy1pbWFnZTEuanBnXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuLnNlY3Rpb24tdGVtcGxhdGVzX19zZWN0aW9uLTIgLmJpZy1pbWFnZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2JpZy1pbWFnZTIuanBnXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuLnNlY3Rpb24tdGVtcGxhdGVzX19zZWN0aW9uLTMgLmJpZy1pbWFnZSB7XFxyXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGVzY2FwZShyZXF1aXJlKFwiLi4vaW1nL2JpZy1pbWFnZTMuanBnXCIpKSArIFwiKTtcXHJcXG59XFxyXFxuXFxyXFxuLyoqKioqKioqKioqKioqKioqKioqKioqc2VjdGlvbi01L3NlY3Rpb24tcmVjYWxsKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXHJcXG4uc2VjdGlvbi1yZWNhbGwge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlOGU4O1xcclxcbiAgICBwYWRkaW5nLWJvdHRvbTogODBweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tcmVjYWxsIGgxIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcXHJcXG4gICAgcGFkZGluZzogN3B4IDA7XFxyXFxuXFxyXFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXHJcXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICAgIHRleHQtc2hhZG93OiAwcHggLTJweCAwcHggcmdiYSgxOTMsIDE5MiwgMTkyLCAwLjg2KTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNiM2IzZDtcXHJcXG5cXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1OSwgNTksIDYxLCAwLjMpO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDNweCAxNXB4IDJweCByZ2JhKDUyLCA1MiwgNTQsIDAuMzApLDAgLTRweCAwIDAgcmdiYSgzMCwgMzAsIDMxLCAwLjAwNCk7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjBweCk7XFxyXFxufVxcclxcblxcclxcbi5yZWNhbGxzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5yZWNhbGwge1xcclxcbiAgICBwYWRkaW5nOiAzMHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2QxZDBkMDtcXHJcXG4gICAgbWF4LXdpZHRoOiA0NzBweDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnJlY2FsbF9fYXZhdGFyIHtcXHJcXG4gICAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gICAgd2lkdGg6IDEwMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjeWFuO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5yZWNhbGwgaDMge1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5yZWNhbGwgcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gICAgY29sb3I6IHJnYigwLCAwLCAwKTtcXHJcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAyNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVjYWxsOm50aC1jaGlsZCgxKSAucmVjYWxsX19hdmF0YXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9yZWNhbGxfYXZhdGFyMS5qcGdcIikpICsgXCIpO1xcclxcbn1cXHJcXG4ucmVjYWxsOm50aC1jaGlsZCgyKSAucmVjYWxsX19hdmF0YXIge1xcclxcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBlc2NhcGUocmVxdWlyZShcIi4uL2ltZy9yZWNhbGxfYXZhdGFyMi5qcGdcIikpICsgXCIpO1xcclxcbn1cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKipmb290ZXIqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzYjNiM2Q7XFxyXFxuICAgIHBhZGRpbmc6IDMwcHggMDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIC5jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIC5jb250YWluZXIgPiBkaXYge1xcclxcbiAgICB3aWR0aDogMzAlO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyLWxvZ28ge1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxufVxcclxcblxcclxcbi5mb290ZXItbG9nbyB1bCB7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXHJcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogMS4yO1xcclxcbiAgICBmb250LXdlaWdodDogNDAwO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIgLmxvZ28gaXtcXHJcXG4gICAgZm9udC1zaXplOiA3MHB4O1xcclxcbn1cXHJcXG5mb290ZXIgLmxvZ28gcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDMycHg7XFxyXFxufVxcclxcbmZvb3RlciAubG9nbyBzcGFuIHtcXHJcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyLWNlbGwtZm9ybSB7XFxyXFxuICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdGVyLWNlbGwtZm9ybSBpbnB1dCB7XFxyXFxuICAgIHBhZGRpbmc6IDdweDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2YTA7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIC5mb290ZXItY29udGFjdCB7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiA2MHB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG59XFxyXFxuXFxyXFxuLyoqKioqKioqKioqKioqKioqKioqKioqc2VjdGlvbi1wb3N0LWZvb3RlcioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuLnNlY3Rpb24tcG9zdC1mb290ZXIge1xcclxcbiAgICBwYWRkaW5nOiA3cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuLnNlY3Rpb24tcG9zdC1mb290ZXIgcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gICAgY29sb3I6ICMzMjMyMzQ7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuLnNlY3Rpb24tcG9zdC1mb290ZXIgYSB7XFxyXFxuICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIGNvbG9yOiAjMjE3ZGU0O1xcclxcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsKSB7XG4gICAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICB9XG4gICAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gICAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICAgIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJ1xuICAgIH1cblxuICAgIHJldHVybiB1cmxcbn1cbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCl7XG4gICAgcmV0dXJuIHBhcmVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbn07XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQsIHBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHBhc3NpbmcgZnVuY3Rpb24gaW4gb3B0aW9ucywgdGhlbiB1c2UgaXQgZm9yIHJlc29sdmUgXCJoZWFkXCIgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvLyBVc2VmdWwgZm9yIFNoYWRvdyBSb290IHN0eWxlIGkuZVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgIGluc2VydEludG86IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9vXCIpLnNoYWRvd1Jvb3QgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZ2V0VGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0LCBwYXJlbnQpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bdGFyZ2V0XVxuXHR9O1xufSkoKTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEF0LmJlZm9yZSwgdGFyZ2V0KTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblxuXHRpZihvcHRpb25zLmF0dHJzLm5vbmNlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuXHRcdGlmIChub25jZSkge1xuXHRcdFx0b3B0aW9ucy5hdHRycy5ub25jZSA9IG5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0aWYob3B0aW9ucy5hdHRycy50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdH1cblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldE5vbmNlKCkge1xuXHRpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fID09PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybSA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdCA/IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpIFxuXHRcdCA6IG9wdGlvbnMudHJhbnNmb3JtLmRlZmF1bHQob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG4iLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcL3xcXHMqJCkvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjQyYjZiN2ExYWEzODc5MmEyYTZhM2JmMWM0MDA4MDY4LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImM4NmY5MjRjODFlNGU4MmJjNTRkNGZmOTY3N2RjMjk3LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjlmODkzMjQ2ZjE2MDAwMWJlNTIzMzMxZjhmMjZmYTZiLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjJjNzQ5YjAzZTE0OGNiNTlmYmQwZWRmOGMxZTRmYjllLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjEzNWFhZjMxZTQ4ODQ3NzI2YjRiMjE2MTI5ZDViYTBmLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImI5YjBkMzYyZjgxNzBkZjVjZTA4NWY5ZDJjZWQwNmUxLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjNjMjU5YzY4MmFhMDA5YTgxMTY0YjdmZGE4NGExMTM5LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjcwZDZjMWM0MWQxMjdlYjY3Y2MxN2VmMjJmNmVkMjlkLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZhYjNjYzE0NGZhNTYxYTFmYTc1MTBiMzZhODNmNWYzLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjVjYmYzNGI2MjVlZDQwMTQ0YWJhM2E3OGZlNzQ1NDFiLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImM5MDg1NTY0MjcwODdiZjVhMjA1YTI4ZGJjNmYzMGYxLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImE3NDljNzMyZjkwZjMwNjU4ZjAyOGZmMTI0NDExMDJkLmpwZ1wiOyIsImltcG9ydCAnLi9jc3Mvc3R5bGUuY3NzJztcclxuXHJcbmltcG9ydCBBT1MgZnJvbSAnYW9zJztcclxuaW1wb3J0ICdhb3MvZGlzdC9hb3MuY3NzJztcclxuXHJcbkFPUy5pbml0KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==