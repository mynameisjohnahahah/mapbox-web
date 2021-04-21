(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('dayjs'), require('uuid'), require('crypto-js/hmac-sha1'), require('crypto-js/enc-base64'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios', 'dayjs', 'uuid', 'crypto-js/hmac-sha1', 'crypto-js/enc-base64', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['mall-to-location-sdk'] = {}, global.axios, global.dayjs, global.uuid, global.hex_hmac, global.Base64, global.rxjs, global.operators));
}(this, (function (exports, axios, dayjs, uuid, hex_hmac, Base64, rxjs, operators) { 'use strict';

    axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;
    dayjs = dayjs && Object.prototype.hasOwnProperty.call(dayjs, 'default') ? dayjs['default'] : dayjs;
    hex_hmac = hex_hmac && Object.prototype.hasOwnProperty.call(hex_hmac, 'default') ? hex_hmac['default'] : hex_hmac;
    Base64 = Base64 && Object.prototype.hasOwnProperty.call(Base64, 'default') ? Base64['default'] : Base64;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var Signature = /** @class */ (function () {
        function Signature(options) {
            this.host = '';
            this.AppId = options.appId;
            this.AppSecret = options.appSecret;
            this.uuid = options.uuid;
            this.host = options.host || 'https://test-easy.mall-to.com';
            this.init();
        }
        Signature.prototype.init = function () {
            var _this = this;
            axios.interceptors.request.use(function (config) {
                config.baseURL = _this.host;
                config.headers = Object.assign(config.headers, _this.genHeader(Object.assign({}, config.params || {}, config.data || {})));
                return config;
            }, function (error) {
                return Promise.reject(error);
            });
        };
        Signature.prototype.genHeader = function (mergeParams) {
            var timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
            var signature_nonce = uuid.v4();
            // const timestamp = `2018-11-07 17:52:00`
            // const signature_nonce = 'fjdsofjodsjfodsjf'
            var app_id = this.AppId;
            var uuid$1 = this.uuid;
            var paramsObject = __assign({ timestamp: timestamp,
                signature_nonce: signature_nonce,
                app_id: app_id,
                uuid: uuid$1 }, mergeParams);
            var sortParamsObject = {};
            Object.keys(paramsObject)
                .sort()
                .forEach(function (key) {
                sortParamsObject[key] = paramsObject[key];
            });
            var queryText = Object.keys(sortParamsObject)
                .map(function (key) {
                return key + "=" + sortParamsObject[key];
            })
                .join('&');
            var stringToSign = encodeURIComponent(queryText);
            // console.log(`stringToSign - > ${stringToSign}`)
            var hashDigest = hex_hmac(stringToSign, this.AppSecret);
            // console.log(`hashDigest - > ${hashDigest}`)
            var hmacDigest = Base64.stringify(hashDigest);
            // console.log(`hmacDigest - > ${hmacDigest}`)
            var Signature = encodeURIComponent(hmacDigest);
            // console.log(`Signature - > ${Signature}`)
            return {
                Signature: Signature,
                'App-Id': app_id,
                'Signature-Nonce': signature_nonce,
                UUID: uuid$1,
                Timestamp: timestamp,
                Accept: 'application/json',
                'Signature-Version': 4
            };
        };
        Signature.prototype.getPosition = function (params) {
            if (params === void 0) { params = {
                openid: 'omR735dF01pxo3SDxlS5SVDzcx_8'
            }; }
            return __awaiter(this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios.get("/api/lbs/asyn/location", {
                                    params: params
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data];
                        case 2:
                            e_1 = _a.sent();
                            console.error('定位失败: ' + e_1.message || e_1);
                            return [2 /*return*/, undefined];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return Signature;
    }());

    var selfWorker = self;
    /**********************
     *  惯导
     *
     *  @param data 传感器数据
     **********************/
    var THRESHOLD = 1;
    var INFLUENCE = 0.1;
    var TIME_DELTA = 600;
    var LAG = 10;
    var ins_data = {
        filtered: new Array(LAG).fill(1),
        avg_filter: 1,
        std_filter: 0,
        timestamp: 0
    };
    var acc_projs = [];
    var analysis = function (blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = function () {
                resolve(JSON.parse(reader.result));
            };
        });
    };
    var pk_z_score = function (y) {
        var peak_flag = 1;
        // pop up the oldest data of the buffer
        ins_data.filtered.shift();
        if (Math.abs(y - ins_data.avg_filter) > THRESHOLD * ins_data.std_filter) {
            // if (y <= ins_data.avg_filter) peak_flag = -1;
            if (y <= ins_data.avg_filter || y < 1.0)
                peak_flag = -1;
            var val = INFLUENCE * y + (1.0 - INFLUENCE) * ins_data.filtered[LAG - 2];
            ins_data.filtered.push(val);
        }
        else {
            peak_flag = 0;
            ins_data.filtered.push(y);
        }
        ins_data.avg_filter =
            ins_data.filtered.reduce(function (acc, val) { return acc + val; }, 0) / LAG;
        ins_data.std_filter = Math.sqrt(ins_data.filtered
            .reduce(function (acc, val) {
            return acc.concat(Math.pow((val - ins_data.avg_filter), 2));
        }, [])
            .reduce(function (acc, val) { return acc + val / LAG; }, 0));
        return peak_flag;
    };
    var MotionSensor = function (data) {
        // 超过10秒重置运动状态判定
        // if (ins_data.timestamp !== 0 && (data.timestamp - ins_data.timestamp) > 10000) {
        //   ins_data.filtered = ins_data.filtered.fill(1);
        //   ins_data.avg_filter = 1;
        //   ins_data.std_filter = 0;
        //   ins_data.timestamp = 0;
        // }
        return new Promise(function (resolve) {
            // 加速度 xyz 重力加速度xyz 当前时间
            var acceleration = data.acceleration, accelerationGravity = data.accelerationGravity, timestamp = data.timestamp;
            // calculate the projection of acc in the gravity direction
            var calc_dot = 0; // 计算点
            var calc_abs = 0; // 绝对值
            // x, y, z 轴
            for (var i = 0; i < 3; i += 1) {
                // 10m/s2 - 10 * 1.414 m/s2 x轴 右边方向移动
                var grav = acceleration[i] - accelerationGravity[i]; // 重力在各个轴的分量
                // -4.14m/s2 * 10m/s2 ????
                calc_dot += grav * acceleration[i]; // 不带重力的加速度在重力方向的投影
                // -4.14m/s2 * -4.14m/s2 ???
                calc_abs += grav * grav;
            }
            var acc_proj = calc_dot / Math.sqrt(calc_abs);
            // 静止判断
            acc_projs.push(acc_proj);
            if (acc_projs.length > LAG) {
                acc_projs.shift();
            }
            // 是否运动
            var isMotion = Math.max.apply(null, acc_projs) > 1.0;
            // 是否行走
            var isWalk = pk_z_score(acc_proj) == 1 && timestamp - ins_data.timestamp > TIME_DELTA;
            if (isWalk) {
                ins_data.timestamp = timestamp;
                return resolve({ walk: true, motion: isMotion });
            }
            return resolve({ walk: false, motion: isMotion });
        });
    };
    /**
     *  收到消息
     */
    var onWorkerMessage = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var blob, data, results, _a, task, blob1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    blob = e.data;
                    return [4 /*yield*/, analysis(blob)];
                case 1:
                    data = _b.sent();
                    results = null;
                    _a = blob.type;
                    switch (_a) {
                        case 'motion': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, MotionSensor(data.data)];
                case 3:
                    results = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    if (results) {
                        task = { id: data.id, data: results };
                        blob1 = new Blob([JSON.stringify(task)], { type: blob.type });
                        selfWorker.postMessage(blob1);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    selfWorker.addEventListener('message', onWorkerMessage);

    function decodeBase64(base64, enableUnicode) {
        var binaryString = atob(base64);
        if (enableUnicode) {
            var binaryView = new Uint8Array(binaryString.length);
            for (var i = 0, n = binaryString.length; i < n; ++i) {
                binaryView[i] = binaryString.charCodeAt(i);
            }
            return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
        }
        return binaryString;
    }

    function createURL(base64, sourcemapArg, enableUnicodeArg) {
        var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
        var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
        var source = decodeBase64(base64, enableUnicode);
        var start = source.indexOf('\n', 10) + 1;
        var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
        var blob = new Blob([body], { type: 'application/javascript' });
        return URL.createObjectURL(blob);
    }

    function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
        var url;
        return function WorkerFactory(options) {
            url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
            return new Worker(url, options);
        };
    }

    var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwp2YXIgd29ya2VyX2NvZGU9ZnVuY3Rpb24oZSl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGQocil7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGUpe3ZhciB0PW5ldyBGaWxlUmVhZGVyO3QucmVhZEFzVGV4dChyLCJ1dGYtOCIpLHQub25sb2FkPWZ1bmN0aW9uKCl7ZShKU09OLnBhcnNlKHQucmVzdWx0KSl9fSl9ZnVuY3Rpb24gcChkKXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWQuYWNjZWxlcmF0aW9uLHI9ZC5hY2NlbGVyYXRpb25HcmF2aXR5LG49ZC50aW1lc3RhbXAsYT0wLGk9MCxvPTA7bzwzO28rPTEpe3ZhciBsPXRbb10tcltvXTthKz1sKnRbb10saSs9bCpsfXZhciB1PWEvTWF0aC5zcXJ0KGkpO3kucHVzaCh1KSwxMDx5Lmxlbmd0aCYmeS5zaGlmdCgpO3ZhciBzLGMsZj0xPE1hdGgubWF4LmFwcGx5KG51bGwseSk7cmV0dXJuIDE9PShzPXUsYz0xLHYuZmlsdGVyZWQuc2hpZnQoKSxNYXRoLmFicyhzLXYuYXZnX2ZpbHRlcik+K3Yuc3RkX2ZpbHRlcj8oKHM8PXYuYXZnX2ZpbHRlcnx8czwxKSYmKGM9LTEpLHU9LjEqcysuOSp2LmZpbHRlcmVkWzhdLHYuZmlsdGVyZWQucHVzaCh1KSk6KGM9MCx2LmZpbHRlcmVkLnB1c2gocykpLHYuYXZnX2ZpbHRlcj12LmZpbHRlcmVkLnJlZHVjZShmdW5jdGlvbihlLHQpe3JldHVybiBlK3R9LDApLzEwLHYuc3RkX2ZpbHRlcj1NYXRoLnNxcnQodi5maWx0ZXJlZC5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5jb25jYXQoTWF0aC5wb3codC12LmF2Z19maWx0ZXIsMikpfSxbXSkucmVkdWNlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUrdC8xMH0sMCkpLGMpJiY2MDA8bi12LnRpbWVzdGFtcD8odi50aW1lc3RhbXA9bixlKHt3YWxrOiEwLG1vdGlvbjpmfSkpOmUoe3dhbGs6ITEsbW90aW9uOmZ9KX0pfXZhciBoPXNlbGYsdj17ZmlsdGVyZWQ6bmV3IEFycmF5KDEwKS5maWxsKDEpLGF2Z19maWx0ZXI6MSxzdGRfZmlsdGVyOjAsdGltZXN0YW1wOjB9LHk9W107cmV0dXJuIGguYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsZnVuY3Rpb24oZil7cmV0dXJuIHU9ZnVuY3Rpb24oKXt2YXIgdCxyLG4sYSxpLG8sbCx1LHMsZTtyZXR1cm4gYT10aGlzLGk9ZnVuY3Rpb24oZSl7c3dpdGNoKGUubGFiZWwpe2Nhc2UgMDpyZXR1cm4gbj1mLmRhdGEsWzQsZChuKV07Y2FzZSAxOnJldHVybiJtb3Rpb24iPT09KHQ9ZS5zZW50KCkscj1udWxsLG4udHlwZSk/WzMsMl06WzMsNF07Y2FzZSAyOnJldHVybls0LHAodC5kYXRhKV07Y2FzZSAzOnJldHVybiByPWUuc2VudCgpLFszLDRdO2Nhc2UgNDpyZXR1cm4gciYmKHI9e2lkOnQuaWQsZGF0YTpyfSxuPW5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShyKV0se3R5cGU6bi50eXBlfSksaC5wb3N0TWVzc2FnZShuKSksWzJdfX0scz17bGFiZWw6MCxzZW50OmZ1bmN0aW9uKCl7aWYoMSZ1WzBdKXRocm93IHVbMV07cmV0dXJuIHVbMV19LHRyeXM6W10sb3BzOltdfSxlPXtuZXh0OmMoMCksdGhyb3c6YygxKSxyZXR1cm46YygyKX0sImZ1bmN0aW9uIj09dHlwZW9mIFN5bWJvbCYmKGVbU3ltYm9sLml0ZXJhdG9yXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfSksZTtmdW5jdGlvbiBjKHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7aWYobyl0aHJvdyBuZXcgVHlwZUVycm9yKCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuIik7Zm9yKDtzOyl0cnl7aWYobz0xLGwmJih1PTImdFswXT9sLnJldHVybjp0WzBdP2wudGhyb3d8fCgodT1sLnJldHVybikmJnUuY2FsbChsKSwwKTpsLm5leHQpJiYhKHU9dS5jYWxsKGwsdFsxXSkpLmRvbmUpcmV0dXJuIHU7c3dpdGNoKGw9MCwodD11P1syJnRbMF0sdS52YWx1ZV06dClbMF0pe2Nhc2UgMDpjYXNlIDE6dT10O2JyZWFrO2Nhc2UgNDpyZXR1cm4gcy5sYWJlbCsrLHt2YWx1ZTp0WzFdLGRvbmU6ITF9O2Nhc2UgNTpzLmxhYmVsKyssbD10WzFdLHQ9WzBdO2NvbnRpbnVlO2Nhc2UgNzp0PXMub3BzLnBvcCgpLHMudHJ5cy5wb3AoKTtjb250aW51ZTtkZWZhdWx0OmlmKCEoKHU9MDwodT1zLnRyeXMpLmxlbmd0aCYmdVt1Lmxlbmd0aC0xXSl8fDYhPT10WzBdJiYyIT09dFswXSkpe3M9MDtjb250aW51ZX1pZigzPT09dFswXSYmKCF1fHx0WzFdPnVbMF0mJnRbMV08dVszXSkpe3MubGFiZWw9dFsxXTticmVha31pZig2PT09dFswXSYmcy5sYWJlbDx1WzFdKXtzLmxhYmVsPXVbMV0sdT10O2JyZWFrfWlmKHUmJnMubGFiZWw8dVsyXSl7cy5sYWJlbD11WzJdLHMub3BzLnB1c2godCk7YnJlYWt9dVsyXSYmcy5vcHMucG9wKCkscy50cnlzLnBvcCgpO2NvbnRpbnVlfXQ9aS5jYWxsKGEscyl9Y2F0Y2goZSl7dD1bNixlXSxsPTB9ZmluYWxseXtvPXU9MH1pZig1JnRbMF0pdGhyb3cgdFsxXTtyZXR1cm57dmFsdWU6dFswXT90WzFdOnZvaWQgMCxkb25lOiEwfX0oW3QsZV0pfX19LG5ldyhsPShsPW89ZT12b2lkIDApfHxQcm9taXNlKShmdW5jdGlvbihyLHQpe2Z1bmN0aW9uIG4oZSl7dHJ5e2kodS5uZXh0KGUpKX1jYXRjaChlKXt0KGUpfX1mdW5jdGlvbiBhKGUpe3RyeXtpKHUudGhyb3coZSkpfWNhdGNoKGUpe3QoZSl9fWZ1bmN0aW9uIGkoZSl7dmFyIHQ7ZS5kb25lP3IoZS52YWx1ZSk6KCh0PWUudmFsdWUpaW5zdGFuY2VvZiBsP3Q6bmV3IGwoZnVuY3Rpb24oZSl7ZSh0KX0pKS50aGVuKG4sYSl9aSgodT11LmFwcGx5KGUsb3x8W10pKS5uZXh0KCkpfSk7dmFyIGUsbyxsLHV9KSxlLk1vdGlvblNlbnNvcj1wLGUuYW5hbHlzaXM9ZCxlfSh7fSk7Cgo=', null, false);
    /* eslint-enable */

    function analysis$1(blob) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = function () {
                resolve(JSON.parse(reader.result));
            };
        });
    }
    var MERCATOR_FACTOR = 20037508.34;
    function coordinate2point(coordinate) {
        var x = (coordinate[0] * MERCATOR_FACTOR) / 180.0;
        var y = Math.log(Math.tan(((90.0 + coordinate[1]) * Math.PI) / 360.0)) /
            (Math.PI / 180.0);
        y *= MERCATOR_FACTOR / 180.0;
        return [x, y];
    }
    function point2coordinate(point) {
        var lng = (point[0] / MERCATOR_FACTOR) * 180.0;
        var lat = (point[1] / MERCATOR_FACTOR) * 180.0;
        lat =
            (180.0 / Math.PI) *
                (2 * Math.atan(Math.exp((lat * Math.PI) / 180.0)) - Math.PI / 2.0);
        return [lng, lat];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    var Worker$1 = /** @class */ (function () {
        function Worker() {
            this.worker = new WorkerFactory();
            this.worker.onmessage = this.onMessage.bind(this);
            this.tasks = [];
        }
        Worker.prototype.addTask = function (type, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var task = {
                    id: new Date().getTime().toString(),
                    data: data
                };
                _this.tasks[task.id] = [resolve, reject];
                var blob = new Blob([JSON.stringify(task)], { type: type });
                _this.worker.postMessage(blob);
            });
        };
        Worker.prototype.onMessage = function (e) {
            var _this = this;
            var blob = e.data;
            analysis$1(blob).then(function (data) {
                var _a = _this.tasks[data.id], resolve = _a[0], reject = _a[1];
                if (Object.keys(data.data).length > 0) {
                    resolve(data.data);
                }
                else {
                    reject('not content');
                }
                delete _this.tasks[data.id];
            });
        };
        return Worker;
    }());

    var MotionEngine = /** @class */ (function () {
        function MotionEngine(closeWorker) {
            var _this = this;
            console.log("\u65B9\u5411\u4F20\u611F\u5668" + (closeWorker ? '关闭' : '开启') + "\u4E86web-worker");
            if (!closeWorker) {
                this.worker = new Worker$1();
            }
            this.source = rxjs.fromEvent(window, 'devicemotion').pipe(operators.throttleTime(100), operators.map(function (event) {
                var acceleration = event.acceleration, accelerationIncludingGravity = event.accelerationIncludingGravity;
                if (acceleration && accelerationIncludingGravity) {
                    return {
                        acceleration: [
                            acceleration.x || 0,
                            acceleration.y || 0,
                            acceleration.z || 0
                        ],
                        accelerationGravity: [
                            accelerationIncludingGravity.x || 0,
                            accelerationIncludingGravity.y || 0,
                            accelerationIncludingGravity.z || 0
                        ],
                        timestamp: new Date().getTime()
                    };
                }
                return {
                    acceleration: [0, 0, 0],
                    accelerationGravity: [0, 0, 0],
                    timestamp: new Date().getTime()
                };
            }), operators.mergeMap(function (data) {
                if (_this.worker) {
                    return _this.worker.addTask('motion', data);
                }
                else {
                    return MotionSensor(data);
                }
            }));
        }
        MotionEngine.prototype.listener = function (callback) {
            this.subMotionEngine = this.source.subscribe(callback);
        };
        MotionEngine.prototype.complete = function () {
            var _a;
            (_a = this.subMotionEngine) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        return MotionEngine;
    }());

    /**
     * 方向传感器
     */
    var OrientationEngine = /** @class */ (function () {
        function OrientationEngine() {
            var _this = this;
            this.LOW_ALPHA = 0.23;
            var platform = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
                ? 'IOS'
                : 'Android';
            var eventName = platform === 'IOS' ? 'deviceorientation' : 'deviceorientationabsolute';
            this.source = rxjs.fromEvent(window, eventName).pipe(operators.throttleTime(100), operators.map(function (event) {
                var beta = event.beta, gamma = event.gamma, alpha = event.alpha, webkitCompassHeading = event.webkitCompassHeading;
                if (!beta || !gamma || !alpha) {
                    return 1000;
                }
                if (Math.abs(beta) > 60.0 || Math.abs(gamma) > 60.0)
                    return 1000;
                var angle = webkitCompassHeading || 360.0 - alpha;
                return _this.smooth(angle);
            }), operators.filter(function (direction) { return direction <= 360; }));
        }
        OrientationEngine.prototype.smooth = function (angle) {
            var factor = 0.6;
            var rad = (angle * Math.PI) / 180.0;
            var sin = Math.sin(rad);
            var cos = Math.cos(rad);
            if (this.smoothData) {
                sin = factor * this.smoothData.sin + (1.0 - factor) * sin;
                cos = factor * this.smoothData.cos + (1.0 - factor) * cos;
            }
            else {
                this.smoothData = {
                    sin: sin,
                    cos: cos
                };
            }
            var deg = (Math.atan2(sin, cos) * 180.0) / Math.PI;
            if (deg < 0)
                deg += 360.0;
            return deg;
        };
        OrientationEngine.prototype.listener = function (callback) {
            this.subOrientationEngine = this.source.subscribe(callback);
        };
        OrientationEngine.prototype.complete = function () {
            var _a;
            (_a = this.subOrientationEngine) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        return OrientationEngine;
    }());

    /**
     * 惯导类
     */
    var InertialNavigation = /** @class */ (function () {
        function InertialNavigation(options) {
            if (options === void 0) { options = {}; }
            this.stepLong = 0.5; // 步长
            this.status = false;
            this.options = options;
        }
        InertialNavigation.prototype.authDevicePermission = function () {
            return __awaiter(this, void 0, void 0, function () {
                var permissionState, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!(DeviceOrientationEvent &&
                                typeof DeviceOrientationEvent.requestPermission === 'function')) return [3 /*break*/, 2];
                            return [4 /*yield*/, DeviceOrientationEvent.requestPermission()];
                        case 1:
                            permissionState = _a.sent();
                            if (permissionState === 'granted') {
                                // Permission granted
                                console.log('设备已授权动作和方向传感器');
                                this.status = true;
                                // 初始化引擎
                                this.initEngine();
                                return [2 /*return*/, {
                                        success: true,
                                        msg: '设备已授权动作和方向传感器'
                                    }];
                            }
                            else {
                                // Permission denied
                                console.error('授权失败: 设备未授权动作和方向传感器');
                                this.status = false;
                                return [2 /*return*/, {
                                        success: false,
                                        msg: '授权失败: 设备未授权动作和方向传感器'
                                    }];
                            }
                        case 2:
                            this.status = false;
                            console.error('授权失败: 此浏览器没有动作和方向传感器的API, 惯导无法开启');
                            return [2 /*return*/, {
                                    success: false,
                                    msg: '授权失败: 此浏览器没有动作和方向传感器的API, 惯导无法开启'
                                }];
                        case 3:
                            e_1 = _a.sent();
                            this.status = false;
                            console.error('此浏览器没有动作和方向传感器的API, 惯导无法开启: \t', e_1);
                            return [2 /*return*/, {
                                    success: false,
                                    msg: '授权失败: 惯导无法开启'
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        InertialNavigation.prototype.initEngine = function () {
            if (this.status) {
                // 初始化动作传感器
                var closeWorker = this.options.openWorker === false; // 是否关闭worker, 默认打开
                this.motionEngine = new MotionEngine(closeWorker);
                this.orientationEngine = new OrientationEngine();
            }
        };
        InertialNavigation.prototype.updateLocationData = function (newLocationData) {
            this.locationData = JSON.parse(JSON.stringify(newLocationData));
        };
        InertialNavigation.prototype.updatePositionData = function (newPosition) {
            this.position = JSON.parse(JSON.stringify(newPosition));
        };
        InertialNavigation.prototype.startMotionEngine = function (callback) {
            var _this = this;
            var _a;
            if (this.status) {
                (_a = this.motionEngine) === null || _a === void 0 ? void 0 : _a.listener(function (motionState) {
                    var _a;
                    _this.motionState = motionState;
                    // 配合定位sdk
                    if ((_a = _this.locationData) === null || _a === void 0 ? void 0 : _a.position) {
                        var motionPosition = _this.computeMotionPosition(_this.locationData.position);
                        if (!motionPosition) {
                            console.warn("\u5982\u679C\u9700\u8981\u4F7F\u7528\u60EF\u5BFC, \u8BF7\u5148\u4F7F\u7528'setPosition'\u8BBE\u7F6E\u7684\u7ECF\u7EAC\u5EA6\u6216\u8005\u6253\u5F00\u5B9A\u4F4DSDK\u670D\u52A1");
                            return;
                        }
                        _this.locationData.position = motionPosition;
                        callback('motion', {
                            success: true,
                            data: _this.locationData,
                            msg: '惯性导航更新位置成功'
                        });
                    }
                    // 固定位置
                    if (_this.position) {
                        var motionPosition = _this.computeMotionPosition(_this.position);
                        if (!motionPosition) {
                            console.warn("\u5982\u679C\u9700\u8981\u4F7F\u7528\u60EF\u5BFC, \u8BF7\u5148\u4F7F\u7528'setPosition'\u8BBE\u7F6E\u7684\u7ECF\u7EAC\u5EA6\u6216\u8005\u6253\u5F00\u5B9A\u4F4DSDK\u670D\u52A1");
                            return;
                        }
                        _this.position = motionPosition;
                        callback('motion', {
                            success: true,
                            data: _this.position,
                            msg: '惯性导航更新位置成功'
                        });
                    }
                    return;
                });
            }
            else {
                callback('error', {
                    msg: '设备未授权动作和方向传感器',
                    success: false
                });
            }
        };
        InertialNavigation.prototype.computeMotionPosition = function (position) {
            var _a;
            // 需要运动状态为行走 并且 有方向传感器的数据
            if (((_a = this.motionState) === null || _a === void 0 ? void 0 : _a.walk) && this.orientationData) {
                // 如果不传入位置
                if (!position) {
                    return false; // 滚出克
                }
                var point = coordinate2point(position);
                var angle = (this.orientationData * Math.PI) / 180.0;
                point = [
                    point[0] + this.stepLong * Math.sin(angle),
                    point[1] + this.stepLong * Math.cos(angle)
                ];
                return point2coordinate(point);
            }
            return false;
        };
        InertialNavigation.prototype.startOrientationEngine = function (callback) {
            var _this = this;
            var _a;
            if (this.status) {
                (_a = this.orientationEngine) === null || _a === void 0 ? void 0 : _a.listener(function (deg) {
                    _this.orientationData = deg;
                    callback('orientation', {
                        msg: '方向传感器更新',
                        data: deg,
                        success: false
                    });
                });
            }
            else {
                callback('error', {
                    msg: '设备未授权动作和方向传感器',
                    success: false
                });
            }
        };
        InertialNavigation.prototype.endEngine = function () {
            var _a, _b;
            (_a = this.orientationEngine) === null || _a === void 0 ? void 0 : _a.complete();
            (_b = this.motionEngine) === null || _b === void 0 ? void 0 : _b.complete();
        };
        return InertialNavigation;
    }());

    var Kalman = /** @class */ (function () {
        function Kalman() {
            this._Q = 0.01;
            this._R = 0.08;
            this._PX = 0.1;
            this._PY = 0.1;
        }
        /**
         * 预测值更新
         * @param pk p值
         * @param vk 更新值
         * @param ok 观测值
         */
        Kalman.prototype.forecast = function (vk, pk, ok) {
            var g = pk / (pk + this._R);
            var v = vk + g * (ok - vk);
            var p = (1.0 - g) * pk;
            return [v, p];
        };
        Object.defineProperty(Kalman.prototype, "observations", {
            get: function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return this._observations;
            },
            /**
             *  设置观测值
             *
             *  @param point 坐标
             */
            set: function (point) {
                this._observations = point;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *  更新
         * @param point 坐标
         */
        Kalman.prototype.update = function (point) {
            // 若没设置观测值，则直接用原始位置
            if (!this._observations)
                return point;
            // 时间更新
            this._PX = this._PX + this._Q;
            this._PY = this._PY + this._Q;
            // 预测更新
            var _a = this.forecast(point[0], this._PX, this._observations[0]), x = _a[0], px = _a[1];
            var _b = this.forecast(point[1], this._PY, this._observations[1]), y = _b[0], py = _b[1];
            this._PX = px;
            this._PY = py;
            return [x, y];
        };
        /**
         *  重置
         */
        Kalman.prototype.reset = function () {
            this._PX = 0.1;
            this._PY = 0.1;
        };
        return Kalman;
    }());

    /**
     * 定位SDK基础类
     *
     * ```typescript
     * const mallToLocation = new Location({
     *   appId: '999',
     *   appSecret: 'testsecret',
     *   uuid: '1008'
     *   // inertialNavigationOptions: {
     *   //   openWorker: false
     *   // }
     * })
     * ```
     */
    var Location = /** @class */ (function () {
        /**
         * 构造函数 初始化定位SDK
         * @param options 初始化配置项
         */
        function Location(options) {
            this.options = options || {};
            // 一阶卡尔曼
            this.kalman = new Kalman();
            // 默认不打开惯导
            var _a = options.openInertialNavigation, openInertialNavigation = _a === void 0 ? false : _a;
            // 默认延迟停止状态
            this.delayWalkStatus = true; // 默认开启延迟停止状态
            this.delayWalkTime = 10 * 1000;
            this.startClearWalkStatus(); // 延迟10s
            this.service = new Signature(options);
            if (openInertialNavigation) {
                this.startInertialNavigation()
                    .then()
                    .catch(function (e) { return console.error(e); });
            }
        }
        Location.prototype.getDistance = function (lat1, lng1, lat2, lng2) {
            var Rad = function (d) {
                return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
            };
            var radLat1 = Rad(lat1);
            var radLat2 = Rad(lat2);
            var a = radLat1 - radLat2;
            var b = Rad(lng1) - Rad(lng2);
            var s = 2 *
                Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137; // EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; //输出为米
            //s=s.toFixed(4);
            return s;
        };
        Location.prototype.startClearWalkStatus = function (time) {
            var _this = this;
            if (time === void 0) { time = this.delayWalkTime; }
            this.delayWalkStatus = true;
            clearTimeout(this.ClearWalkStatusTimer);
            this.ClearWalkStatusTimer = setTimeout(function () {
                var _a, _b;
                if ((_b = (_a = _this.inertialNavigation) === null || _a === void 0 ? void 0 : _a.motionState) === null || _b === void 0 ? void 0 : _b.walk) {
                    _this.delayWalkStatus = false;
                }
            }, time);
        };
        Location.prototype.kalmanCompute = function (sourceData) {
            var _a;
            var newPosition = {
                floor_id: sourceData.floor_id,
                block_id: sourceData.block_id,
                position: sourceData.smooth || sourceData.stable || sourceData.position
            };
            if (this.locationRawData) {
                // 不同楼层处理
                if (newPosition.floor_id !== this.locationRawData.floor_id) {
                    this.kalman.reset();
                }
                // 设置卡尔曼的观测值
                this.kalman.observations = coordinate2point(newPosition.position);
                var point = this.kalman.update(coordinate2point(this.locationRawData.position));
                newPosition.position = point2coordinate(point);
                if ((_a = this.locationRawData) === null || _a === void 0 ? void 0 : _a.position) {
                    this.locationRawData.position = newPosition.position;
                }
            }
            this.location = newPosition;
            return {
                success: true,
                data: newPosition,
                msg: '定位成功'
            };
        };
        /**
         * 获取openid当前的位置
         * @param {Object} params - 传入uuid、userid等唯一标识获取位置
         * @param positionOptions
         * @return {Promise<ILocationData>} 返回定位信息或报错
         *
         * ```typescript
         * // async/await
         *
         * const result = await mallToLocation('指定openid')
         * if (result.success) {
         *     // ...code
         * } else {
         *    // ...error
         * }
         *
         * // Promise
         *
         * mallToLocation('指定openid')
         *    .then(result => // ...code)
         *    .catch(e => // ...code)
         * ```
         */
        Location.prototype.getPositionData = function (params, positionOptions) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, delayStopTime, _d, stopWalkingRefreshRange, data, pointDistance;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = positionOptions || {}, _c = _b.delayStopTime, delayStopTime = _c === void 0 ? 10 * 1000 : _c, _d = _b.stopWalkingRefreshRange, stopWalkingRefreshRange = _d === void 0 ? 2 : _d;
                            this.delayWalkTime = delayStopTime;
                            return [4 /*yield*/, this.service.getPosition(params)];
                        case 1:
                            data = _e.sent();
                            if (data) {
                                this.locationRawData = data;
                                if ((_a = this.inertialNavigation) === null || _a === void 0 ? void 0 : _a.status) {
                                    // 如果开启了惯性导航
                                    // 根据运动状态停止计算更新
                                    if (this.locationRawData && this.location) {
                                        pointDistance = this.getDistance(this.location.position[0], this.location.position[1], data.position[0], data.position[1]);
                                        if (pointDistance < stopWalkingRefreshRange &&
                                            !this.delayWalkStatus) {
                                            // 如果更新距离没超过 设置的更新范围阈值 并且 不在行走的状态
                                            console.warn('停止移动后更新位置的范围可以通过"stopWalkingRefreshRange"设置');
                                            return [2 /*return*/, {
                                                    success: false,
                                                    msg: "\u4F4D\u7F6E\u672C\u6B21\u66F4\u65B0" + pointDistance + "\u7C73, \u4F46\u662F\u4EBA\u7269\u5DF2\u7ECF\u505C\u6B62\u79FB\u52A8\u4E14\u6CA1\u6709\u89E6\u53D1\u66F4\u65B0\u4F4D\u7F6E\u7684\u8303\u56F4" + stopWalkingRefreshRange + "\u7C73"
                                                }];
                                        }
                                    }
                                }
                                return [2 /*return*/, this.kalmanCompute(data)];
                            }
                            else {
                                return [2 /*return*/, {
                                        success: false,
                                        msg: '定位中, 请查看控制台报错'
                                    }];
                            }
                    }
                });
            });
        };
        /**
         * 监听openid的位置更新
         * @param {Object} params - 传入uuid、userid等唯一标识获取位置
         * @param {Object} options 定位的配置项
         * @param {number} [options.delay=0] - 延迟开始获取定位时间
         * @param {number} [options.interval=1000] - 每隔interval秒更新位置
         * @param {number} [options.delayStopTime=10 * 1000] - 在人物停止移动后，延迟{delayStopTime}秒(默认10秒)，停止移动状态，用来持续获取定位
         * @param {number} [options.stopWalkingRefreshRange=2] - 在人物停止移动后，定位点超出${stopWalkingRefreshRange}米(默认2米)后，强制更新位置
         * @param callback 更新后调用的函数
         *
         * ``` typescript
         * mallToLocation.onPosition(
         *   '指定openid',
         *   {
         *      delay: 0, // 延迟n秒后开始获取位置, 默认0
         *      interval: 1000 // 每隔n秒获取一次位置, 默认1000
         *   },
         *   (res) => {
         *     if (res.success) {
         *        // ...code
         *     }
         *   }
         * )
         * ```
         */
        Location.prototype.onPosition = function (params, options, callback) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var _a = options.delay, delay = _a === void 0 ? 0 : _a, _b = options.interval, interval = _b === void 0 ? 1000 : _b, _c = options.delayStopTime, delayStopTime = _c === void 0 ? 10 * 1000 : _c, _d = options.stopWalkingRefreshRange, stopWalkingRefreshRange = _d === void 0 ? 2 : _d;
            this.onPositionCallback = callback;
            this.subPosition = rxjs.timer(delay, interval)
                .pipe(operators.switchMap(function () {
                return _this.getPositionData(params, {
                    delayStopTime: delayStopTime,
                    stopWalkingRefreshRange: stopWalkingRefreshRange
                });
            }))
                .subscribe(function (res) {
                var _a;
                if (res.success && res.data) {
                    // 更新惯导服务的位置
                    (_a = _this.inertialNavigation) === null || _a === void 0 ? void 0 : _a.updateLocationData(res.data);
                }
                callback && callback(res);
            });
        };
        /**
         * 停止位置更新监听
         */
        Location.prototype.stopPosition = function () {
            if (this.subPosition) {
                this.subPosition.unsubscribe();
            }
        };
        /**
         * 手动设置经纬度位置用来配合惯导使用
         * @param position
         */
        Location.prototype.setPosition = function (position) {
            if (this.inertialNavigation) {
                this.inertialNavigation.updatePositionData(position);
            }
            else {
                return {
                    success: false,
                    msg: '请先打开惯导服务'
                };
            }
        };
        /**
         * 开启惯导服务
         * @desc 开启管道服务需要用到动作和方向传感器，有以下2个条件
         * @desc 1. 域名必须在https下
         * @desc 2. Chrome浏览器不支持= =
         */
        Location.prototype.startInertialNavigation = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.inertialNavigation) return [3 /*break*/, 2];
                            this.inertialNavigation = new InertialNavigation(this.options.inertialNavigationOptions);
                            return [4 /*yield*/, this.inertialNavigation.authDevicePermission()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (this.inertialNavigation.status) {
                                return [2 /*return*/, {
                                        success: true,
                                        msg: '惯导服务已经开启了'
                                    }];
                            }
                            else {
                                return [2 /*return*/, {
                                        success: false,
                                        msg: '动作和方向授权未打开'
                                    }];
                            }
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 监听惯性导航返回的位置结果，有两种模式: 定位SDK监听、手动传入位置监听
         *
         * ```typescript
         * // SDK监听模式
         *  mallToLocation.onPosition('openid')
         *  // 因为惯导需要用到方向和动作传感器，必须先异步向浏览器授权
         *  const auth = await mallToLocation.startInertialNavigation()
         *  if (auth.success) {
         *    mallToLocation.onInertialNavigation((type, data) => {
         *       if (type === 'error') {
         *         console.log('触发错误')
         *       }
         *       if (type === 'motion') {
         *         console.log('触发惯导更新位置，返回位置')
         *       } else if (type === 'orientation') {
         *         console.log('触发方向更新，返回角度')
         *       }
         *    })
         *  }
         * // 手动传入位置监听
         *
         * ```
         *
         */
        Location.prototype.onInertialNavigation = function (callback) {
            var _this = this;
            var _a, _b;
            // 开启动作传感器
            (_a = this.inertialNavigation) === null || _a === void 0 ? void 0 : _a.startMotionEngine(function (type, data) {
                if (type === 'motion') {
                    _this.startClearWalkStatus();
                    if (_this.onPositionCallback) {
                        _this.onPositionCallback({
                            data: data.data,
                            msg: data.msg,
                            success: true
                        });
                    }
                    callback('motion', data);
                }
            });
            // 开启方向传感器
            (_b = this.inertialNavigation) === null || _b === void 0 ? void 0 : _b.startOrientationEngine(callback);
        };
        /**
         * 停止惯导监听
         */
        Location.prototype.stopInertialNavigation = function () {
            var _a;
            // 停止传感器
            (_a = this.inertialNavigation) === null || _a === void 0 ? void 0 : _a.endEngine();
        };
        return Location;
    }());

    exports.default = Location;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
