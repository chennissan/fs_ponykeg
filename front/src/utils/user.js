
export const getUserPageSize = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API_URL}/protected/profile`, {
        headers: { Authorization: token },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed to load profile.");
      }
  
      return data.preferences?.page_size || 5;
    } catch (err) {
      console.error("Failed to get user page size:", err);
      return 5; // fallback default
    }
  };

  export const checkToken = async () => {
    const token = localStorage.getItem("token");
    if(!token) {
      return;
    }
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API_URL}/protected/`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if(res.status == 401) {
        console.log("Failed to get token (401) ", res);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        return;
      }           
    } catch (err) {
      console.log("Failed ", err);      
      return;
    }
    console.log("check token ok");
    return token ;
  };