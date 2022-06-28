import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import axios from 'axios'
import { CardBlog } from '../components/CardBlog'
import styles from '../styles/Home.module.scss'

interface BlogProps {
  title: string
  description: string
  author: string
  created: number
}

export default function HomePage() {
  const [blogs, setBlogs] = useState([] as BlogProps[])

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/fetch-blogs').then((response) => {
      setBlogs(response.data.blogs)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Tech assignment</title>
        <meta
          name="description"
          content="Technical assignment front-end engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container maxWidth="lg">
          <Box className={styles.blogHeader} mb={3}>
            <Typography variant="h4">Articles</Typography>
            <Button variant="outlined" href="/blog/new">
              Create New Blog
            </Button>
          </Box>

          <Grid container spacing={4}>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardBlog {...blog} />
                </Grid>
              ))
            ) : (
              <Typography
                variant="h5"
                sx={{ mt: 15 }}
                textAlign="center"
                width={'100%'}
              >
                No blogs at the moment...
              </Typography>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  )
}
