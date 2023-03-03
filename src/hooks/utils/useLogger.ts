import { ILogger, Logger } from '@/utils'

export const useLogger = (title: string, options?: ILogger | undefined) =>
  new Logger(title, options)
