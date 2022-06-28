import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../..//styles/pages/blog/New.module.scss'

const defaultValues = {
  title: '',
  description: '',
  author: '',
}

export default function HomePage() {
  const [formValues, setFormValues] = useState(defaultValues)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    const params = {
      title: formValues.title,
      description: formValues.description,
      author: formValues.author,
      created: Date.now(),
    }

    if (!formValues.author || !formValues.description || !formValues.author) {
      toast.error('Please fill in all fields...')
      return
    }

    axios
      .post('http://localhost:3001/api/create-new-blog', params)
      .then((response) => {
        const resp = response.data

        if (resp.status) {
          toast.success(resp.msg)

          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        } else {
          toast.error(resp.msg)
        }
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tech assignment - Create New Blog</title>
        <meta
          name="description"
          content="Technical assignment front-end engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className={styles.main}>
        <Container maxWidth="lg">
          <Typography variant="h6" mb={3} textAlign="center">
            Create New Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} direction="column" alignItems="center">
              <Grid item>
                <TextField
                  id="title-input"
                  name="title"
                  label="Title"
                  type="text"
                  sx={{ minWidth: 350 }}
                  value={formValues.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="description-input"
                  name="description"
                  label="Description"
                  type="text"
                  multiline
                  rows={4}
                  sx={{ minWidth: 350 }}
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="author-input"
                  name="author"
                  label="Author name"
                  type="text"
                  sx={{ minWidth: 350 }}
                  value={formValues.author}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  sx={{ mr: 5 }}
                  href="/"
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </main>
    </div>
  )
}
