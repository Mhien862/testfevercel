import axiosInstance from "./axios.service";

const createEventAPI = async (data) => {
    console.log('data.firstClosureDate', data.firstClosureDate.dateString)
    const res = await axiosInstance.post("event ", { 
        eventName: data.eventName,
        firstClosureDate: data.firstClosureDate,
        finalClosureDate: data.finalClosureDate,
        faculty: data.faculty,
        academicYearId: data.academicYear
     })

    return res.data
}

const editEventAPI = async (data) => {
    const res = await axiosInstance.put(`event?eventId=${data.id} `, { 
        eventName: data.eventName,
        firstClosureDate: data.firstClosureDate,
        finalClosureDate: data.finalClosureDate,
        faculty: data.faculty,
     })

    return res.data
}

export { createEventAPI, editEventAPI };
