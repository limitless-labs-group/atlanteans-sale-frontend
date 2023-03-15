import { META_DESCRIPTION, META_TITLE } from '@/constants'
import NextHead from 'next/head'

export const Head = () => (
  <NextHead>
    <title>{META_TITLE}</title>
    <meta name='description' content={META_DESCRIPTION} />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link
      rel='icon'
      href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔱</text></svg>'
    />
  </NextHead>
)
