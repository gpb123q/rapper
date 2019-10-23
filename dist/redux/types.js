"use strict";
exports.__esModule = true;
exports["default"] = "\n/** \u8BF7\u6C42\u7C7B\u578B */\ntype REQUEST_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'HEAD'\n\ninterface Action<T = any> {\n    type: T\n}\nexport interface AnyAction extends Action {\n    [extraProps: string]: any\n}\nexport interface IRequestAction {\n    type: '$$RAPPER_REQUEST'\n    payload?: {\n        modelName: string\n        url: string\n        method?: REQUEST_METHOD\n        params?: any\n        types: string[]\n    }\n}\n\nexport type IAction = AnyAction | IRequestAction\n\n/** store enhancer \u53C2\u6570 */\nexport interface IEnhancerProps {\n    /** \u540E\u7AEFapi\u5730\u5740\uFF0C\u9ED8\u8BA4\u662F\u6839\u76EE\u5F55\u76F8\u5BF9\u8DEF\u5F84 */\n    requestPrefix?: string\n    /** \u7F13\u5B58\u6570\u636E\u6700\u5927\u957F\u5EA6 */\n    maxCacheLength?: number\n}\n\ntype Dispatch<A = AnyAction> = <T extends A>(action: T, ...extraArgs: any[]) => T\ntype Unsubscribe = () => void\nexport type Reducer<S = any, A = AnyAction> = (state: S | undefined, action: A) => S\ntype ExtendState<State, Extension> = [Extension] extends [never] ? State : State & Extension\ntype Observer<T> = {\n    next?(value: T): void\n}\ntype Observable<T> = {\n    subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe }\n    [Symbol.observable](): Observable<T>\n}\n\nexport type StoreEnhancer<Ext = {}, StateExt = {}> = (next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator<Ext, StateExt>\n\nexport type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <S = any, A extends Action = AnyAction>(\n    reducer: Reducer<S, A>,\n    preloadedState?: DeepPartial<S>\n) => IStore<S & StateExt, A> & Ext\n\nexport type DeepPartial<T> = {\n    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]\n}\n\n/** Store */\nexport interface IStore<S = any, A = IAction, StateExt = never, Ext = {}> {\n    dispatch: Dispatch<A>\n    getState(): S\n    subscribe(listener: () => void): Unsubscribe\n    replaceReducer<NewState, NewActions>(\n        nextReducer: Reducer<NewState, NewActions>\n    ): IStore<ExtendState<NewState, StateExt>, NewActions, StateExt, Ext> & Ext\n    [Symbol.observable](): Observable<S>\n}\n\ndeclare const $CombinedState: unique symbol\n\nexport type CombinedState<S> = { readonly [$CombinedState]?: undefined } & S\n\nexport type PreloadedState<S> = Required<S> extends {\n    [$CombinedState]: undefined\n}\n    ? S extends CombinedState<infer S1>\n    ? {\n        [K in keyof S1]?: S1[K] extends object ? PreloadedState<S1[K]> : S1[K]\n    }\n    : never\n    : {\n        [K in keyof S]: S[K] extends object ? PreloadedState<S[K]> : S[K]\n    }\n\nexport interface StoreCreator {\n    <S, A extends Action, Ext = {}, StateExt = never>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<Ext, StateExt>): IStore<\n        ExtendState<S, StateExt>,\n        A,\n        StateExt,\n        Ext\n    > &\n        Ext\n    <S, A extends Action, Ext = {}, StateExt = never>(\n        reducer: Reducer<S, A>,\n        preloadedState?: PreloadedState<S>,\n        enhancer?: StoreEnhancer<Ext>\n    ): IStore<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext\n}\n";
