import { apiSlice } from "./apiSlice";

const base_api_url = 'employe'

export const employeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployeList: builder.query({
            query: () => ({
                url: `${base_api_url}/all/`,
                methode: 'GET'
            })
        }),
        getEmployeDetail: builder.query({
            query: (id) => ({
                url: `${base_api_url}/detail/${id}/`,
                methode: 'GET'
            })
        }),
        newEmployee: builder.mutation({
            query: payload => ({
                url: `${base_api_url}/create/`,
                method: 'POST',
                body: payload
            })
        }),
        editEmployee: builder.mutation({
            query: payload => ({
                url: `${base_api_url}/update/${payload.id}/`,
                method: 'PUT',
                body: payload
            })
        }),
        deleteEmployee: builder.mutation({
            query: id => ({
                url: `${base_api_url}/delete/${id}/`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useGetEmployeListQuery,
    useGetEmployeDetailQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
    useNewEmployeeMutation
} = employeApiSlice