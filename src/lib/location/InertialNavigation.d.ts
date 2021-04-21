import { ILocationData, IPosition } from './index';
import { IInertialNavigationOptions, IInertialNavigationCallback, IMotionState } from './types/global';
/**
 * 惯导类
 */
export declare class InertialNavigation {
    status: boolean;
    private motionEngine?;
    private stepLong;
    motionState?: IMotionState;
    private orientationEngine?;
    private orientationData?;
    private options;
    private locationData?;
    private position?;
    constructor(options?: IInertialNavigationOptions);
    authDevicePermission(): Promise<{
        success: boolean;
        msg: string;
    }>;
    initEngine(): void;
    updateLocationData(newLocationData: ILocationData): void;
    updatePositionData(newPosition: IPosition): void;
    startMotionEngine(callback: IInertialNavigationCallback): void;
    computeMotionPosition(position?: IPosition): IPosition | false;
    startOrientationEngine(callback: IInertialNavigationCallback): void;
    endEngine(): void;
}
//# sourceMappingURL=InertialNavigation.d.ts.map