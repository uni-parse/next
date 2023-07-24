import Layout from '../../components/layout'
import {
  getAllPostIds,
  getPostDataAsync,
} from '../../utilities/getPosts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  // paths = [
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'pre-rendering' } }
  // ]
  return { paths, fallback: false }
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
  const { id, title, date, contentHtml } = postData

  return (
    <Layout title={title}>
      id: {id}
      <br />
      title: {title}
      <br />
      date: {date}
      <br />
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  )
}
