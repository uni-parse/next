import Layout from '@/components/layout'
import Script from 'next/script'

export default function FirstPost() {
  return (
    <Layout title='first Post'>
      {false && (
        <Script
          src='https://connect.facebook.net/en_US/sdk.js'
          strategy='lazyOnload'
          onLoad={() =>
            console.log(
              `script loaded correctly, window.FB has been populated`
            )
          }
        />
      )}

      <h1 className='m-1  rounded-[.5em] bg-[#222] p-1'>
        First Post
      </h1>
    </Layout>
  )
}
