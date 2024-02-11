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


export let probSocket: Socket

export const probSocketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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

                    probSocket = io(
                        "http://192.168.0.176:3005/prob-socket",

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

                    probSocket.on("portsInitingStatus", (data: IPortInitStatus) => {
                        updateCachedData((draft) => {
                            const out = (!!draft.find(item => item.port === data.port) ? [...draft] : [...draft, { ...data }])
                                .map(item => item.port === data.port ? ({ ...item, progress: data.progress }) : item)
                            return out
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
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
        })
    })
})

export const {
    usePortsInitingStatusQuery,
    useGetDTCurrentStatusQuery
} = probSocketApiSlice
