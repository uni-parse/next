import Link from 'next/link'

import Layout from '../components/layout'

// import styles from '../styles/Home.module.scss'
import utilStyles from '../styles/utils.module.scss'

import { getAllPostData } from '../utilities/getPosts'

export async function getStaticProps() {
  /** can read file system data, fetch data or query database:
   * fs.readFileSync(filePath, 'utf8')
   * await (await fetch('..')).json()
   * await someDbSdk.createClient(...).query('select posts...')
   */
  const allPostsData = getAllPostData()
  const props = { allPostsData }
  return { props }
}

export default function Home(props: any) {
  const { allPostsData } = props

  return (
    <Layout isHome title='Home'>
      <section className={utilStyles.headingMd}>
        <p>hi am uniparse a front end web dev</p>
      </section>

      {/* comment */}
      <section
        className={`my-1 rounded-[1em] bg-[#222] p-2 ${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: any) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>

      <nav className='flex justify-evenly'>
        <Link href='/posts/first-post'>First Post</Link>
        <Link href='/ssr-csr'>ssr-csr</Link>
      </nav>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        // h1 { margin-top: 150vh }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}
