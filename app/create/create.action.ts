'use server'
export const createEventAction = async (data: {
    title: string;
    date: Date;
    location: string;
    description?: string | undefined;
}) => {
    try {
        console.log(data)

    } catch (error) {

    }
}