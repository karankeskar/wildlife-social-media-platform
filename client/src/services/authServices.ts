const API_URL = 'http://localhost:3000/api/user'
const API_URL_POST = 'http://localhost:3000/api/posts'

export const register = async(
    fullName:string,
    email:string,
    password:string,
    phoneNumber:string
)=>{
    const userData = {
    fullName:fullName,
    email:email,
    password:password,
    phoneNumber:phoneNumber
};
const response = await fetch(`${API_URL}/register`, {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(userData),
});

const data = await response.json();

if(!response.ok){
    throw new Error(data.error || 'Registration failed');
}
if(data.token){
    localStorage.setItem('token', data.token);
}
return data;
}

export const login = async(email:string, password:string) =>{
    const credentials = {
        email:email,
        password:password
    };

    const response = await fetch(`${API_URL}/login`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(credentials)
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'Login Failed');
    }

    if(data.token){
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const getCurrentUser = async() =>{
    const token = localStorage.getItem('token');
    if(!token){
        throw new Error('No token found');
    }
    const response = await fetch(`${API_URL}/me`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || 'Failed to get user');
    }

    return data;
}

export const logout = () =>{
    localStorage.removeItem('token')
}

export const createPost = async (postData:{
    title:string,
    caption?:string,
    hashtag?:string[],
    category:string,
    location?:string,
    country:string,
    image?:string,
    nationalpark?:string,
    camera?:string,
    lens?:string,
    conservation_status?:string
}) => {
    const token = localStorage.getItem('token');
    if(!token){
        throw new Error("No authentication token found, Please login to post");
    }
    const response = await fetch(`${API_URL_POST}/create`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify(postData)
    });
}