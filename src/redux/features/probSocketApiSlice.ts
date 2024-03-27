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

export interface IExpert {
    id: number,
    email: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IInspection {
    id: number,
    type: logLocationType,
    code: string
    expert?: IExpert,
    expertId?: number
}

export enum callStatus {
    Idle = 'IDLE',
    Dedicate = 'DEDICATE'
}

export interface IGSMIdle {
    id: number,
    tech: string,
    mcc: string,
    mnc: string,
    lac: string,
    cellid: string,
    bsic: string,
    arfcn: string,
    bandgsm: string,
    rxlev: string,
    txp: string,
    tla: string,
    drx: string,
    c1: string,
    c2: string,
    gprs: string,
    tch: string,
    ts: string,
    ta: string,
    maio: string,
    hsn: string,
    rxlevsub: string,
    rxlevfull: string,
    rxqualsub: string,
    rxqualfull: string,
    voicecodec: string,
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IWCDMAIdle {
    id: number,
    tech: string,
    mcc: string,
    mnc: string,
    lac: string,
    cellid: string,
    uarfcn: string,
    psc: string,
    rac: string,
    rscp: string,
    ecio: string,
    phych: string,
    sf: string,
    slot: string,
    speech_code: string,
    comMod: string
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ILTEdle {
    id: number,
    tech: string,
    is_tdd: string
    mcc: string,
    mnc: string,
    cellid: string,
    pcid: string
    freq_band_ind: string,
    ul_bandwidth: string,
    dl_bandwidth: string,
    tac: string,
    rsrp: string,
    rsrq: string,
    rssi: string,
    sinr: string,
    srxlev: string,
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IGSMLongCall {
    id: number,
    tech: string,
    mcc: string,
    mnc: string,
    lac: string,
    cellid: string,
    bsic: string,
    arfcn: string,
    bandgsm: string,
    rxlev: string,
    txp: string,
    tla: string,
    drx: string,
    c1: string,
    c2: string,
    gprs: string,
    tch: string,
    ts: string,
    ta: string,
    maio: string,
    hsn: string,
    rxlevsub: string,
    rxlevfull: string,
    rxqualsub: string,
    rxqualfull: string,
    voicecodec: string,
    callingStatus: callStatus,
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IWCDMALongCall {
    id: number,
    tech: string,
    mcc: string,
    mnc: string,
    lac: string,
    cellid: string,
    uarfcn: string,
    psc: string,
    rac: string,
    rscp: string,
    ecio: string,
    phych: string,
    sf: string,
    slot: string,
    speech_code: string,
    comMod: string,
    callingStatus: callStatus,
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IGSMLockIdle {
    id: number,
    gpsTime?: string, // Store GPS time as seconds since the GPS epoch
    latitude: string,
    longitude: string,
    altitude: string,
    groundSpeed: string,
    gsmIdleSamplesMCI: IGSMIdle[],
    gsmIdleSamplesMTN: IGSMIdle[],
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IWCDMALockIdle {
    id: number,
    gpsTime?: string, // Store GPS time as seconds since the GPS epoch
    latitude: string,
    longitude: string,
    altitude: string,
    groundSpeed: string,
    wcdmaIdleSamplesMCI: IWCDMAIdle[],
    wcdmaIdleSamplesMTN: IWCDMAIdle[],
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}


export interface ILTELockIdle {
    id: number,
    gpsTime?: string, // Store GPS time as seconds since the GPS epoch
    latitude: string,
    longitude: string,
    altitude: string,
    groundSpeed: string,
    lteIdleSamplesMCI: ILTEdle[],
    lteIdleSamplesMTN: ILTEdle[],
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IGSMLockLongCall {
    id: number,
    gpsTime?: string, // Store GPS time as seconds since the GPS epoch
    latitude: string,
    longitude: string,
    altitude: string,
    groundSpeed: string,
    gsmLongCallSamplesMCI: IGSMLongCall[],
    gsmLongCallSamplesMTN: IGSMLongCall[],
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IWCDMALockLongCall {
    id: number,
    gpsTime?: string, // Store GPS time as seconds since the GPS epoch
    latitude: string,
    longitude: string,
    altitude: string,
    groundSpeed: string,
    wcdmaLongCallSamplesMCI: IWCDMALongCall[],
    wcdmaLongCallSamplesMTN: IWCDMALongCall[],
    inspection?: IInspection,
    inspectionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
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
                    window.location.reload();
                    console.error((error as any).status || "An Socket Error Occured.")
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
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
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
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
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
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
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
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
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
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentGSMLockIdle_MCI: builder.query<IGSMLockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentGSMLockIdle_MCI`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentGSMLockIdle_MCI", (data: IGSMLockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentGSMLockIdle_MTN: builder.query<IGSMLockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentGSMLockIdle_MTN`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentGSMLockIdle_MTN", (data: IGSMLockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentWCDMALockIdle_MCI: builder.query<IWCDMALockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentWCDMALockIdle_MCI`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentWCDMALockIdle_MCI", (data: IWCDMALockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentWCDMALockIdle_MTN: builder.query<IWCDMALockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentWCDMALockIdle_MTN`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentWCDMALockIdle_MTN", (data: IWCDMALockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentLTELockIdle_MCI: builder.query<ILTELockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentLTELockIdle_MCI`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentLTELockIdle_MCI", (data: ILTELockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentLTELockIdle_MTN: builder.query<ILTELockIdle[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentLTELockIdle_MTN`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentLTELockIdle_MTN", (data: ILTELockIdle) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentGSMLockLongCall_MCI: builder.query<IGSMLockLongCall[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentGSMLockLongCall_MCI`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentGSMLockLongCall_MCI", (data: IGSMLockLongCall) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentGSMLockLongCall_MTN: builder.query<IGSMLockLongCall[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentGSMLockLongCall_MTN`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentGSMLockLongCall_MTN", (data: IGSMLockLongCall) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentWCDMALockLongCall_MCI: builder.query<IWCDMALockLongCall[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentWCDMALockLongCall_MCI`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentWCDMALockLongCall_MCI", (data: IWCDMALockLongCall) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),

        getDTCurrentWCDMALockLongCall_MTN: builder.query<IWCDMALockLongCall[], void>({
            query(arg) {
                return {
                    url: `prob/getDTCurrentWCDMALockLongCall_MTN`,
                    method: "GET"
                }
            },

            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState }) {
                try {
                    await cacheDataLoaded

                    probSocket.on("dtCurrentWCDMALockLongCall_MTN", (data: IWCDMALockLongCall) => {
                        updateCachedData((draft) => {
                            // return [...draft, { ...data, latitude: `${+draft.slice(-1)[0].latitude + 0.0005}`, longitude: `${+draft.slice(-1)[0].longitude + 0.0001}` }]
                            return [...draft, data]
                        })
                    })

                    await cacheEntryRemoved;

                } catch (error) {
                    console.error((error as any).status || "An Socket Error Occured.")
                    window.location.reload();
                }
            },
        }),
    })
})

export const {
    useGetProbSocketQuery,
    usePortsInitingStatusQuery,
    useGetDTCurrentStatusQuery,
    useGetDTCurrentExpertIdQuery,
    useGetDTCurrentLogLocTypeQuery,
    useGetDTCurrentLogLocCodeQuery,
    
    useGetDTCurrentGSMLockIdle_MCIQuery,
    useGetDTCurrentGSMLockIdle_MTNQuery,
    
    useGetDTCurrentWCDMALockIdle_MCIQuery,
    useGetDTCurrentWCDMALockIdle_MTNQuery,
    
    useGetDTCurrentLTELockIdle_MCIQuery,
    useGetDTCurrentLTELockIdle_MTNQuery,

    useGetDTCurrentGSMLockLongCall_MCIQuery,
    useGetDTCurrentGSMLockLongCall_MTNQuery,
    
    useGetDTCurrentWCDMALockLongCall_MCIQuery,
    useGetDTCurrentWCDMALockLongCall_MTNQuery,
} = probSocketApiSlice
