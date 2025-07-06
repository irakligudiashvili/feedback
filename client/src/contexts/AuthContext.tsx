import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface User{
    user_id: number;
    role: string;
}

interface AuthContextType{
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token){
            fetch('http://localhost:8000/api/verify.php', {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                if(!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                setUser({user_id: data.user_id, role: data.role});
                setLoading(false);
            })
            .catch((err) => {
                console.error("Token verification failed: ", err)
                localStorage.removeItem('jwt');
                setUser(null);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt', token);
        const decoded: any = jwtDecode(token);
        setUser({user_id: decoded.user_id, role: decoded.role});
    }

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{user, isLoggedIn: !!user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}