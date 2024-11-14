'use server'
export const createEventAction = async (data: {
    title: string;
    date: Date;
    location: string;
    description?: string | undefined;
}) => {
    console.log(data)
}