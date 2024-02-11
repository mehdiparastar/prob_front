import { Socket, io } from "socket.io-client";
import { apiSlice } from "../../api/rtkApi/apiSlice";
import { logLocationType } from "../../pages/Home/components/Hero/Hero";

export enum dtCurrentStatusENUM {
    idle = "IDLE",
    initing = "INITING",
    inited = "INITED",
    starting = "STARTING",
    started = "STARTED",
    paused = "PAUSED",
    stopping = "STOPPING",
    stopped = "STOPPED",
    findingLoc = "FINDING_LOC",
    findedLoc = "FINDED_LOC"
}

export interface IProbSocket {
    connected: boolean,
    connectedClientCount: number
}

export interface IPortInitStatus {
    port: number,
    progress: number,
}

export interface IProbPortsInitArgs {
    type: logLocationType,
    code: string,
    expertId: number
}

export interface IProbPortsInitRes {
    msg: string
}

export interface IDTCurrentStatus {
    status: dtCurrentStatusENUM
}

export interface IDTCurrentExpertId {
    expertId: number
}

export interface IDTCurrentLogLocType {
    logLocType: logLocationType
}

export interface IDTCurrentLogLocCode {
    logLocCode: string
}


export let probSocket: Socket

export const probSocketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProbSocket: builder.query<IProbSocket, void>({
            query() {
                return {
                    url: `prob/prob-socket`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket = io(
                        "http://192.168.0.176:3005/prob/prob-socket",

                        {
                            reconnectionDelay: 1000,
                            reconnection: true,
                            reconnectionAttempts: 100,
                            transports: ['websocket'],
                            agent: false,
                            upgrade: false,
                            rejectUnauthorized: false,
                            forceNew: true
                        })

                    probSocket.on('connect_error', async (err) => {
                        updateCachedData((draft) => {
                            return { ...draft, connected: false }
                        })
                    });

                    probSocket.on("getProbSocket", (data: IProbSocket) => {
                        updateCachedData((draft) => {
                            return { ...draft, ...data }
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    alert((error as any).status || "An Socket Error Occured.")
                }
            }
        }),

        portsInitingStatus: builder.query<IPortInitStatus[], void>({
            query() {
                return {
                    url: `prob/portsInitingStatus`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("portsInitingStatus", (data: IPortInitStatus) => {
                        updateCachedData((draft) => {
                            const out = (!!draft.find(item => item.port === data.port) ? [...draft] : [...draft, { ...data }])
                                .map(item => item.port === data.port ? ({ ...item, progress: data.progress }) : item)
                            return out
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.log('xxxxx', error)
                    alert((error as any).status || "An Socket Error Occured.")
                }
            }
        }),

        getDTCurrentStatus: builder.query<IDTCurrentStatus, void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentStatus`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentStatus", (data: IDTCurrentStatus) => {
                        updateCachedData((draft) => {
                            return { ...draft, ...data }
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    alert((error as any).status || "An Socket Error Occured.")
                }
            },
        }),

        getDTCurrentExpertId: builder.query<IDTCurrentExpertId, void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentExpertId`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentExpertId", (data: IDTCurrentExpertId) => {
                        updateCachedData((draft) => {
                            return { ...draft, ...data }
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    alert((error as any).status || "An Socket Error Occured.")
                }
            },
        }),

        getDTCurrentLogLocType: builder.query<IDTCurrentLogLocType, void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentLogLocType`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentLogLocType", (data: IDTCurrentLogLocType) => {
                        updateCachedData((draft) => {
                            return { ...draft, ...data }
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    alert((error as any).status || "An Socket Error Occured.")
                }
            },
        }),

        getDTCurrentLogLocCode: builder.query<IDTCurrentLogLocCode, void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentLogLocCode`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentLogLocCode", (data: IDTCurrentLogLocCode) => {
                        updateCachedData((draft) => {
                            return { ...draft, ...data }
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    alert((error as any).status || "An Socket Error Occured.")
                }
            },
        })
    })
})

export const {
    useGetProbSocketQuery,
    usePortsInitingStatusQuery,
    useGetDTCurrentStatusQuery,
    useGetDTCurrentExpertIdQuery,
    useGetDTCurrentLogLocTypeQuery,
    useGetDTCurrentLogLocCodeQuery
} = probSocketApiSlice
