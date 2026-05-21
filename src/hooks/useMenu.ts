import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { LOCATIONS } from '../config/locations'
import { fetchXml, fetchCsv } from '../lib/fetchMenu'
import { parseXml } from '../lib/parseXML'
import { parseCsv } from '../lib/parseCSV'
import type { MenuData } from '../lib/types'

type UseMenuOptions = {
  location: string
  menuType?: string
}

type UseMenuResult = {
  data: MenuData | null
  sheetData: Record<string, string> | null
  isLoading: boolean
  error: unknown
}

export const useMenu = ({ location, menuType }: UseMenuOptions): UseMenuResult => {
  const config = LOCATIONS[location]
  const normalizedMenuType = menuType?.toLowerCase().trim()
  const queryClient = useQueryClient()
  const previousXmlRef = useRef<string | null>(null)
  const queryKey = ['menu-xml', location, normalizedMenuType]

  if (!config) {
  throw new Error('Config is required');
  }

  const xmlQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const xmlText = await fetchXml(config.xmlUrl)
      if (xmlText === previousXmlRef.current) {
        return queryClient.getQueryData<MenuData>(queryKey)!
      }
      previousXmlRef.current = xmlText
      return parseXml({ xmlText, menuTypeFilter: normalizedMenuType })
    },
    refetchInterval: 4 * 60_000,
    retry: 2,
  })

  const sheetQuery = useQuery({
    queryKey: ['menu-sheet', location],
    queryFn: async () => {
      if (!config.gid) throw new Error(`No gid configured for location: ${location}`)
      const csvText = await fetchCsv(config.gid)
      return parseCsv(csvText)
    },
    enabled: !!config.gid,
    retry: 1,
  })

  return {
    data: xmlQuery.data ?? null,
    sheetData: sheetQuery.data ?? null,
    isLoading: xmlQuery.isLoading,
    error: xmlQuery.error,
  }
}
