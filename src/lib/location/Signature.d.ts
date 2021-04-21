import { IOptions } from './index';
export default class Signature {
    private AppId;
    private AppSecret;
    private uuid;
    private host;
    constructor(options: IOptions);
    init(): void;
    private genHeader;
    getPosition<T>(params?: {
        [key: string]: string;
    }): Promise<T | undefined>;
}
//# sourceMappingURL=Signature.d.ts.map