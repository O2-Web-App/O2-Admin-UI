export type UserType = {
    id: string;
    username: string;
    fullName: string;
    gender: string;
    bio: string;
    dob: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    status: number;
    position: string;
    email: string;
    businessName: string;
    uuid: string;
}

export const users: UserType[] = [
    {
        id: "1",
        username: "john_doe",
        fullName: "John Doe",
        gender: "Male",
        bio: "Software Developer",
        dob: "1990-01-01",
        phoneNumber: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        avatar: "/avatars/john_doe.jpg",
        status: 1,
        position: "Developer",
        email: "john.doe@example.com",
        businessName: "Tech Solutions",
        uuid: "uuid-1",
    },
    {
        id: "2",
        username: "jane_smith",
        fullName: "Jane Smith",
        gender: "Female",
        bio: "Project Manager",
        dob: "1985-05-15",
        phoneNumber: "987-654-3210",
        address: "456 Elm St, Othertown, USA",
        avatar: "/avatars/jane_smith.jpg",
        status: 0,
        position: "Manager",
        email: "jane.smith@example.com",
        businessName: "Business Corp",
        uuid: "uuid-2",
    },
    // Add more user objects as needed
];




