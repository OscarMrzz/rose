import { getUserAuth } from "@/lib/services/authServices";
import { ClienteBrowserSupabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const USER_AUTH_KEY = ["userAuth"] as const;

export function useAuth() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const {
            data: { subscription },
        } = ClienteBrowserSupabase.auth.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: USER_AUTH_KEY });
        });
        return () => subscription.unsubscribe();
    }, [queryClient]);

    const {
        data: userAuth,
        isLoading: isLoadingAuth,
        isError: isErrorAuth,
        error: errorAuth,
    } = useQuery({
        queryKey: USER_AUTH_KEY,
        queryFn: () => getUserAuth(),
    });

    const isAuthenticated = Boolean(userAuth);

    return { userAuth, isLoadingAuth, isErrorAuth, errorAuth, isAuthenticated };
}