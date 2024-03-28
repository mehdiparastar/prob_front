import { apiSlice } from "../../api/rtkApi/apiSlice";
import { logLocationType } from "../../pages/Home/components/Hero/Hero";
import { IMSDetails } from "../../pages/MSDetails/MSDetails";
import { invalidatesTags } from "../invalidatesTags.enum";

export interface IProbGetHello {
    result: string;
}

export interface IProbPortsInitArgs {
    type: logLocationType,
    code: string,
    expertId: number
}

export interface IInspection {
    id: number,
    type: logLocationType,
    code: string,
    expertId?: number
}

export interface IProbPortsInitRes {
    msg: string
}

export interface IProbStoppingDTRes {
    msg: string
}

export interface IProbStartingDTRes {
    msg: string
}

export interface IProbPausingDTRes {
    msg: string
}

export interface IFindMSDetailsArgs {
    inspectionId: number
}


export const probApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        probGetHello: builder.query<IProbGetHello, void>({
            query() {
                return {
                    url: `getHello`,
                    method: "GET"
                }
            },
        }),

        initPorts: builder.mutation<IProbPortsInitRes, IProbPortsInitArgs>({
            query(args) {
                return {
                    url: `prob/init-dt`,
                    method: 'POST',
                    body: args
                }
            },
            invalidatesTags: [invalidatesTags.PortInIt]
        }),

        stoppingDT: builder.mutation<IProbStoppingDTRes, void>({
            query(args) {
                return {
                    url: `prob/stop-dt`,
                    method: 'GET',
                }
            },
            invalidatesTags: [invalidatesTags.stopDT]
        }),

        startingDT: builder.mutation<IProbStartingDTRes, void>({
            query(arg) {
                return {
                    url: `prob/start-dt`,
                    method: "GET"
                }
            },
            invalidatesTags: [invalidatesTags.startDT]
        }),

        pausingDT: builder.mutation<IProbPausingDTRes, void>({
            query(arg) {
                return {
                    url: `prob/pause-recording`,
                    method: "GET"
                }
            },
            invalidatesTags: [invalidatesTags.pauseDT]
        }),

        getAllInspections: builder.query<IInspection[], void>({
            query() {
                return {
                    url: `prob/getAllInspections`,
                    method: "GET"
                }
            },
        }),

        getCurrentActiveInspection: builder.query<IInspection, void>({
            query() {
                return {
                    url: `prob/getCurrentActiveInspection`,
                    method: "GET"
                }
            },
        }),

        findMSDetails: builder.mutation<IMSDetails[], IFindMSDetailsArgs>({
            query(args) {
                return {
                    url: `prob/find-ms-details`,
                    method: 'POST',
                    body: args
                }
            },
            invalidatesTags: [invalidatesTags.findMSDetails]
        }),
    })
})

export const {
    useProbGetHelloQuery,
    useInitPortsMutation,
    useStoppingDTMutation,
    useStartingDTMutation,
    usePausingDTMutation,
    useFindMSDetailsMutation,
    useGetAllInspectionsQuery,
    useGetCurrentActiveInspectionQuery,    
} = probApiSlice