import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='m-[2vh] flex h-[96vh] flex-col items-center justify-center rounded-[20vmin] border-dashed border-red-500'>
      <h1 className='text-red-500'>404 - Page Not Found</h1>
      <h1>
        <Link href='/'>Home</Link>
      </h1>
    </div>
  )
}
