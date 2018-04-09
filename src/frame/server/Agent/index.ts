import Superagent from 'src/utils/ajax/Superagent';
import { Request, Response } from '../';
import { NodeEnvType } from 'src/entry/constant';
import { MyStore } from 'src/redux';

/** AIP基础类 */
export default class AipBasic {

    /** 当前实例 */
    private static _instance: AipBasic;

    /** 获取当前实例 */
    public static get instance(): AipBasic {
        if (!AipBasic._instance) {
            new MyStore();
        }
        return AipBasic._instance;
    }

    /** 构造函数 */
    constructor() {
        if (AipBasic._instance) {
            throw ('[redux.Store]对象为单利');
        } else {
            AipBasic._instance = this;
        }
    }

    /**
     * 调用回掉函数
     * @param value 参数
     * @param fns 函数集合
     */
    private runCallback = (value: any, ...fns: Array<(value: any) => void>) => {
        fns.forEach(fn => {
            if (typeof fn === 'function')
                fn(value);
        });
    };

    /**
     * 请求头（全局）
     */
    private getDomainGlobal = (): string => {
        const { config, env } = MyStore.instance.getState();
        switch (env.NODE_ENV) {
            case NodeEnvType.开发环境:
                return config.rootConfig.DEV_URI;
            case NodeEnvType.生产环境:
                return config.rootConfig.API_URI;
            case NodeEnvType.测试环境:
                return config.rootConfig.TEST_URI;
            default:
                console.error('[api]环境变量异常', env);
                return '';
        }
    };

    /**
     * 请求头（当前公司）
     */
    private getDomainZone = (): string => {
        return 'xxxx';
    };

    /**
     * 提示消息管理
     * @param request 请求消息头
     * @param message 发送的消息
     */
    private showMessage = (request: Request, message: string): void => {
        if (request.isShowModal === false) {
            return null;
        }
    };

    /**
     * 向服务器发送一个请求
     * @param request 一个请求
     * @param domain 请求地址头
     */
    private call = (request: Request, domain: string): Promise<Response> => {
        return new Promise((resolve: (value: Response) => void) => {

            const options: any = this.getOptions(request.options);//消息头

            return Superagent.call(request.type, domain + request.uri, (er, body) => {

                const info: Response = new Response();//返回数据

                //是否失败
                if (er) {
                    info.er = er;
                    this.showMessage(request, '失败');
                } else {
                    if (body.ok) {
                        info.body = body.body;
                    } else {
                        info.er = body;
                        this.showMessage(request, '失败');
                    }
                }

                this.runCallback(info, request.callback, resolve);//调用回掉
            }, request.params, options);
        })
    };

    /**
     * 获取可用的 options 参数。
     * @param options 
     */
    private getOptions = (options: any): any => {
        const res = { ...options };
        const token = MyStore.instance.getState().user.token;

        //token是否存在
        if (token) {
            res['Authorization'] = token;//添加用户token
        };

        return res;
    };

    /**
     * 向服务器发送一个请求(全局)
     * @param request 一个请求
     */
    public callGlobal = (request: Request): Promise<Response> => {
        return this.call(request, this.getDomainGlobal());
    };

    /**
     * 向服务器发送一个请求(当前公司)
     * @param request 一个请求
     */
    public callZone = (request: Request): Promise<Response> => {
        return this.call(request, this.getDomainZone());
    };
}