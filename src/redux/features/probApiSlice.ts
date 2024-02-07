import { apiSlice } from "../../api/rtkApi/apiSlice";
import { logLocationType } from "../../pages/Home/components/Hero/Hero";
import { invalidatesTags } from "../invalidatesTags.enum";

export interface IProbGetHello {
    result: string;
}

export interface IProbPortsInitArgs {
    type: logLocationType,
    code: string,
    expertId: number
}

export interface IProbPortsInitRes {
    msg: string
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
        })
    })
})

export const {
    useProbGetHelloQuery,
    useInitPortsMutation
} = probApiSlice