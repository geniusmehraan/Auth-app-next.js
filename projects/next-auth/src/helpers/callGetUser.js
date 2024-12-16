
const callGetUser = async (token) => {
    try {
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/user/getUser`, {
            headers:{
                "Content-type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(token||null)
           
        });
        const data = response.json();
        
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export default callGetUser;
