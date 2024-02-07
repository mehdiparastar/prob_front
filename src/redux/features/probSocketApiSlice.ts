import { Socket, io } from "socket.io-client";
import { apiSlice } from "../../api/rtkApi/apiSlice";

export interface IPortInitStatus {
    port: number,
    progress: number
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
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    updateCachedData,
                    getState
                }
            ) {
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

                }

            },
        })
    })
})

export const {
    usePortsInitingStatusQuery
} = probSocketApiSlice
