import { IInertialNavigationOptions } from './types/global';
import { IInertialNavigationCallback } from './types/global';
export interface IOptions {
    appId: string;
    appSecret: string;
    uuid: string;
    host?: string;
    openInertialNavigation?: boolean;
    inertialNavigationOptions?: IInertialNavigationOptions;
}
export interface ILocationOptions {
    delay?: number;
    interval?: number;
    delayStopTime?: number;
    stopWalkingRefreshRange?: number;
}
export interface ILocationResult {
    success: boolean;
    data?: ILocationData;
    msg: string;
}
export declare type IPosition = [number, number];
export interface ILocationData {
    block_id: number;
    floor_id: number;
    position: IPosition;
}
export interface ILocationRawData {
    block_id: number;
    floor_id: number;
    stable: IPosition;
    position: IPosition;
    smooth: IPosition;
    move?: boolean;
}
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
export default class Location {
    private service;
    private inertialNavigation?;
    private subPosition?;
    private options;
    private kalman;
    private locationRawData?;
    private ClearWalkStatusTimer?;
    private delayWalkStatus;
    private delayWalkTime;
    private onPositionCallback?;
    location?: ILocationData;
    /**
     * 构造函数 初始化定位SDK
     * @param options 初始化配置项
     */
    constructor(options: IOptions);
    private getDistance;
    private startClearWalkStatus;
    private kalmanCompute;
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
    getPositionData(params: {
        [key: string]: string;
    }, positionOptions?: {
        delayStopTime: number;
        stopWalkingRefreshRange: number;
    }): Promise<ILocationResult>;
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
    onPosition(params: {
        [key: string]: string;
    }, options: ILocationOptions | undefined, callback: (result: ILocationResult) => void): void;
    /**
     * 停止位置更新监听
     */
    stopPosition(): void;
    /**
     * 手动设置经纬度位置用来配合惯导使用
     * @param position
     */
    setPosition(position: IPosition): {
        success: boolean;
        msg: string;
    } | undefined;
    /**
     * 开启惯导服务
     * @desc 开启管道服务需要用到动作和方向传感器，有以下2个条件
     * @desc 1. 域名必须在https下
     * @desc 2. Chrome浏览器不支持= =
     */
    startInertialNavigation(): Promise<{
        success: boolean;
        msg: string;
    }>;
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
    onInertialNavigation(callback: IInertialNavigationCallback): void;
    /**
     * 停止惯导监听
     */
    stopInertialNavigation(): void;
}
//# sourceMappingURL=index.d.ts.map