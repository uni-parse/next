import Date from '@/components/date'
import Layout from '@/components/layout'
import utilStyles from '@/styles/utils.module.scss'
import {
  getAllPostIds,
  getPostDataAsync,
} from '@/utilities/getPosts'

// on production  : runs on build time.
// on devlopement : runs on each request.
export async function getStaticPaths() {
  const paths = getAllPostIds()
  // paths = [
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'pre-rendering' } }
  // ]
  return {
    paths,
    fallback: false,
  }
  /** fallback
   * false: unreturned paths serve 404 page.
   * true:
   *   the returned paths rendered to html at build time.
   *   requesting ungenerated paths at build-time, serve fallback page instead of 404 page.
   *   In the background, statically generate the missing paths for Subsequent requests.
   * 'blockiing': ssr with getStaticProps, cached for future requests, happens once per path.
   */
}

export async function getStaticProps(context: any) {
  // context = path from paths[] returned from getStaticPaths()
  const { params } = context
  const postData = await getPostDataAsync(params.id)
  const props = { postData }

  return { props }
}

export default function Post(props: any) {
  const { postData } = props
  const { title, date, htmlContent } = postData

  return (
    <Layout title={title}>
      <h1 className={utilStyles.headingXl}>{title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={date} />
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Layout>
  )
}
