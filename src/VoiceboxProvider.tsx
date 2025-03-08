import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "@tanstack/react-query"

type VoicevoxProviderProps = Pick<QueryClientProviderProps, "children">

const queryClient = new QueryClient()

export const VoicevoxProvider = ({
  children
}: VoicevoxProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}