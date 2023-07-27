/* eslint-disable react/require-default-props */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.scss'

const profile = {
  name: 'Uniparse',
  imageSrc: '/images/profile.jpg',
}

type Props = {
  children: React.ReactNode
  isHome?: boolean
  title: string
  robots?: string
}

export default function Layout({
  children,
  isHome = false,
  title,
  robots,
}: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>

        <link rel='icon' href='/favicon.ico' />

        <meta name='color-scheme' content='dark' />

        {robots && <meta name='robots' content={robots} />}

        <meta
          name='description'
          content='learn how to build a personal website using nextJs'
        />

        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />

        <meta name='og:title' content={title} />

        <meta
          name='twitter:card'
          content='summary_large_image'
        />
      </Head>

      <header className={styles.header}>
        {isHome ? (
          <>
            <Image
              priority
              src={profile.imageSrc}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=''
            />

            <h1 className={utilStyles.heading2Xl}>
              {profile.name}
            </h1>
          </>
        ) : (
          <>
            <Link href='/'>
              <Image
                priority
                src={profile.imageSrc}
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=''
              />
            </Link>

            <h2 className={utilStyles.headingLg}>
              <Link
                href='/'
                className={utilStyles.colorInherit}>
                {profile.name}
              </Link>
            </h2>
          </>
        )}
      </header>

      <main>{children}</main>
    </div>
  )
}
